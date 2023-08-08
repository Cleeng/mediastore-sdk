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

  type DescriptionWithIcon = {
    description: string;
    icon: JSX.Element | null;
    trialInfo: string;
  };

  let offerInfo = '';
  let offerIcon: JSX.Element | null = null;
  let trialInfo = '';

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
      const description = `You will be charged {{currencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days.`;
      trialInfo = `Next payments will occur every ${getReadablePeriod(period)}`;

      offerInfo = t(
        `subscription-desc.trial-days.period-${period}`,
        description,
        {
          currencySymbol,
          grossPrice,
          taxCopy,
          freeDays
        }
      );
      // return { description, icon };
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
      offerInfo = t(
        `subscription-desc.period-${period}`,
        formattedDescription,
        {
          currencySymbol,
          grossPrice,
          taxCopy
        }
      );
    }
    // console.log(generateTrialDescription());
    // return generateTrialDescription();
    generateTrialDescription();
  };

  (() => {
    if (offerType === 'S') {
      generateSubscriptionDescription();
      offerIcon = <CreditCardIcon />;
    }
    if (offerType === 'P') {
      offerIcon = <PassIcon />;
      if (!period) {
        const date = dateFormat(expiresAt, true);
        offerInfo = t('pass-desc.date', `Access until {{date}}`, { date });
      }
      offerInfo = periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.season-pass', 'season pass')}`
        : '';
    }
    if (offerType === 'E') {
      offerInfo = `Pay-per-view event ${
        startTime ? dateFormat(startTime, true) : ''
      }`;
      offerIcon = <CalendarIcon />;
    }
    if (offerType === 'R') {
      offerInfo = periodMapper[period as Period]
        ? `${t(
            `period.${period}`,
            periodMapper[period as Period].accessText as string
          )} ${t('offer-checkout-card.access', 'access')}`
        : '';
      offerIcon = <CalendarIcon />;
    }
    if (offerType === 'A') {
      offerInfo = t('offer-checkout-card.unlimited-access', 'Unlimited access');
      offerIcon = <CalendarIcon />;
    }
    // return { description, icon, trialInfo };
  })();

  return (
    <div
      style={{
        display: ' flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
        <IconStyled>{offerIcon}</IconStyled>
        <DescriptionStyled>{offerInfo}</DescriptionStyled>
      </div>
      {isTrialAvailable && (
        <div
          style={{
            display: ' flex',
            alignItems: 'center',
            height: '20px'
          }}
        >
          <IconStyled>
            <ClockIcon />
          </IconStyled>
          <DescriptionStyled>{trialInfo}</DescriptionStyled>
        </div>
      )}
    </div>
  );
};

export default OfferDetailsDescription;
