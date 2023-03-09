import { Trans, withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { getData } from 'util/appConfigHelper';
import { currencyFormat } from 'util/planHelper';
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';
import { LegalNoteProps } from './LegalNote.types';

const LegalNote = ({
  order: {
    discount,
    currency,
    priceBreakdown: { offerPrice }
  },
  period
}: LegalNoteProps) => {
  const isInTrial = discount?.applied && discount.type === 'trial';
  const couponApplied = discount?.applied && discount.type !== 'trial';
  const readablePrice = `${currencyFormat[currency]}${offerPrice}`;
  const readablePeriod = `${period ? `/${period}` : ''}`;

  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';
  const CLEENG_TERMS_URL = 'CLEENG_TERMS_URL';

  const generateLinkAttributes = (href: string) => ({
    href: getData(href),
    target: '_blank',
    rel: 'noreferrer',
    style: getData(href) ? { textDecoration: 'underline' } : {}
  });

  return (
    <LegalNoteWrapperStyled>
      <LegalTextStyled>
        {(() => {
          if (isInTrial) {
            return (
              <Trans i18nKey={`legal-notes.trial.period-${period}`}>
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
              <Trans i18nKey={`legal-notes.discount.period-${period}`}>
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
            <Trans i18nKey={`legal-notes.period-${period}`}>
              <strong>
                <>
                  By clicking &apos;Complete purchase&apos;, you will be charged{' '}
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
      <LegalTextStyled>
        <Trans i18nKey="legal-notes-acknowledge">
          By clicking &apos;Complete Purchase&apos; above, I expressly
          acknowledge and agree to the above terms as well as the full{' '}
          <a {...generateLinkAttributes(CLEENG_TERMS_URL)}>Terms of Service</a>.
        </Trans>
      </LegalTextStyled>
    </LegalNoteWrapperStyled>
  );
};

export default withTranslation()(labeling()(LegalNote));
