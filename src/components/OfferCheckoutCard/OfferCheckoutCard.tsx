import { useTranslation } from 'react-i18next';
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
    customerPriceInclTax
  } = useAppSelector(selectOnlyOffer);

  const { loading } = useAppSelector(selectOffer);

  const {
    priceBreakdown: { offerPrice },
    taxRate,
    country,
    currency,
    totalPrice,
    discount
  } = useAppSelector(selectOnlyOrder);

  const offerType = offerId?.charAt(0);
  const currencySymbol = currencyFormat[currency];
  const isOfferFree =
    isTrialAvailable || (discount.applied && totalPrice === 0);
  const grossPrice = isOfferFree
    ? calculateGrossPriceForFreeOffer(offerPrice, taxRate, customerPriceInclTax)
    : formatNumber(totalPrice);

  const { t } = useTranslation();

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

  const renderDescription = () => {
    if (offerType === 'S') {
      return generateSubscriptionDescription();
    }
    if (offerType === 'P') {
      if (!period) {
        const date = dateFormat(expiresAt, true);
        return t('pass-desc.date', `Access until {{date}}`, { date });
      }
      return isPeriod(period)
        ? `${t(
            `period.${periodMapper[period].accessText?.toLowerCase()}`,
            periodMapper[period].accessText
          )} ${t('offer-checkout-card.season-pass', 'season pass')}`
        : '';
    }
    if (offerType === 'E') {
      return `Pay-per-view event ${
        startTime ? dateFormat(startTime, true) : ''
      }`;
    }
    if (offerType === 'R') {
      return isPeriod(period)
        ? `${t(
            `period.${periodMapper[period].accessText?.toLowerCase()}`,
            periodMapper[period].accessText
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
            dangerouslySetInnerHTML={{ __html: renderDescription() }}
          />
        </SkeletonWrapper>
      </InnerWrapper>
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={!loading} width={80} height={30}>
          {isTrialAvailable && (
            <TrialBadgeStyled>{renderTrialBadgeDescription()}</TrialBadgeStyled>
          )}
          <Price
            currency={currencyFormat[currency]}
            price={Number(grossPrice)}
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
