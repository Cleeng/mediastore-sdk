import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useAppSelector } from 'appRedux/store';
import formatNumber from 'util/formatNumber';
import { getCurrencySymbol } from 'util/planHelper';
import { selectOffer, selectOnlyOffer } from 'appRedux/offerSlice';
import { selectOnlyOrder } from 'appRedux/orderSlice';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import OfferDescription from 'components/OfferCheckoutCard/OfferDescription';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  PublisherDescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled
} from './OfferCheckoutCardStyled';
import Price, { isPromoPriceActive } from '../Price';

type OfferCheckoutCardProps = {
  isRedeemGift: boolean;
};

const OfferCheckoutCard = ({
  isRedeemGift = false
}: OfferCheckoutCardProps) => {
  const {
    offerTitle: title,
    trialAvailable: isTrialAvailable,
    period,
    offerId,
    freePeriods,
    freeDays,
    expiresAt,
    startTime,
    customerPriceInclTax,
    offerDescription: publisherDescription
  } = useAppSelector(selectOnlyOffer);

  const {
    loading,
    offerV2: { title: offerV2Title, price }
  } = useAppSelector(selectOffer);
  const baseOfferPrice = price?.amount || 0;
  const priceRules = price?.rules;

  const {
    priceBreakdown: { offerPrice },
    taxRate,
    currency,
    totalPrice,
    discount: {
      applied: isDiscountApplied,
      type: discountType,
      periods: discountedPeriods
    }
  } = useAppSelector(selectOnlyOrder);

  const offerType = offerId?.charAt(0);
  const currencySymbol = getCurrencySymbol(currency);

  const isOfferFree =
    isTrialAvailable || (isDiscountApplied && totalPrice === 0);
  const grossPrice = isOfferFree
    ? calculateGrossPriceForFreeOffer(offerPrice, taxRate, customerPriceInclTax)
    : formatNumber(totalPrice);
  const isTrialBadgeVisible = isTrialAvailable && discountType === 'trial';

  const { t } = useTranslation();

  const taxCopy = 'Tax';

  const periodValue =
    offerType === 'S' && period !== 'season'
      ? t(`offer-price.period-${period}`, period)
      : null;

  const renderTrialBadgeDescription = () => {
    if (freeDays) {
      return t('trial-badge-days', `{{freeDays}} days free trial`, {
        freeDays
      });
    }

    if (freePeriods === 1) {
      return t(`trial-badge.period-${period}`, `1 {{period}} free trial`, {
        period
      });
    }

    return t(
      `trial-badge.periods-${period}`,
      `{{freePeriods}} {{period}}s free trial`,
      { freePeriods, period }
    );
  };

  return (
    <WrapperStyled>
      <SkeletonWrapper showChildren={!loading} width={50} height={50}>
        <SubscriptionIcon period={period || offerType} />
      </SkeletonWrapper>
      <InnerWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={200}
          margin='0 0 10px 10px'
        >
          <TitleStyled>
            {t(`offer-title-${offerId}`, title || offerV2Title)}
          </TitleStyled>
          {publisherDescription && (
            <PublisherDescriptionStyled>
              {t(`offer-description-${offerId}`, publisherDescription)}
            </PublisherDescriptionStyled>
          )}
        </SkeletonWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={300}
          margin='0 0 10px 10px'
        >
          <OfferDescription
            period={period}
            freeDays={freeDays}
            currencySymbol={currencySymbol}
            grossPrice={grossPrice}
            taxCopy={taxCopy}
            freePeriods={freePeriods}
            totalPrice={totalPrice}
            offerPrice={offerPrice}
            taxRate={taxRate}
            customerPriceInclTax={customerPriceInclTax}
            discountedPeriods={discountedPeriods}
            discountType={discountType}
            isTrialAvailable={isTrialAvailable}
            offerType={offerType}
            startTime={startTime}
            expiresAt={expiresAt}
            isRedeemGift={isRedeemGift}
          />
        </SkeletonWrapper>
      </InnerWrapper>
      {!isRedeemGift && (
        <PriceWrapperStyled>
          <SkeletonWrapper showChildren={!loading} width={80} height={30}>
            {isTrialBadgeVisible && (
              <TrialBadgeStyled>
                {renderTrialBadgeDescription()}
              </TrialBadgeStyled>
            )}
            <Price
              currency={currencySymbol}
              nextPaymentPrice={totalPrice}
              totalPrice={baseOfferPrice}
              period={periodValue}
              isTrialBadgeVisible={isTrialBadgeVisible}
              isPromoPriceActive={isPromoPriceActive(priceRules)}
            />
          </SkeletonWrapper>
        </PriceWrapperStyled>
      )}
    </WrapperStyled>
  );
};

export { OfferCheckoutCard as PureOfferCard };

export default OfferCheckoutCard;
