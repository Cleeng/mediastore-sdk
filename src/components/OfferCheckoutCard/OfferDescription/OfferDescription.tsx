import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'appRedux/store';
import { selectGift } from 'appRedux/giftSlice';
import formatNumber from 'util/formatNumber';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import { dateFormat, periodMapper, Period } from 'util/planHelper';
import CreditCardIcon from 'assets/images/offerDescription/credit-card-bold.svg';
import ClockIcon from 'assets/images/offerDescription/clock-bold.svg';
import CalendarIcon from 'assets/images/offerDescription/calendar-blank-bold.svg';
import TagIcon from 'assets/images/offerDescription/tag-bold.svg';
import getReadablePeriod from '../OfferCheckoutCard.utils';
import {
  DescriptionWrapperStyled,
  DescriptionStyled,
  DetailsStyled,
  DetailsWrapper,
  IconStyled,
  LineWrapperStyled
} from './OfferDescriptionStyled';
import { OfferDetailsProps } from './OfferDescription.types';

const OfferDescription = ({
  period,
  freeDays,
  currencySymbol,
  grossPrice,
  taxCopy,
  freePeriods,
  totalPrice,
  offerPrice,
  taxRate,
  customerPriceInclTax,
  discountedPeriods,
  discountType,
  isTrialAvailable,
  offerType,
  startTime,
  expiresAt,
  isRedeemGift
}: OfferDetailsProps) => {
  const { t } = useTranslation();

  const {
    verifiedGift: { redeemMode, redeemRefusalReason }
  } = useAppSelector(selectGift);

  const renderRedeemGiftDescription = () => {
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

  const renderDescriptionForSubscription = () => {
    const generateTrialDescription = () => {
      if (period === 'season' && freeDays) {
        const formattedDescription = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days\nNext payment will occur on the next season start date.`;
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
        const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days.\nNext payments will occur every ${getReadablePeriod(
          period
        )}`;
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
            ? 'after month.\nNext payments will occur every month.'
            : 'after {{freePeriods}} months.\nNext payments will occur every month.';
      } else if (period === 'week') {
        formattedDescription +=
          freePeriods === 1
            ? 'after week.\nNext payments will occur every week.'
            : 'after {{freePeriods}} weeks.\nNext payments will occur every week.';
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
      const regularPrice = calculateGrossPriceForFreeOffer(
        offerPrice,
        taxRate,
        customerPriceInclTax
      );
      if (discountedPeriods === 1) {
        return t(
          `subscription-desc-coupon-${period}`,
          `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) now.\nAfter ${
            period === '3months' || period === '6months' ? '' : 'a'
          } ${
            periodMapper[period as Period].chargedForEveryText as string
          } you will be charged a regular price of ${currencySymbol}${regularPrice}.`,
          { currencySymbol, formattedTotalPrice, taxCopy, period, regularPrice }
        );
      }

      // non-standard periods
      if (period === '3months' || period === '6months') {
        const description = `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) per ${
          periodMapper[period as Period].chargedForEveryText as string
        } for the next ${discountedPeriods} billing periods.\nAfter that time you will be charged a regular price of ${currencySymbol}${regularPrice}.`;
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
        `You will be charged ${currencySymbol}${formattedTotalPrice} (incl. ${taxCopy}) per ${period} for the next ${discountedPeriods} ${period}s.\nAfter that time you will be charged a regular price of ${currencySymbol}${regularPrice}.`,
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

      if (!isTrialAvailable) {
        if (period === 'season') {
          const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}})\nNext payment will occur the next season start date.`;
          return t(`subscription-desc.period-season`, description, {
            currencySymbol,
            grossPrice,
            taxCopy
          });
        }
        const formattedDescription = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) every ${getReadablePeriod(
          period
        )}`;
        return t(`subscription-desc.period-${period}`, formattedDescription, {
          currencySymbol,
          grossPrice,
          taxCopy
        });
      }

      return generateTrialDescription();
    };

    const description = generateSubscriptionDescription();
    const descriptionLines = description.split('\n');

    if (descriptionLines.length > 1) {
      return (
        <DetailsWrapper>
          <DetailsStyled>
            <LineWrapperStyled>
              <IconStyled>
                <CreditCardIcon />
              </IconStyled>
              <DescriptionStyled>{descriptionLines[0]}</DescriptionStyled>
            </LineWrapperStyled>
          </DetailsStyled>
          <DetailsStyled>
            <LineWrapperStyled>
              <IconStyled>
                <ClockIcon />
              </IconStyled>
              <DescriptionStyled>{descriptionLines[1]}</DescriptionStyled>
            </LineWrapperStyled>
          </DetailsStyled>
        </DetailsWrapper>
      );
    }

    return (
      <DetailsWrapper>
        <DetailsStyled>
          <LineWrapperStyled>
            <IconStyled>
              <CreditCardIcon />
            </IconStyled>
            <DescriptionStyled>{description}</DescriptionStyled>
          </LineWrapperStyled>
        </DetailsStyled>
      </DetailsWrapper>
    );
  };

  const renderDescriptionForPass = () => {
    const generateDescriptionForPass = () => {
      const icon = <CalendarIcon />;
      if (!period) {
        const date = dateFormat(expiresAt, true);
        const description = t('pass-desc.date', `Access until {{date}}`, {
          date
        });
        return { icon, description };
      }
      const description = periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.season-pass', 'season pass')}`
        : '';
      return { icon, description };
    };

    const { icon, description } = generateDescriptionForPass();

    return (
      <DetailsStyled>
        <LineWrapperStyled>
          <IconStyled>{icon}</IconStyled>
          <DescriptionStyled>{description}</DescriptionStyled>
        </LineWrapperStyled>
      </DetailsStyled>
    );
  };

  const renderDescriptionForPayPerViewEvent = () => (
    <DetailsStyled>
      <LineWrapperStyled>
        <IconStyled>
          <CalendarIcon />
        </IconStyled>
        <DescriptionStyled>
          {`Pay-per-view event ${startTime ? dateFormat(startTime, true) : ''}`}
        </DescriptionStyled>
      </LineWrapperStyled>
    </DetailsStyled>
  );

  const renderDescriptionForTVOD = () => (
    <DetailsStyled>
      <LineWrapperStyled>
        <IconStyled>
          <CalendarIcon />
        </IconStyled>
        <DescriptionStyled>
          {periodMapper[period as Period]
            ? `${t(
                `period.${period}`,
                periodMapper[period as Period].accessText as string
              )} ${t('offer-checkout-card.access', 'access')}`
            : ''}
        </DescriptionStyled>
      </LineWrapperStyled>
    </DetailsStyled>
  );

  const renderDescriptionForUnlimitedAccess = () => (
    <DetailsStyled>
      <LineWrapperStyled>
        <IconStyled>
          <TagIcon />
        </IconStyled>
        <DescriptionStyled>
          {t('offer-checkout-card.unlimited-access', 'Unlimited access')}
        </DescriptionStyled>
      </LineWrapperStyled>
    </DetailsStyled>
  );

  const renderDescriptionByType = () => {
    if (isRedeemGift) {
      return renderRedeemGiftDescription();
    }
    if (offerType === 'S') {
      return renderDescriptionForSubscription();
    }
    if (offerType === 'P') {
      return renderDescriptionForPass();
    }
    if (offerType === 'E') {
      return renderDescriptionForPayPerViewEvent();
    }
    if (offerType === 'R') {
      return renderDescriptionForTVOD();
    }
    if (offerType === 'A') {
      return renderDescriptionForUnlimitedAccess();
    }
    return false;
  };

  return (
    <DescriptionWrapperStyled>
      {renderDescriptionByType()}
    </DescriptionWrapperStyled>
  );
};

export default OfferDescription;
