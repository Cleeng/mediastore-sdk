import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  PasswordResetSuccessPageStyled,
  StyledTitle,
  StyledMessage,
  NoteStyled,
  StyledLink,
  Loader,
  Checkmark
} from './PasswordResetSuccessStyled';

const PasswordResetSuccess = ({ email }) => (
  <PasswordResetSuccessPageStyled>
    <Loader>
      <Checkmark />
    </Loader>
    <StyledTitle>Password link sent</StyledTitle>
    <StyledMessage>
      Please check your inbox {email && `at ${email}`}
    </StyledMessage>
    <NoteStyled>
      Not sure that was the right email address?
      <Link to="/reset-password/">
        <StyledLink>Try again.</StyledLink>
      </Link>
    </NoteStyled>
  </PasswordResetSuccessPageStyled>
);
PasswordResetSuccess.propTypes = {
  email: PropTypes.string.isRequired
};

export default PasswordResetSuccess;
