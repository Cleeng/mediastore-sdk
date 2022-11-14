import React from 'react';
import PropTypes from 'prop-types';
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';
import { getData, currencyFormat } from '../../../util'; // TODO: check barel? file

const LegalNote = ({
  order: {
    discount,
    currency,
    priceBreakdown: { offerPrice }
  },
  period
}) => {
  const discountApplied = discount?.applied;
  const isInTrial = discount?.type === 'trial';
  const readablePrice = `${currencyFormat[currency]}${offerPrice}${
    period ? `/${period}` : ''
  }`;
  const CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';

  return (
    <LegalNoteWrapperStyled>
      <LegalTextStyled>
        <strong>
          {discountApplied
            ? 'After any free trial and/or promotional period'
            : `By clicking 'Complete purchase'`}
          , you will be charged {readablePrice} or the then-current price plus
          applicable taxes on a recurring basis.{' '}
        </strong>
        {isInTrial &&
          'If you do not cancel the service during its free trial period, you will be charged. '}
        Your subscription will automatically continue until you cancel. To
        cancel, log into{' '}
        <a
          href={getData(CLEENG_MY_ACCOUNT_URL)}
          style={{
            textDecoration: getData(CLEENG_MY_ACCOUNT_URL)
              ? 'underline'
              : 'none'
          }}
        >
          your account
        </a>
        and click &apos;Manage Subscription&apos;.
      </LegalTextStyled>
      <LegalTextStyled>
        By clicking &apos;Complete Purchase&apos; above, I expressly acknowledge
        and agree to the above terms as well as the full Terms of Service.
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
