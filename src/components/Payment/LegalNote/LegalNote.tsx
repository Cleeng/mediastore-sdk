import { Trans } from 'react-i18next';
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
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';

const LegalNote = () => {
  const {
    discount,
    currency,
    priceBreakdown: { offerPrice }
  } = useAppSelector(selectOnlyOrder);
  const { period: offerPeriod } = useAppSelector(selectOnlyOffer);
  const chargedForEveryText =
    offerPeriod && isPeriod(offerPeriod)
      ? periodMapper[offerPeriod].chargedForEveryText
      : null;
  const isInTrial = discount?.applied && discount.type === 'trial';
  const couponApplied = discount?.applied && discount.type !== 'trial';
  const readablePrice = `${
    currencyFormat[currency as keyof Record<CurrencyFormat, string>]
  }${offerPrice}`;
  const readablePeriod = chargedForEveryText ? `/${chargedForEveryText}` : '';

  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';

  const generateLinkAttributes = (href: string) => ({
    href: getData(href),
    target: '_blank',
    rel: 'noreferrer',
    style: getData(href) ? { textDecoration: 'underline' } : {}
  });

  return (
    <LegalNoteWrapperStyled>
      <LegalTextStyled marginBottom="12px">
        {(() => {
          if (isInTrial) {
            return (
              <Trans
                i18nKey={`offer-standard-consent-copy.trial.period-${offerPeriod as SubscriptionPeriodType}`}
              >
                <strong>
                  <>
                    After any free trial and/or promotional period, you will be
                    charged {{ readablePrice }}
                    {{ readablePeriod }} or the then-current price plus
                    applicable taxes on a recurring basis.
                  </>
                </strong>{' '}
                If you do not cancel the service during its free trial period,
                you will be charged. Your subscription will automatically
                continue until you cancel. To cancel, log into{' '}
                <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>
                  your account
                </a>{' '}
                and click &apos;Manage Subscription&apos;.
              </Trans>
            );
          }
          if (couponApplied) {
            return (
              <Trans
                i18nKey={`offer-standard-consent-copy.discount.period-${offerPeriod as SubscriptionPeriodType}`}
              >
                <strong>
                  <>
                    After any free trial and/or promotional period, you will be
                    charged {{ readablePrice }}
                    {{ readablePeriod }} or the then-current price plus
                    applicable taxes on a recurring basis.
                  </>
                </strong>{' '}
                Your subscription will automatically continue until you cancel.
                To cancel, log into{' '}
                <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>
                  your account
                </a>{' '}
                and click &apos;Manage Subscription&apos;.
              </Trans>
            );
          }
          return (
            // offer-standard-consent-copy.period
            <Trans
              i18nKey={`offer-standard-consent-copy.period-${offerPeriod as SubscriptionPeriodType}`}
            >
              <strong>
                <>
                  By clicking &apos;Pay&apos;, you will be charged{' '}
                  {{ readablePrice }}
                  {{ readablePeriod }} or the then-current price plus applicable
                  taxes on a recurring basis.
                </>
              </strong>
              Your subscription will automatically continue until you cancel. To
              cancel, log into{' '}
              <a {...generateLinkAttributes(CLEENG_MY_ACCOUNT_URL)}>
                your account
              </a>{' '}
              and click &apos;Manage Subscription&apos;.
            </Trans>
          );
        })()}
      </LegalTextStyled>
    </LegalNoteWrapperStyled>
  );
};

export default LegalNote;
