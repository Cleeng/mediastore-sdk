import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useAppSelector } from 'redux/store';
import formatNumber from 'util/formatNumber';
import { currencyFormat } from 'util/planHelper';
import { selectOffer, selectOnlyOffer } from 'redux/offerSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import OfferDetailsDescription from 'components/OfferDetailsDescription';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled
} from './OfferCheckoutCardStyled';
import Price from '../Price';

const OfferCheckoutCard = () => {
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
    offerDescription
  } = useAppSelector(selectOnlyOffer);

  const { loading } = useAppSelector(selectOffer);

  const {
    priceBreakdown: { offerPrice },
    taxRate,
    country,
    currency,
    totalPrice,
    discount: {
      applied: isDiscountApplied,
      type: discountType,
      periods: discountedPeriods
    }
  } = useAppSelector(selectOnlyOrder);

  const offerType = offerId?.charAt(0);
  const currencySymbol = currencyFormat[currency];
  const isOfferFree =
    isTrialAvailable || (isDiscountApplied && totalPrice === 0);
  const grossPrice = isOfferFree
    ? calculateGrossPriceForFreeOffer(offerPrice, taxRate, customerPriceInclTax)
    : formatNumber(totalPrice);
  const isTrialBadgeVisible = isTrialAvailable && discountType === 'trial';

  const { t } = useTranslation();

  const taxCopy = country === 'US' ? 'Tax' : 'VAT';

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
      {/* <div style={{ display: 'flex', alignItems: 'flex-start', width: '90%' }}> */}
      <SkeletonWrapper showChildren={!loading} width={50} height={50}>
        <SubscriptionIcon period={period || offerType} />
      </SkeletonWrapper>
      <InnerWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={200}
          margin="0 0 10px 10px"
        >
          <TitleStyled>{t(`offer-title-${offerId}`, title)}</TitleStyled>
          {offerDescription && (
            <DescriptionStyled>
              {t(`offer-description-${offerId}`, offerDescription)}
            </DescriptionStyled>
          )}
        </SkeletonWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={300}
          margin="0 0 10px 10px"
        >
          <OfferDetailsDescription
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
          />
        </SkeletonWrapper>
      </InnerWrapper>
      {/* </div> */}
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={!loading} width={80} height={30}>
          {isTrialBadgeVisible && (
            <TrialBadgeStyled>{renderTrialBadgeDescription()}</TrialBadgeStyled>
          )}
          <Price
            currency={currencyFormat[currency]}
            price={
              discountType === 'coupon' && totalPrice !== 0
                ? Number(totalPrice)
                : Number(grossPrice)
            }
            period={
              offerType === 'S' && period !== 'season'
                ? t(`offer-price.period-${period}`, period)
                : null
            }
          />
        </SkeletonWrapper>
      </PriceWrapperStyled>
    </WrapperStyled>
  );
};

export { OfferCheckoutCard as PureOfferCard };

export default OfferCheckoutCard;
