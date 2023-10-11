import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useAppSelector } from 'redux/store';
import formatNumber from 'util/formatNumber';
import {
  currencyFormat,
  dateFormat,
  periodMapper,
  Period
} from 'util/planHelper';
import { selectOffer, selectOnlyOffer } from 'redux/offerSlice';
import { selectGift } from 'redux/giftSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
import { selectDeliveryDetails } from 'redux/deliveryDetailsSlice';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import getReadablePeriod from './OfferCheckoutCard.utils';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled
} from './OfferCheckoutCardStyled';
import Price from '../Price';

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
    customerPriceInclTax
  } = useAppSelector(selectOnlyOffer);

  const {
    loading,
    offerV2: { title: offerV2Title }
  } = useAppSelector(selectOffer);

  const {
    verifiedGift: { redeemMode, redeemRefusalReason }
  } = useAppSelector(selectGift);

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

  const { isGift } = useAppSelector(selectDeliveryDetails);

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

  const priceValue =
    discountType === 'coupon' && totalPrice !== 0
      ? Number(totalPrice)
      : Number(grossPrice);

  const periodValue =
    offerType === 'S' && period !== 'season'
      ? t(`offer-price.period-${period}`, period)
      : null;

  const generateTrialDescription = () => {
    if (period === 'season' && freeDays) {
      const formattedDescription = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days and will be renewed on the next season start date.`;
      return t(
        `subscription-desc.trial-days.period-season`,
        formattedDescription,
        {
          currencySymbol,
          grossPrice,
          taxCopy,
          freeDays
        }
      );
    }

    if (freeDays) {
      const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days. </br> Next payments will occur every ${getReadablePeriod(
        period
      )}.`;
      return t(`subscription-desc.trial-days.period-${period}`, description, {
        currencySymbol,
        grossPrice,
        taxCopy,
        freeDays
      });
    }

    // freePeriods
    let formattedDescription =
      'You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) ';
    if (period === 'month') {
      formattedDescription +=
        freePeriods === 1
          ? 'after month. </br>Next payments will occur every month.'
          : 'after {{freePeriods}} months. </br>Next payments will occur every month.';
    } else if (period === 'week') {
      formattedDescription +=
        freePeriods === 1
          ? 'after week. </br>Next payments will occur every week.'
          : 'after {{freePeriods}} weeks. </br>Next payments will occur every week.';
    }
    return t(
      `subscription-desc.trial-period${
        freePeriods === 1 ? '' : 's'
      }.period-${period}`,
      formattedDescription,
      {
        currencySymbol,
        grossPrice,
        taxCopy,
        freePeriods
      }
    );
  };

  const generateCouponDescription = () => {
    const formattedTotalPrice = formatNumber(totalPrice);
    const regularPrice =
      period === 'season'
        ? formatNumber(customerPriceInclTax)
        : calculateGrossPriceForFreeOffer(
            offerPrice,
            taxRate,
            customerPriceInclTax
          );
    if (discountedPeriods === 1) {
      return t(
        `subscription-desc-coupon-${period}`,
        `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) now.<br/>After ${
          period === '3months' || period === '6months' ? '' : 'a'
        } ${periodMapper[period as Period]
          .chargedForEveryText as string} you will be charged a regular price of ${currencySymbol}${regularPrice}.`,
        { currencySymbol, formattedTotalPrice, taxCopy, period, regularPrice }
      );
    }

    // non-standard periods
    if (period === '3months' || period === '6months') {
      const description = `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) per ${periodMapper[
        period as Period
      ]
        .chargedForEveryText as string} for the next ${discountedPeriods} billing periods.<br/>After that time you will be charged a regular price of ${currencySymbol}${regularPrice}.`;
      return t(`subscription-desc-coupon.periods-${period}`, description, {
        formattedTotalPrice,
        taxCopy,
        discountedPeriods,
        currencySymbol,
        regularPrice
      });
    }

    return t(
      `subscription-desc-coupon-${period}s`,
      `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) per ${period} for the next ${discountedPeriods} ${period}s.<br/>After that time you will be charged a regular price of ${currencySymbol}${regularPrice}.`,
      {
        currencySymbol,
        formattedTotalPrice,
        taxCopy,
        period,
        discountedPeriods,
        regularPrice
      }
    );
  };

  const generateSubscriptionDescription = () => {
    if (discountType === 'coupon') {
      return generateCouponDescription();
    }

    if (isGift) {
      const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}).`;
      return t(`subscription-desc.gift`, description, {
        currencySymbol,
        grossPrice,
        taxCopy
      });
    }

    if (!isTrialAvailable) {
      if (period === 'season') {
        const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) and will be renewed on the next season start date.`;
        return t(`subscription-desc.period-season`, description, {
          currencySymbol,
          grossPrice,
          taxCopy
        });
      }
      const formattedDescription = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) every ${getReadablePeriod(
        period
      )}.`;
      return t(`subscription-desc.period-${period}`, formattedDescription, {
        currencySymbol,
        grossPrice,
        taxCopy
      });
    }

    return generateTrialDescription();
  };

  const renderDescription = () => {
    if (offerType === 'S') {
      return generateSubscriptionDescription();
    }
    if (offerType === 'P') {
      if (!period) {
        const date = dateFormat(expiresAt, true);
        return t('pass-desc.date', `Access until {{date}}`, { date });
      }
      return periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.season-pass', 'season pass')}`
        : '';
    }
    if (offerType === 'E') {
      return `Pay-per-view event ${
        startTime ? dateFormat(startTime, true) : ''
      }`;
    }
    if (offerType === 'R') {
      return periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.access', 'access')}`
        : '';
    }
    if (offerType === 'A') {
      return t('offer-checkout-card.unlimited-access', 'Unlimited access');
    }
    return '';
  };

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

  const getRedeemGiftDescription = () => {
    if (redeemMode === 'EXTEND') {
      return t(
        `redeem-gift.description.existing-subscription.period-${period}`,
        `Your existing subscription will be extended for additional ${getReadablePeriod(
          period
        )} for free.`
      );
    }

    switch (redeemRefusalReason) {
      case 'EXTERNALLY_MANAGED_SUBSCRIPTION':
        return t(
          'redeem-gift.description.refusal.external',
          'You already have an active subscription in a different store, perhaps through a mobile app. Once that subscription expires, you can come back and redeem your gift code here.'
        );

      case 'REDEEMED':
        return t(
          'redeem-gift.description.refusal.redeemed',
          'This gift code has already been used.'
        );

      case 'INACTIVE_OFFER':
        return t(
          'redeem-gift.description.refusal.offer-inactive',
          'Sorry, but the offer linked to your gift code is no longer available.'
        );

      case 'OFFER_GEO_RESTRICTED':
        return t(
          'redeem-gift.description.refusal.offer-georestricted',
          "Sorry, this gift code can't be used in your current location due to geographic restrictions."
        );

      case 'RECURRING_PROCESS_ALREADY_STARTED':
        return t(
          'redeem-gift.description.refusal.recurring-process-started',
          "You’ll be able to redeem your gift code once we've finished processing a payment on your existing subscription"
        );

      case 'MORE_THAN_ONE_MATCHING_SUBSCRIPTION':
        return t(
          'redeem-gift.description.refusal.more-than-one-matching-subscription',
          'You currently have multiple subscriptions granting you access to the content this gift provides. When one of those subscriptions expires, you can come back and redeem your gift code here.'
        );

      case 'PUBLISHER_GEO_RESTRICTED':
        return t(
          'redeem-gift.description.refusal.publisher-georestricted',
          "Sorry, this gift code can't be used in your current location due to geographic restrictions."
        );

      default:
        return '';
    }
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
          margin="0 0 10px 10px"
        >
          <TitleStyled>
            {t(`offer-title-${offerId}`, title || offerV2Title)}
          </TitleStyled>
        </SkeletonWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={300}
          margin="0 0 10px 10px"
        >
          <DescriptionStyled
            dangerouslySetInnerHTML={{
              __html: isRedeemGift
                ? getRedeemGiftDescription()
                : renderDescription()
            }}
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
              currency={currencyFormat[currency]}
              price={priceValue}
              period={periodValue}
            />
          </SkeletonWrapper>
        </PriceWrapperStyled>
      )}
    </WrapperStyled>
  );
};

export { OfferCheckoutCard as PureOfferCard };

export default OfferCheckoutCard;
