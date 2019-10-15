import React from 'react';
import PropTypes from 'prop-types';
import LoginStyled from './LoginStyled';
import Button from '../Button/Button';

const Login = ({ onLoginComplete }) => (
  <LoginStyled>
    <Button onClickFn={onLoginComplete}>Login</Button>
  </LoginStyled>
);
Login.propTypes = {
  onLoginComplete: PropTypes.func.isRequired
};

export default Login;
