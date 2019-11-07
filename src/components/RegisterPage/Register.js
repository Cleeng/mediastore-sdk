import React from 'react';
import { Link } from 'react-router-dom';
import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <>
      <Header showBackIcon />
      <ContentWrapperStyled>
        <RegisterForm />
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

export default Register;
