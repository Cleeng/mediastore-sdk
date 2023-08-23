import { useTranslation } from 'react-i18next';

import formatNumber from 'util/formatNumber';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import { dateFormat, periodMapper, Period } from 'util/planHelper';
import { ReactComponent as CreditCardIcon } from 'assets/images/offerDescription/credit-card-bold.svg';
import { ReactComponent as ClockIcon } from 'assets/images/offerDescription/clock-bold.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/offerDescription/calendar-blank-bold.svg';
import { ReactComponent as TagIcon } from 'assets/images/offerDescription/tag-bold.svg';
import getReadablePeriod from './OfferCheckoutCard.utils';
import { DescriptionStyled, IconStyled } from './OfferCheckoutCardStyled';

type OfferDetailsProps = {
  period: string;
  freeDays: number;
  currencySymbol: string;
  grossPrice: string;
  taxCopy: string;
  freePeriods: number;
  totalPrice: number;
  offerPrice: number;
  taxRate: number;
  customerPriceInclTax: number;
  discountedPeriods: number;
  discountType: string;
  isTrialAvailable: boolean;
  offerType: string;
  startTime: number;
  expiresAt: number;
};

const OfferDetailsDescription = ({
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
  expiresAt
}: OfferDetailsProps) => {
  const { t } = useTranslation();

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
          ? 'after month. </br>Next payments will occur every month.'
          : 'after {{freePeriods}} months.\nNext payments will occur every month.';
    } else if (period === 'week') {
      formattedDescription +=
        freePeriods === 1
          ? 'after week. </br>Next payments will occur every week.'
          : 'after {{freePeriods}} weeks.\n>Next payments will occur every week.';
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
        .chargedForEveryText as string} for the next ${discountedPeriods} billing periods.\nAfter that time you will be charged a regular price of ${currencySymbol}${regularPrice}.`;
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
        const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) and will be renewed on the next season start date.`;
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

  if (offerType === 'S') {
    const icons = [<CreditCardIcon />, <ClockIcon />];
    const description = generateSubscriptionDescription();
    return (
      <>
        {description.split('\n').map((item, index) => (
          <DescriptionStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconStyled>{icons[index]}</IconStyled> {item}
            </div>
          </DescriptionStyled>
        ))}
      </>
    );
  }
  if (offerType === 'P') {
    const icon = <CalendarIcon />;
    if (!period) {
      const date = dateFormat(expiresAt, true);
      const description = t('pass-desc.date', `Access until {{date}}`, {
        date
      });
      return (
        <DescriptionStyled>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconStyled>{icon}</IconStyled>
            {description}
          </div>
        </DescriptionStyled>
      );
    }
    const description = periodMapper[period as Period]
      ? `${t(
          `period.${period}`,
          periodMapper[period as Period].accessText as string
        )} ${t('offer-checkout-card.season-pass', 'season pass')}`
      : '';
    return (
      <DescriptionStyled>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconStyled>{icon}</IconStyled> {description}
        </div>
      </DescriptionStyled>
    );
  }
  if (offerType === 'E') {
    const icon = <CalendarIcon />;
    const description = `Pay-per-view event ${
      startTime ? dateFormat(startTime, true) : ''
    }`;
    return (
      <DescriptionStyled>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconStyled>{icon}</IconStyled> {description}
        </div>
      </DescriptionStyled>
    );
  }
  if (offerType === 'R') {
    const icon = <CalendarIcon />;
    const description = periodMapper[period as Period]
      ? `${t(
          `period.${period}`,
          periodMapper[period as Period].accessText as string
        )} ${t('offer-checkout-card.access', 'access')}`
      : '';
    return (
      <DescriptionStyled>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconStyled>{icon}</IconStyled> {description}
        </div>
      </DescriptionStyled>
    );
  }
  if (offerType === 'A') {
    const icon = <TagIcon />;
    const description = t(
      'offer-checkout-card.unlimited-access',
      'Unlimited access'
    );
    return (
      <DescriptionStyled>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconStyled>{icon}</IconStyled> {description}
        </div>
      </DescriptionStyled>
    );
  }
  return <DescriptionStyled />;
};

export default OfferDetailsDescription;
