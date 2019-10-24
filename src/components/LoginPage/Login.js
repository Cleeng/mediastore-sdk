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
        <Button variant="secondary">Go to register</Button>
        <SocialStyled>
          <SeparatorStyled>Or</SeparatorStyled>
          <Button variant="google">Sing up with Google</Button>
          <Button variant="fb">Sing up with Facebook</Button>
          <Link to="/reset-password/:S123456789">
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
