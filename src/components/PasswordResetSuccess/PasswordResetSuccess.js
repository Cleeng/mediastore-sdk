import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { PasswordResetWrapperStyled } from 'components/PasswordReset/PasswordResetStyled';
import Button from 'components/Button';
import {
  PasswordResetSuccessPageStyled,
  StyledTitle,
  StyledMessage,
  NoteStyled,
  Loader,
  Checkmark
} from './PasswordResetSuccessStyled';

const PasswordResetSuccess = ({ email, resetPasswordCallback }) => {
  const { t } = useTranslation();

  return (
    <PasswordResetWrapperStyled>
      <Header />
      <PasswordResetSuccessPageStyled>
        <Loader>
          <Checkmark />
        </Loader>
        <StyledTitle>{t('Password link sent')}</StyledTitle>
        <StyledMessage>
          {email
            ? t('Please check your inbox at {{email}}', { email })
            : t('Please check your inbox')}
        </StyledMessage>
        <NoteStyled>
          <Button theme="link" onClickFn={resetPasswordCallback}>
            {t('Go back to the login page')}
          </Button>
          &nbsp;
        </NoteStyled>
      </PasswordResetSuccessPageStyled>
      <Footer />
    </PasswordResetWrapperStyled>
  );
};

PasswordResetSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  resetPasswordCallback: PropTypes.func
};

/* istanbul ignore next */
PasswordResetSuccess.defaultProps = {
  resetPasswordCallback: () => {}
};

export { PasswordResetSuccess as PurePasswordResetSuccess };

export default PasswordResetSuccess;
