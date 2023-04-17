import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useSelector } from 'react-redux';
import formatNumber from 'util/formatNumber';
import { currencyFormat, dateFormat, periodMapper } from 'util/planHelper';
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

const OfferCheckoutCard = ({ isDataLoaded, t }) => {
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
  } = useSelector(state => state.offer.offer);
  const {
    priceBreakdown: { offerPrice },
    taxRate,
    country,
    currency,
    totalPrice,
    discount
  } = useSelector(state => state.order.order);
  const offerType = offerId?.charAt(0);
  const currencySymbol = currencyFormat[currency];
  const isOfferFree =
    isTrialAvailable || (discount.applied && totalPrice === 0);
  const grossPrice = isOfferFree
    ? calculateGrossPriceForFreeOffer(offerPrice, taxRate, customerPriceInclTax)
    : formatNumber(totalPrice);

  const generateTrialDescription = () => {
    const taxCopy = country === 'US' ? 'Tax' : 'VAT';
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

  const renderDescription = () => {
    if (offerType === 'S') {
      return generateSubscriptionDescription();
    }
    if (offerType === 'P') {
      if (!period) {
        const date = dateFormat(expiresAt, true);
        return t('pass-desc.date', `Access until {{date}}`, { date });
      }
      return periodMapper[period]
        ? `${periodMapper[period].accessText} season pass`
        : '';
    }
    if (offerType === 'E') {
      return `Pay-per-view event ${
        startTime ? dateFormat(startTime, true) : ''
      }`;
    }
    if (offerType === 'R') {
      return periodMapper[period]
        ? `${periodMapper[period].accessText} access`
        : '';
    }
    if (offerType === 'A') {
      return t('Unlimited access');
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

  return (
    <WrapperStyled>
      <SkeletonWrapper showChildren={isDataLoaded} width={50} height={50}>
        <SubscriptionIcon period={period || offerType} />
      </SkeletonWrapper>
      <InnerWrapper>
        <SkeletonWrapper
          showChildren={isDataLoaded}
          width={200}
          margin="0 0 10px 10px"
        >
          <TitleStyled>{t(`offer-title-${offerId}`, title)}</TitleStyled>
        </SkeletonWrapper>
        <SkeletonWrapper
          showChildren={isDataLoaded}
          width={300}
          margin="0 0 10px 10px"
        >
          <DescriptionStyled
            dangerouslySetInnerHTML={{ __html: renderDescription() }}
          />
        </SkeletonWrapper>
      </InnerWrapper>
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={isDataLoaded} width={80} height={30}>
          {isTrialAvailable && (
            <TrialBadgeStyled>{renderTrialBadgeDescription()}</TrialBadgeStyled>
          )}
          <Price
            currency={currencyFormat[currency]}
            price={Number(grossPrice)}
            period={
              offerType === 'S'
                ? t(`offer-price.period-${period}`, period)
                : null
            }
          />
        </SkeletonWrapper>
      </PriceWrapperStyled>
    </WrapperStyled>
  );
};

OfferCheckoutCard.propTypes = {
  isDataLoaded: PropTypes.bool,
  t: PropTypes.func
};

OfferCheckoutCard.defaultProps = {
  isDataLoaded: true,
  t: k => k
};

export { OfferCheckoutCard as PureOfferCard };

export default withTranslation()(labeling()(OfferCheckoutCard));
