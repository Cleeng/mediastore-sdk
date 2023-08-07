import { useTranslation } from 'react-i18next';

import {
  currencyFormat,
  dateFormat,
  periodMapper,
  Period
} from 'util/planHelper';

import { ReactComponent as CreditCardIcon } from 'assets/images/offerDescription/credit-card-bold.svg';
import { ReactCompontn as ClockIcon } from 'assets/images/offerDescription/clock-bold.svg';
import { ReactCompontn as PassIcon } from 'assets/images/offerDescription/tag-bold.svg';
import { ReactCompontn as CalendarIcon } from 'assets/images/offerDescription/calendar-blank-bold.svg';

import getReadablePeriod from './OfferCheckoutCard.utils';

import { DescriptionStyled, IconStyled } from './OfferCheckoutCardStyled';

const OfferDetailsDescription = ({
  country,
  period,
  freeDays,
  currencySymbol,
  grossPrice,
  freePeriods,
  isTrialAvailable,
  offerType,
  expiresAt,
  startTime
}) => {
  const { t } = useTranslation();

  const isTrial = false;

  type DescriptionWithIconType = {
    description: string;
    icon: JSX.Element | null;
  };

  const generateTrialDescription = () => {
    const taxCopy = country === 'US' ? 'Tax' : 'VAT';

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

  const generateSubscriptionDescription = () => {
    const taxCopy = country === 'US' ? 'Tax' : 'VAT';

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

  const renderDescription = (): DescriptionWithIconType => {
    let description = '';
    let icon = null;

    if (offerType === 'S') {
      description = generateSubscriptionDescription();
      icon = <CreditCardIcon />;
    }
    if (offerType === 'P') {
      icon = <PassIcon />;
      if (!period) {
        const date = dateFormat(expiresAt, true);
        description = t('pass-desc.date', `Access until {{date}}`, { date });
      }
      description = periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.season-pass', 'season pass')}`
        : '';
    }
    if (offerType === 'E') {
      description = `Pay-per-view event ${
        startTime ? dateFormat(startTime, true) : ''
      }`;
      icon = <CalendarIcon />;
    }
    if (offerType === 'R') {
      description = periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.access', 'access')}`
        : '';
      icon = <CalendarIcon />;
    }
    if (offerType === 'A') {
      description = t(
        'offer-checkout-card.unlimited-access',
        'Unlimited access'
      );
      icon = <CalendarIcon />;
    }
    return { description, icon };
  };

  return (
    <div
      style={{
        display: ' flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ display: ' flex', alignItems: 'center', height: '20px' }}>
        <IconStyled>{renderDescription().icon}</IconStyled>
        <DescriptionStyled>{renderDescription().description}</DescriptionStyled>
      </div>
      {isTrial && (
        <div style={{ display: ' flex', alignItems: 'center', height: '20px' }}>
          <IconStyled>
            <ClockIcon />
          </IconStyled>
          <p style={{ fontSize: '11px', fontWeight: '300' }}>Hi</p>
        </div>
      )}
    </div>
  );
};

export default OfferDetailsDescription;
