import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  PasswordResetSuccessPageStyled,
  StyledTitle,
  StyledMessage,
  NoteStyled,
  Loader,
  Checkmark
} from './PasswordResetSuccessStyled';

const PasswordResetSuccess = ({ email, t }) => (
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
      {t('Not sure that was the right email address?')}
      &nbsp;
    </NoteStyled>
  </PasswordResetSuccessPageStyled>
);
PasswordResetSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  t: PropTypes.func
};

/* istanbul ignore next */
PasswordResetSuccess.defaultProps = {
  t: k => k
};

export { PasswordResetSuccess as PurePasswordResetSuccess };
export default withTranslation()(labeling()(PasswordResetSuccess));
