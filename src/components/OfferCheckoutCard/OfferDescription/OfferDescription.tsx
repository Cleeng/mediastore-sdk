import { useTranslation } from 'react-i18next';

import formatNumber from 'util/formatNumber';
import calculateGrossPriceForFreeOffer from 'util/calculateGrossPriceForFreeOffer';
import { dateFormat, periodMapper, Period } from 'util/planHelper';
import { ReactComponent as CreditCardIcon } from 'assets/images/offerDescription/credit-card-bold.svg';
import { ReactComponent as ClockIcon } from 'assets/images/offerDescription/clock-bold.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/offerDescription/calendar-blank-bold.svg';
import { ReactComponent as TagIcon } from 'assets/images/offerDescription/tag-bold.svg';
import getReadablePeriod from '../OfferCheckoutCard.utils';
import {
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
  expiresAt
}: OfferDetailsProps) => {
  const { t } = useTranslation();

  const renderDescriptionForSubscription = () => {
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

    const description = generateSubscriptionDescription();
    const descriptionLines = description.split('\n');
    if (descriptionLines.length !== 1) {
      return (
        <DetailsWrapper>
          <DetailsStyled>
            <LineWrapperStyled>
              <IconStyled>
                <CreditCardIcon />
              </IconStyled>
              {descriptionLines[0]}
            </LineWrapperStyled>
          </DetailsStyled>
          <DetailsStyled>
            <LineWrapperStyled>
              <IconStyled>
                <ClockIcon />
              </IconStyled>
              {descriptionLines[1]}
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
            {description}
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
          {description}
        </LineWrapperStyled>
      </DetailsStyled>
    );
  };

  const renderDescriptionForPayPerViewEvent = () => {
    return (
      <DetailsStyled>
        <LineWrapperStyled>
          <IconStyled>
            <CalendarIcon />;
          </IconStyled>
          {`Pay-per-view event ${startTime ? dateFormat(startTime, true) : ''}`}
        </LineWrapperStyled>
      </DetailsStyled>
    );
  };

  const renderDescriptionForTVOD = () => {
    return (
      <DetailsStyled>
        <LineWrapperStyled>
          <IconStyled>
            <CalendarIcon />;
          </IconStyled>
          {periodMapper[period as Period]
            ? `${t(
                `period.${period}`,
                periodMapper[period as Period].accessText as string
              )} ${t('offer-checkout-card.access', 'access')}`
            : ''}
        </LineWrapperStyled>
      </DetailsStyled>
    );
  };

  const renderDescriptionForUnlimitedAccess = () => {
    return (
      <DetailsStyled>
        <LineWrapperStyled>
          <IconStyled>
            <TagIcon />
          </IconStyled>
          {t('offer-checkout-card.unlimited-access', 'Unlimited access')}
        </LineWrapperStyled>
      </DetailsStyled>
    );
  };

  const renderDescriptionByType = () => {
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

  return renderDescriptionByType();
};

export default OfferDescription;
