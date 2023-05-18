/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import { getData, currencyFormat } from 'util';
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';

const LegalNote = ({
  order: {
    discount,
    currency,
    priceBreakdown: { offerPrice }
  },
  period
}) => {
  const isInTrial = discount?.applied && discount.type === 'trial';
  const couponApplied = discount?.applied && discount.type !== 'trial';
  const readablePrice = `${currencyFormat[currency]}${offerPrice}`;
  const readablePeriod = `${period ? `/${period}` : ''}`;

  const { t } = useTranslation();

  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';

  const generateLinkAttributes = href => ({
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
              <Trans i18nKey={`legal-notes.trial.period-${period}`} t={t}>
                <strong>
                  After any free trial and/or promotional period, you will be
                  charged {{ readablePrice }}
                  {{ readablePeriod }} or the then-current price plus applicable
                  taxes on a recurring basis.
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
              <Trans i18nKey={`legal-notes.discount.period-${period}`} t={t}>
                <strong>
                  After any free trial and/or promotional period, you will be
                  charged {{ readablePrice }}
                  {{ readablePeriod }} or the then-current price plus applicable
                  taxes on a recurring basis.
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
            <Trans i18nKey={`legal-notes.period-${period}`} t={t}>
              <strong>
                By clicking &apos;Pay&apos;, you will be charged{' '}
                {{ readablePrice }}
                {{ readablePeriod }} or the then-current price plus applicable
                taxes on a recurring basis.
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

LegalNote.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  period: PropTypes.string
};

LegalNote.defaultProps = {
  order: {},
  period: null
};

export default LegalNote;
