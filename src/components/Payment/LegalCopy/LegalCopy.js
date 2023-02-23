/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Trans, withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { getData } from 'util';
import { LegalTextStyled } from '../PaymentStyled';

const LegalCopy = ({ position }) => {
  const CLEENG_TERMS_URL = 'CLEENG_TERMS_URL';

  const generateLinkAttributes = href => ({
    href: getData(href),
    target: '_blank',
    rel: 'noreferrer',
    style: getData(href) ? { textDecoration: 'underline' } : {}
  });

  return (
    <LegalTextStyled>
      <Trans i18nKey={`legal-notes-acknowledge.${position}`}>
        By clicking &apos;Complete Purchase&apos; above, I expressly acknowledge
        and agree to the above terms as well as the full{' '}
        <a {...generateLinkAttributes(CLEENG_TERMS_URL)}>Terms of Service</a>.
      </Trans>
    </LegalTextStyled>
  );
};

LegalCopy.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom'])
};

LegalCopy.defaultProps = {
  position: 'bottom'
};

export default withTranslation()(labeling()(LegalCopy));
