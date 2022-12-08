import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useSelector } from 'react-redux';
import formatNumber from 'util/formatNumber';
import { dateFormat, periodMapper } from 'util/planHelper';
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
    startTime
  } = useSelector(state => state.offer.offer);
  const {
    priceBreakdown: { offerPrice },
    taxRate,
    country,
    currency
  } = useSelector(state => state.order.order);
  const offerType = offerId?.charAt(0);

  const generateDescription = () => {
    switch (offerType) {
      case 'S': {
        const grossPrice = formatNumber(offerPrice + taxRate * offerPrice);
        let taxCopy = 'VAT';
        if (country === 'US') taxCopy = 'Tax';
        if (isTrialAvailable) {
          if (freeDays) {
            const description = `You will be charged {{customerCurrencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) after {{freeDays}} days. </br> Next payments will occur every ${getReadablePeriod(
              period
            )}`;
            return t(
              `subscription-desc.trial-days.period-${period}`,
              description,
              {
                currency,
                grossPrice,
                taxCopy,
                freeDays
              }
            );
          }
          if (freePeriods) {
            let formattedDescription =
              'You will be charged {{customerCurrencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) ';
            switch (period) {
              case 'month':
                if (freePeriods === 1) {
                  formattedDescription +=
                    'after month. </br>Next payments will occur every month.';
                } else {
                  formattedDescription +=
                    'after {{freePeriods}} months. </br>Next payments will occur every month.';
                }
                break;
              case 'week':
                if (freePeriods === 1) {
                  formattedDescription +=
                    'after week. </br>Next payments will occur every week.';
                } else {
                  formattedDescription +=
                    'after {{freePeriods}} weeks. </br>Next payments will occur every week.';
                }
                break;
              default:
                formattedDescription = '';
            }
            return t(
              `subscription-desc.trial-period${
                freePeriods === 1 ? '' : 's'
              }.period-${period}`,
              formattedDescription,
              {
                currency,
                grossPrice,
                taxCopy,
                freePeriods
              }
            );
          }
        }
        const formattedDescription = `You will be charged {{customerCurrencySymbol}}{{grossPrice}} (incl. {{taxCopy}}) every ${getReadablePeriod(
          period
        )}`;
        return t(`subscription-desc.period-${period}`, formattedDescription, {
          currency,
          grossPrice,
          taxCopy
        });
      }
      case 'P': {
        if (!period) {
          const date = dateFormat(expiresAt, true);
          return t('pass-desc.date', `Access until {{date}}`, { date });
        }
        return periodMapper[period]
          ? `${periodMapper[period].accessText} season pass`
          : '';
      }
      case 'E': {
        return `Pay-per-view event ${
          startTime ? dateFormat(startTime, true) : ''
        }`;
      }
      case 'R': {
        return periodMapper[period]
          ? `${periodMapper[period].accessText} access`
          : '';
      }
      case 'A':
        return t('Unlimited access');
      default:
        return '';
    }
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
            dangerouslySetInnerHTML={{ __html: generateDescription(offerType) }}
          />
        </SkeletonWrapper>
      </InnerWrapper>
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={isDataLoaded} width={80} height={30}>
          {isTrialAvailable && (
            <TrialBadgeStyled>{t('trial period')}</TrialBadgeStyled>
          )}
          <Price
            currency={currency}
            price={offerPrice + taxRate * offerPrice}
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
