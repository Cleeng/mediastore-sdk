import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  selectCurrentPlan,
  selectPendingSwitchesDetails,
  selectCustomerSwitchesHistory
} from 'appRedux/planDetailsSlice';
import { selectOffers } from 'appRedux/offersSlice';
import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price, { isPromoPriceActive } from 'components/Price';
import SkeletonWrapper from 'components/SkeletonWrapper';
import EditBlockedIcon from 'assets/images/noEdit.svg';
import DowngradeIcon from 'assets/images/downgrade_pending.svg';
import UpgradeIcon from 'assets/images/upgrade_pending.svg';
import {
  dateFormat,
  INFINITE_DATE,
  currencyFormat,
  CurrencyFormat
} from 'util/planHelper';
import { CustomerOffer } from 'api/Customer/types';
import { showPopup, POPUP_TYPES } from 'appRedux/popupSlice';
import eventDispatcher, {
  MSSDK_CANCEL_SWITCH_BUTTON_CLICKED
} from 'util/eventDispatcher';
import { SwitchDetail } from 'appRedux/types';
import OfferV2 from 'types/OfferV2.types';
import { selectOffer } from 'appRedux/offerSlice';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  SubBoxStyled,
  BoxTextStyled,
  SubBoxButtonStyled,
  SubBoxContentStyled,
  PriceWrapperStyled
} from './OfferMyAccountCardStyled';
import { OfferMyAccountCardProps } from './OfferMyAccountCard.types';

const OfferMyAccountCard = ({
  offerId,
  subscriptionId
}: OfferMyAccountCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: currentPlan, loading } = useAppSelector(selectCurrentPlan);
  const { offers } = useAppSelector(selectOffers);
  const { data: pendingSwitchesDetails } = useAppSelector(
    selectPendingSwitchesDetails
  );
  const { data: customerSwitchesHistory } = useAppSelector(
    selectCustomerSwitchesHistory
  );

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
    currentPlan.find(
      (sub: CustomerOffer) =>
        sub.offerId === offerId && sub.subscriptionId === subscriptionId
    ) ?? ({} as CustomerOffer);

  const {
    offerV2: { price }
  } = useAppSelector(selectOffer);
  const priceRules = price?.rules;

  const currency =
    currencyFormat[
      (nextPaymentCurrency ?? customerCurrency) as keyof Record<
        CurrencyFormat,
        string
      >
    ] ||
    nextPaymentCurrency ||
    customerCurrency; // use customerCurrency for passes

  const pendingSwitchDetails = pendingSwitchId
    ? pendingSwitchesDetails[pendingSwitchId]
    : ({} as SwitchDetail);

  const isUpgradePending = customerSwitchesHistory.find(
    ({ status: switchStatus, direction, fromOfferId }) =>
      switchStatus === 'inprogress' &&
      direction === 'upgrade' &&
      fromOfferId === offerId
  );

  const getExpirationDescription = () => {
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
    const toOfferIdTitle =
      offers.find(({ longId }: OfferV2) => longId === toOfferId)?.title ?? '';
    const translatedTitle = t(`offer-title-${fromOfferId}`, offerTitle);
    const translatedSwitchTitle = t(`offer-title-${toOfferId}`, toOfferIdTitle);

    const { algorithm, direction } = pendingSwitchDetails;

    switch (algorithm) {
      case 'IMMEDIATE_WITHOUT_PRORATION':
        return t(
          `offer-card.switch-details-${direction}.immediate-without-proration`,
          `Your ${direction} is pending and should be completed within few minutes. You will be charged a new price starting {{subscriptionExpirationDate}}.{{translatedSwitchTitle}} renews automatically. You can cancel anytime.`,
          { subscriptionExpirationDate, translatedSwitchTitle }
        );
      case 'IMMEDIATE_AND_CHARGE_WITH_REFUND':
      case 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION':
        return t(
          `offer-card.switch-details-${direction}.immediate-and-charge-with-refund-or-without-proration`,
          `Your ${direction} is pending and should be completed within few minutes. You will be charged a new price immediately and get access to {{translatedSwitchTitle}}. You can cancel anytime.`,
          { translatedSwitchTitle }
        );
      case 'DEFERRED':
        return t(
          `offer-card.switch-details-${direction}.deferred`,
          `Your ${direction} is pending. You will have access to {{translatedTitle}} until {{subscriptionExpirationDate}}. From that time you will be charged your new price and will have access to {{translatedSwitchTitle}}. You can cancel this at any time.`,
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

  const getSwitchDescription = () => {
    if (isUpgradePending) {
      return t(
        `offer-card.switch-details.upgrade-pending`,
        `Your upgrade is pending.`
      );
    }

    if (pendingSwitchId) return getPendingSwitchCopy();
    if (isExternallyManaged) {
      if (!paymentMethod) {
        return t(
          'offer-card.error.inapp-external-no-pmt-method',
          'Use an external service to edit the plan.'
        );
      }
      return t(
        'offer-card.error.inapp-external',
        `${
          paymentMethod ? `Subscription purchased via ${paymentMethod}. ` : ``
        } Use an external service to edit the plan.`,
        { paymentMethod }
      );
    }
    return '';
  };

  const handleCancelSwitch = () => {
    if (!pendingSwitchId) {
      return;
    }

    eventDispatcher(MSSDK_CANCEL_SWITCH_BUTTON_CLICKED, {
      pendingSwitchId,
      fromOfferId: pendingSwitchDetails.fromOfferId,
      toOfferId: pendingSwitchDetails.toOfferId
    });

    dispatch(
      showPopup({
        type: POPUP_TYPES.CANCEL_SWITCH_POPUP,
        data: {
          pendingSwitchId,
          switchDirection: pendingSwitchDetails.direction,
          switchOfferTitle:
            (pendingSwitchDetails &&
              offers.find(
                ({ longId }: OfferV2) =>
                  longId === pendingSwitchDetails.toOfferId
              )?.title) ||
            '',
          baseOfferTitle: offerTitle,
          baseOfferExpirationDate: expiresAt,
          baseOfferPrice: `${currency}${nextPaymentPrice}`
        }
      })
    );
  };

  const getIcon = () => {
    if (pendingSwitchDetails?.direction === 'downgrade') return DowngradeIcon;
    if (pendingSwitchDetails?.direction === 'upgrade' || isUpgradePending)
      return UpgradeIcon;
    return EditBlockedIcon;
  };

  const IconComponent = getIcon();
  const expirationDescription = getExpirationDescription();
  const switchDescription = getSwitchDescription();

  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper showChildren={!loading} width={50} height={50}>
          <SubscriptionIcon period={period ?? offerType} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={!loading}
            width={200}
            margin='0 10px 10px 10px'
          >
            <TitleStyled>
              <>{t(`offer-title-${offerId}`, offerTitle)}</>
            </TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={!loading}
            width={300}
            margin='0 10px 10px 10px'
          >
            {expirationDescription && (
              <DescriptionStyled>{expirationDescription}</DescriptionStyled>
            )}
          </SkeletonWrapper>
        </InnerWrapper>

        <PriceWrapperStyled>
          <SkeletonWrapper showChildren={!loading} width={80} height={30}>
            {period && (
              <Price
                currency={currency}
                nextPaymentPrice={nextPaymentPrice}
                totalPrice={totalPrice}
                period={
                  period !== 'season'
                    ? t(`offer-price.period-${period}`, period)
                    : null
                }
                isPromoPriceActive={isPromoPriceActive(priceRules)}
              />
            )}
          </SkeletonWrapper>
        </PriceWrapperStyled>
      </WrapperStyled>

      {switchDescription && (
        <SubBoxStyled>
          <IconComponent />
          <SubBoxContentStyled>
            <BoxTextStyled>{switchDescription}</BoxTextStyled>
            {isUpgradePending && (
              <SubBoxButtonStyled onClick={() => window.location.reload()}>
                {t('offer-card.upgrade-pending.refresh', 'Refresh')}
              </SubBoxButtonStyled>
            )}
            {pendingSwitchId &&
              pendingSwitchDetails?.algorithm === 'DEFERRED' && (
                <SubBoxButtonStyled onClick={handleCancelSwitch}>
                  {t(
                    `offer-card.cancel-${pendingSwitchDetails.direction}`,
                    `Cancel ${pendingSwitchDetails.direction}`
                  )}
                </SubBoxButtonStyled>
              )}
          </SubBoxContentStyled>
        </SubBoxStyled>
      )}
    </>
  );
};

export default OfferMyAccountCard;
