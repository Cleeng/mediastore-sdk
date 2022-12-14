import React from 'react';
import PropTypes from 'prop-types';
import { Trans, withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';
import { getData, currencyFormat } from '../../../util';
// TODO: check barel? file

const LegalNote = ({
  order: {
    discount,
    currency,
    priceBreakdown: { offerPrice }
  },
  period,
  t
}) => {
  const isInTrial = discount?.applied && discount.type === 'trial';
  const couponApplied = discount?.applied && discount.type !== 'trial';
  const readablePrice = `${currencyFormat[currency]}${offerPrice}`;
  const readablePeriod = `${period ? `/${period}` : ''}`;

  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';

  return (
    <LegalNoteWrapperStyled>
      <LegalTextStyled>
        {(() => {
          if (isInTrial) {
            return (
              <Trans i18nKey={`legal-notes.trial.period-${period}`}>
                <strong>
                  After any free trial and/or promotional period, you will be
                  charged {{ readablePrice }}
                  {{ readablePeriod }} or the then-current price plus applicable
                  taxes on a recurring basis.
                </strong>{' '}
                If you do not cancel the service during its free trial period,
                you will be charged. Your subscription will automatically
                continue until you cancel. To cancel, log into{' '}
                <a href={getData(CLEENG_MY_ACCOUNT_URL)}>your account</a> and
                click &apos;Manage Subscription&apos;.
              </Trans>
            );
          }
          if (couponApplied) {
            return (
              <Trans i18nKey={`legal-notes.discount.period-${period}`}>
                <strong>
                  After any free trial and/or promotional period, you will be
                  charged {{ readablePrice }}
                  {{ readablePeriod }} or the then-current price plus applicable
                  taxes on a recurring basis.
                </strong>{' '}
                Your subscription will automatically continue until you cancel.
                To cancel, log into{' '}
                <a href={getData(CLEENG_MY_ACCOUNT_URL)}>your account</a> and
                click &apos;Manage Subscription&apos;.
              </Trans>
            );
          }
          return (
            <Trans i18nKey={`legal-notes.period-${period}`}>
              <strong>
                By clicking &apos;Complete purchase&apos;, you will be charged{' '}
                {{ readablePrice }}
                {{ readablePeriod }} or the then-current price plus applicable
                taxes on a recurring basis.
              </strong>
              Your subscription will automatically continue until you cancel. To
              cancel, log into{' '}
              <a href={getData(CLEENG_MY_ACCOUNT_URL)}>your account</a> and
              click &apos;Manage Subscription&apos;.
            </Trans>
          );
        })()}
      </LegalTextStyled>
      <LegalTextStyled>
        {t(
          'legal-notes-acknowledge',
          "By clicking 'Complete Purchase' above, I expressly acknowledge and agree to the above terms as well as the full Terms of Service."
        )}
      </LegalTextStyled>
    </LegalNoteWrapperStyled>
  );
};

LegalNote.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  period: PropTypes.string
};

LegalNote.defaultProps = {
  order: {},
  period: null
};

export default withTranslation()(labeling()(LegalNote));
