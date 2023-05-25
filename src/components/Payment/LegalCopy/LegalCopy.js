/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Trans } from 'react-i18next';
import { getData } from 'util';
import { LegalNoteWrapperStyled, LegalTextStyled } from '../PaymentStyled';

const LegalCopy = () => {
  const CLEENG_TERMS_URL = 'CLEENG_TERMS_URL';

  const generateLinkAttributes = href => ({
    href: getData(href),
    target: '_blank',
    rel: 'noreferrer',
    style: getData(href) ? { textDecoration: 'underline' } : {}
  });

  return (
    <LegalNoteWrapperStyled>
      <LegalTextStyled marginBottom="24px">
        <Trans i18nKey="legal-notes-acknowledge">
          By clicking &apos;Pay&apos;, I expressly acknowledge and agree to the
          full{' '}
          <a {...generateLinkAttributes(CLEENG_TERMS_URL)}>Terms of Service</a>.
        </Trans>
      </LegalTextStyled>
    </LegalNoteWrapperStyled>
  );
};

export default LegalCopy;
