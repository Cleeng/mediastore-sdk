import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectCurrentPlan, selectSwitchDetails } from 'redux/planDetailsSlice';
import { selectOffers } from 'redux/offersSlice';
import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { ReactComponent as EditBlockedIcon } from 'assets/images/noEdit.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { ReactComponent as DowngradeIcon } from 'assets/images/downgrade_pending.svg';
import { ReactComponent as UpgradeIcon } from 'assets/images/upgrade_pending.svg';
import { ReactComponent as PauseIcon } from 'assets/images/pause_noti.svg';
import {
  dateFormat,
  INFINITE_DATE,
  currencyFormat,
  CurrencyFormat
} from 'util/planHelper';
import { CustomerOffer } from 'api/Customer/types';
import { showPopup, POPUP_TYPES } from 'redux/popupSlice';
import { Offer } from 'redux/types/offersSlice.types';
import eventDispatcher, {
  MSSDK_CANCEL_SWITCH_BUTTON_CLICKED
} from 'util/eventDispatcher';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  SubBoxStyled,
  BoxTextStyled,
  SubBoxButtonStyled,
  SubBoxContentStyled
} from './OfferMyAccountCardStyled';
import { OfferMyAccountCardProps } from './OfferMyAccountCard.types';

const OfferMyAccountCard = ({ offerId }: OfferMyAccountCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: currentPlan, loading } = useAppSelector(selectCurrentPlan);

  const {
    offerType,
    offerTitle,
    nextPaymentPrice,
    totalPrice,
    nextPaymentCurrency,
    customerCurrency,
    paymentMethod,
    pendingSwitchId,
    expiresAt,
    period,
    status,
    isExternallyManaged
  } =
    currentPlan.find((sub: CustomerOffer) => sub.offerId === offerId) ||
    ({} as CustomerOffer);

  const currency =
    currencyFormat[
      (nextPaymentCurrency || customerCurrency) as keyof Record<
        CurrencyFormat,
        string
      >
    ]; // use customerCurrency for passes

  const { pauseOffersIDs, offers } = useAppSelector(selectOffers);
  const isPaused = pauseOffersIDs.includes(offerId);

  const { data: switchDetailsStore } = useAppSelector(selectSwitchDetails);
  const pendingSwitchDetails = switchDetailsStore[pendingSwitchId];

  const isPauseInProgress = pauseOffersIDs?.includes(
    pendingSwitchDetails?.toOfferId
  );

  const generateDescription = () => {
    const renewalDate =
      expiresAt === INFINITE_DATE
        ? t('currentplan.next-season-start', 'the next season start')
        : dateFormat(expiresAt);

    if (offerType === 'S' && status === 'active' && !pendingSwitchId) {
      return `${t(
        'currentplan.subscription.renews-info',
        'Renews automatically on {{renewalDate}}',
        {
          renewalDate
        }
      )}`;
    }
    if (offerType === 'S' && status === 'cancelled') {
      return `${t(
        'currentplan.subscription.expire-info',
        'This plan will expire on {{renewalDate}}',
        {
          renewalDate
        }
      )}`;
    }
    if (offerType === 'P') {
      return `${t('currentplan.pass.expires-on', 'Expires on')} ${dateFormat(
        expiresAt
      )}`;
    }
    return '';
  };

  const getPendingSwitchCopy = () => {
    if (!pendingSwitchDetails) return null;

    const subscriptionExpirationDate =
      expiresAt === INFINITE_DATE
        ? t('offer-card.next-season-start', 'the next season start')
        : dateFormat(expiresAt);

    const { fromOfferId, toOfferId } = pendingSwitchDetails;
    const toOfferIdTitle = offers.find(
      ({ longId }: Offer) => longId === toOfferId
    )?.title;
    const translatedTitle = t(`offer-title-${fromOfferId}`, offerTitle);
    const translatedSwitchTitle = t(`offer-title-${toOfferId}`, toOfferIdTitle);

    // if pause is in progress
    if (isPauseInProgress) {
      return t(
        'offer-card.info-box.pause-information-text',
        'Your current plan will be paused starting on {{subscriptionExpirationDate}}. While your subscription is paused, you won’t be charged for, and you won’t have access to, {{ translatedTitle }}. You can cancel this pause request at any time.',
        {
          subscriptionExpirationDate,
          translatedTitle
        }
      );
    }
    switch (pendingSwitchDetails.algorithm) {
      case 'IMMEDIATE_WITHOUT_PRORATION':
        return t(
          'offer-card.switch-details.immediate-without-proration',
          `Your switch is pending and should be completed within few minutes. You will be charged a new price starting {{subscriptionExpirationDate}}.{{translatedSwitchTitle}} renews automatically. You can cancel anytime.`,
          { subscriptionExpirationDate, translatedSwitchTitle }
        );
      case 'IMMEDIATE_AND_CHARGE_WITH_REFUND':
      case 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION':
        return t(
          'offer-card.switch-details.immediate-and-charge-with-refund-or-without-proration',
          `Your switch is pending and should be completed within few minutes. You will be charged a new price immediately and get access to {{translatedSwitchTitle}}. You can cancel anytime.`,
          { translatedSwitchTitle }
        );
      case 'DEFERRED':
        return t(
          'offer-card.switch-details.deferred',
          `Your switch is pending. You will have access to {{translatedTitle}} until {{subscriptionExpirationDate}}. From that time you will be charged your new price and will have access to {{translatedSwitchTitle}}. You can cancel this at any time.`,
          {
            translatedTitle,
            subscriptionExpirationDate,
            translatedSwitchTitle
          }
        );
      default:
        return '';
    }
  };

  const shouldShowInfoBox = () => {
    if (isExternallyManaged || pendingSwitchId) return true;
    return false;
  };

  const getDescription = () => {
    if (pendingSwitchId) return getPendingSwitchCopy();
    if (isExternallyManaged) {
      return paymentMethod
        ? t(
            'offer-card.error.inapp-external',
            `${
              paymentMethod
                ? `Subscription purchased via ${paymentMethod}. `
                : ``
            } Use an external service to edit the plan.`,
            { paymentMethod }
          )
        : t(
            'offer-card.error.inapp-external-no-pmt-method',
            'Use an external service to edit the plan.'
          );
    }
    return '';
  };

  const getIcon = () => {
    if (isPauseInProgress) return PauseIcon;
    if (pendingSwitchDetails?.direction === 'downgrade') return DowngradeIcon;
    if (pendingSwitchDetails?.direction === 'upgrade') return UpgradeIcon;
    return EditBlockedIcon;
  };

  const IconComponent = getIcon();

  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper showChildren={!loading} width={50} height={50}>
          <SubscriptionIcon period={period || offerType} isPaused={isPaused} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={!loading}
            width={200}
            margin="0 10px 10px 10px"
          >
            <TitleStyled>
              <>{t(`offer-title-${offerId}`, offerTitle)}</>
            </TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={!loading}
            width={300}
            margin="0 10px 10px 10px"
          >
            {generateDescription() && (
              <DescriptionStyled
                dangerouslySetInnerHTML={{ __html: generateDescription() }}
              />
            )}
          </SkeletonWrapper>
        </InnerWrapper>
        {!isPaused && (
          <PriceWrapperStyled>
            <SkeletonWrapper showChildren={!loading} width={80} height={30}>
              {offerType === 'S' && (
                <Price
                  currency={currency}
                  price={offerType === 'S' ? nextPaymentPrice : totalPrice}
                  period={
                    offerType === 'S' && period !== 'season'
                      ? t(`offer-price.period-${period}`, period)
                      : null
                  }
                />
              )}
            </SkeletonWrapper>
          </PriceWrapperStyled>
        )}
      </WrapperStyled>

      {shouldShowInfoBox() ? (
        <SubBoxStyled>
          <IconComponent />
          <SubBoxContentStyled>
            <BoxTextStyled
              dangerouslySetInnerHTML={{
                __html: getDescription() || ''
              }}
            />
            {pendingSwitchId &&
            pendingSwitchDetails?.algorithm === 'DEFERRED' ? (
              <SubBoxButtonStyled
                onClick={() => {
                  eventDispatcher(MSSDK_CANCEL_SWITCH_BUTTON_CLICKED, {
                    pendingSwitchId,
                    fromOfferId: pendingSwitchDetails.fromOfferId,
                    toOfferId: pendingSwitchDetails.toOfferId
                  });

                  dispatch(
                    showPopup({
                      type: isPauseInProgress
                        ? POPUP_TYPES.CANCEL_PAUSE_POPUP
                        : POPUP_TYPES.CANCEL_SWITCH_POPUP,
                      data: {
                        pendingSwitchId,
                        switchDirection: pendingSwitchDetails.direction,
                        switchOfferTitle:
                          pendingSwitchDetails &&
                          offers.find(
                            ({ longId }: Offer) =>
                              longId === pendingSwitchDetails.toOfferId
                          )?.title,
                        baseOfferTitle: offerTitle,
                        baseOfferExpirationDate: expiresAt,
                        baseOfferPrice: `${currency}${nextPaymentPrice}`
                      }
                    })
                  );
                }}
              >
                {isPauseInProgress
                  ? t('offer-card.cancel-pause-button', 'Cancel pause')
                  : t('offer-card.cancel-switch', 'Cancel switch')}
              </SubBoxButtonStyled>
            ) : (
              <></>
            )}
          </SubBoxContentStyled>
        </SubBoxStyled>
      ) : (
        <></>
      )}
    </>
  );
};

export default OfferMyAccountCard;
