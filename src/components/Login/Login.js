import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import LoginStyled from './LoginStyled';

const Login = ({ onLoginComplete }) => (
  <LoginStyled>
    <Button onClickFn={onLoginComplete}>Login</Button>
  </LoginStyled>
);
Login.propTypes = {
  onLoginComplete: PropTypes.func.isRequired
};

export default Login;
