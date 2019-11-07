import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from './LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from './LoginForm';

const Login = ({ onLoginComplete }) => {
  return (
    <>
      <Header />
      <ContentWrapperStyled>
        <LoginForm onLoginComplete={onLoginComplete} />
        <Link to="/register">
          <Button variant="secondary">Go to register</Button>
        </Link>
        <SocialStyled>
          <SeparatorStyled>Or</SeparatorStyled>
          <Button variant="google">Sing up with Google</Button>
          <Button variant="fb">Sing up with Facebook</Button>
          <Link to={`/reset-password/${ENVIRONMENT_CONFIGURATION.OFFER_ID}`}>
            <Button variant="link">Forgot password?</Button>
          </Link>
        </SocialStyled>
      </ContentWrapperStyled>
      <Footer />
    </>
  );
};
Login.propTypes = {
  onLoginComplete: PropType.func
};
Login.defaultProps = {
  onLoginComplete: () => {}
};
export default Login;
