import { useAppSelector } from 'redux/store';
import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { ReactComponent as BlockedIcon } from 'assets/images/blocked.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  currencyFormat,
  periodMapper,
  CurrencyFormat,
  PeriodProperties,
  Period
} from 'util/planHelper';
import isPriceTemporaryModified from 'util/isPriceTemporaryModified';
import { selectSwitchSettings } from 'redux/planDetailsSlice';
import { SwitchSetting } from 'redux/types/planDetailsSlice.types';
import { OfferSwitchCardProps } from './OfferSwitchCard.types';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  PriceWrapperStyled,
  SubBoxStyled,
  BoxTextStyled,
  SubBoxContentStyled
} from './OfferSwitchCardStyled';

const OfferSwitchCard = ({ baseOfferId, toOfferId }: OfferSwitchCardProps) => {
  const { t } = useTranslation();
  const { data: allSwitchSettings, loading: isSwitchSettingsLoading } =
    useAppSelector(selectSwitchSettings);
  const switchDetails =
    allSwitchSettings[baseOfferId].available.find(
      (switchData) => switchData.toOfferId === toOfferId
    ) ||
    allSwitchSettings[baseOfferId].unavailable.find(
      (switchData) => switchData.toOfferId === toOfferId
    ) ||
    ({} as SwitchSetting);

  const period =
    periodMapper[
      switchDetails?.period as keyof Record<Period, PeriodProperties>
    ]?.chargedForEveryText;

  const currency =
    currencyFormat[
      switchDetails?.nextPaymentPriceCurrency as keyof Record<
        CurrencyFormat,
        string
      >
    ];

  const getDescription = () => {
    switch (switchDetails?.reason?.code) {
      case 'TO_OFFER_COUNTRY_NOT_ALLOWED':
        return t(
          'offer-card.error.geo-restriction',
          `This plan is <strong>currently unavailable</strong> in your country or region`
        );
      case 'ALREADY_HAS_ACCESS':
        return t(
          'offer-card.error.already-have-access',
          'It looks like you already have access to this offer'
        );
      case 'TO_FREE_OFFER_NOT_ALLOWED':
        return t(
          'offer-card.error.to-free-offer',
          'Downgrading from a paid to a free offer is not possible'
        );
      case 'SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED':
        return t(
          'offer-card.error.coupon-applied',
          "You can't change your subscription if a coupon was applied. To change plan, please cancel your current subscription and purchase a new one."
        );
      case 'SWITCH_IN_PROGRESS':
        return t(
          'offer-card.error.switch-in-progress',
          'Another switch is already in progress. Wait until the process finalization'
        );
      case 'MISSING_PAYMENT_DETAILS':
        return t(
          'offer-card.error.missing-payment-details',
          'Your payment details are missing. Please add them to proceed with a subscription switch.'
        );
      case 'MISSING_PAYMENT_FOR_PRORATION':
        return t(
          'offer-card.error.missing-payment-for-proration',
          'The upgrade will be available after the renewal date.'
        );
      default:
        return '';
    }
  };

  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper
          showChildren={!isSwitchSettingsLoading}
          width={50}
          height={50}
        >
          <SubscriptionIcon period={period || 'S'} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={200}
            margin='0 10px 10px 10px'
          >
            <TitleStyled>
              {t(`offer-title-${toOfferId}`, switchDetails.title)}
            </TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={300}
            margin='0 10px 10px 10px'
          />
        </InnerWrapper>
        <PriceWrapperStyled>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={80}
            height={30}
          >
            <Price
              currency={currency}
              nextPaymentPrice={
                isPriceTemporaryModified(toOfferId) &&
                switchDetails.algorithm !== 'DEFERRED'
                  ? switchDetails.price
                  : switchDetails.nextPaymentPrice
              }
              totalPrice={switchDetails.price}
              period={
                switchDetails.period !== 'season'
                  ? t(
                      `offer-price.period-${switchDetails.period}`,
                      switchDetails.period
                    )
                  : null
              }
            />
          </SkeletonWrapper>
        </PriceWrapperStyled>
      </WrapperStyled>
      {switchDetails?.reason?.code && getDescription() && (
        <SubBoxStyled>
          <BlockedIcon />
          <SubBoxContentStyled>
            <BoxTextStyled
              dangerouslySetInnerHTML={{
                __html: getDescription()
              }}
            />
          </SubBoxContentStyled>
        </SubBoxStyled>
      )}
    </>
  );
};

export default OfferSwitchCard;
