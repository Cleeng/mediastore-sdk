import { Trans, useTranslation } from 'react-i18next';
import { getData } from 'util/appConfigHelper';
import {
  CurrencyFormat,
  currencyFormat,
  isPeriod,
  periodMapper,
  SubscriptionPeriodType
} from 'util/planHelper';
import { useAppSelector } from 'redux/store';
import { selectOnlyOrder } from 'redux/orderSlice';
import { selectOnlyOffer } from 'redux/offerSlice';
import LegalNotesType from './LegalNotes.types';

const LegalNotesV2 = ({
  paymentMethodType = 'standard',
  isMyAccount
}: LegalNotesType) => {
  const {
    discount,
    currency,
    offerId,
    priceBreakdown: { offerPrice }
  } = useAppSelector(selectOnlyOrder);
  const { period: offerPeriod } = useAppSelector(selectOnlyOffer);
  const chargedForEveryText =
    offerPeriod && isPeriod(offerPeriod)
      ? periodMapper[offerPeriod].chargedForEveryText
      : null;
  const { t, i18n } = useTranslation();
  const isInTrial = discount?.applied && discount.type === 'trial';
  const couponApplied = discount?.applied && discount.type !== 'trial';
  const readablePrice = `${
    currencyFormat[currency as keyof Record<CurrencyFormat, string>]
  }${offerPrice}`;
  const readablePeriod = chargedForEveryText ? `/${chargedForEveryText}` : '';

  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';

  const sc = (href: string) => ({
    href: getData(href),
    target: '_blank',
    rel: 'noreferrer',
    style: getData(href) ? { textDecoration: 'underline' } : {}
  });

  if (paymentMethodType === 'bank') {
    if (isMyAccount || (offerPrice === 0 && offerId?.charAt(0) === 'S')) {
      return t(
        'offer-bank-consent-copy.free-subscription',
        'You accept the terms and conditions of this agreement and that your account will be charged €0.10 for authentication purposes. This amount will be refunded once the transaction is completed. And your account will be debited on a recurring basis for the full subscription amount.'
      );
    }

    if (offerId?.charAt(0) === 'S') {
      return (
        <Trans key="offer-bank-consent-copy.paid-subscription">
          You accept the terms and conditions of this agreement. Your account
          will be debited on a recurring basis for the full subscription amount.
        </Trans>
      );
    }

    return (
      <Trans key="offer-bank-consent-copy.paid-not-subscription">
        You accept the terms and conditions of this agreement.
      </Trans>
    );
  }

  if (isInTrial) {
    return (
      <Trans
        i18nKey={`legal-notes.trial.period-${offerPeriod as SubscriptionPeriodType}`}
      >
        <strong>
          <>
            After any free trial and / or promotional period, you will be
            charged {{ readablePrice }}
            {{ readablePeriod }} or the then - current price plus applicable
            taxes on a recurring basis.
          </>
        </strong>
        If you do not cancel the service during its free trial period, you will
        be charged.Your subscription will automatically continue until you
        cancel.To cancel, log into{' '}
        <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>your account</a>{' '}
        and click & apos;Manage Subscription & apos;.
      </Trans>
    );
  }

  if (couponApplied) {
    return (
      <Trans
        i18nKey={`legal-notes.discount.period-${offerPeriod as SubscriptionPeriodType}`}
      >
        <strong>
          <>
            After any free trial and / or promotional period, you will be
            charged {{ readablePrice }}
            {{ readablePeriod }} or the then - current price plus applicable
            taxes on a recurring basis.
          </>
        </strong>{' '}
        Your subscription will automatically continue until you cancel. To
        cancel, log into{' '}
        <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>your account</a>{' '}
        and click & apos;Manage Subscription & apos;.
      </Trans>
    );
  }

  return (
    <Trans
      i18nKey={`legal-notes.period-${offerPeriod as SubscriptionPeriodType}`}
    >
      <strong>
        <>
          By clicking & apos; Pay & apos;, you will be charged{' '}
          {{ readablePrice }}
          {{ readablePeriod }} or the then - current price plus applicable taxes
          on a recurring basis.
        </>
      </strong>
      Your subscription will automatically continue until you cancel.To cancel,
      log into{' '}
      <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>your account</a> and
      click & apos;Manage Subscription & apos;.
    </Trans>
  );
};

export default LegalNotesV2;
