import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { useAppSelector } from 'redux/store';
import formatNumber from 'util/formatNumber';
import {
  currencyFormat,
  dateFormat,
  periodMapper,
  isPeriod
} from 'util/planHelper';
import { selectOffer, selectOnlyOffer } from 'redux/offerSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
import getReadablePeriod from './OfferCheckoutCard.utils';
import { OfferCheckoutCardProps } from './OfferCheckoutCard.types';

import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled
} from './OfferCheckoutCardStyled';
import Price from '../Price';

const OfferCheckoutCard = ({ t }: OfferCheckoutCardProps) => {
  const {
    offerTitle: title,
    trialAvailable: isTrialAvailable,
    period,
    offerId,
    freePeriods,
    freeDays,
    expiresAt,
    startTime,
  } = useAppSelector(selectOnlyOffer);
  const { loading } = useAppSelector(selectOffer);
  const {
    priceBreakdown: { offerPrice },
    taxRate,
    country,
    currency
  } = useAppSelector(selectOnlyOrder);
  const offerType = offerId?.charAt(0);
  const currencySymbol = currencyFormat[currency];
  const generateTrialDescription = () => {
    const grossPrice = formatNumber(offerPrice + taxRate * offerPrice);
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
      `subscription-desc.trial-period${freePeriods === 1 ? '' : 's'
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
    const grossPrice = formatNumber(offerPrice + taxRate * offerPrice);
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

  const generateDescription = () => {
    if (offerType === 'S') {
      return generateSubscriptionDescription();
    }
    if (offerType === 'P') {
      if (!period) {
        const date = dateFormat(expiresAt, true);
        return t('pass-desc.date', `Access until {{date}}`, { date });
      }
      return isPeriod(period)
        ? `${periodMapper[period].accessText} season pass`
        : '';
    }
    if (offerType === 'E') {
      return `Pay-per-view event ${startTime ? dateFormat(startTime, true) : ''
        }`;
    }
    if (offerType === 'R') {
      return isPeriod(period)
        ? `${periodMapper[period].accessText} access`
        : '';
    }
    if (offerType === 'A') {
      return t('Unlimited access');
    }
    return '';
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
          <TitleStyled>{t(`offer-title-${offerId}`, title)}</TitleStyled>
        </SkeletonWrapper>
        <SkeletonWrapper
          showChildren={!loading}
          width={300}
          margin="0 0 10px 10px"
        >
          <DescriptionStyled
            dangerouslySetInnerHTML={{ __html: generateDescription() }}
          />
        </SkeletonWrapper>
      </InnerWrapper>
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={!loading} width={80} height={30}>
          {isTrialAvailable && (
            <TrialBadgeStyled>{t('trial period')}</TrialBadgeStyled>
          )}
          <Price
            currency={currencyFormat[currency]}
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

export { OfferCheckoutCard as PureOfferCard };

export default withTranslation()(labeling()(OfferCheckoutCard));
