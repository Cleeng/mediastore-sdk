import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegisterForm from './RegisterForm';

const Register = ({ onRegistrationComplete }) => {
  return (
    <>
      <Header showBackIcon />
      <ContentWrapperStyled>
        <RegisterForm onRegistrationComplete={onRegistrationComplete} />
        <Link to="/login">
          <Button variant="secondary">Have an account?</Button>
        </Link>
        <SocialStyled>
          <SeparatorStyled>Or</SeparatorStyled>
          <Button variant="google">Sign up with Google</Button>
          <Button variant="fb">Sign up with Facebook</Button>
        </SocialStyled>
      </ContentWrapperStyled>
      <Footer />
    </>
  );
};
Register.propTypes = {
  onRegistrationComplete: PropTypes.func
};

Register.defaultProps = {
  onRegistrationComplete: () => {}
};

export default Register;
