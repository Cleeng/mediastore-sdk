import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import saveOfferId from '../../util/offerIdHelper';

import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from './LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from './LoginForm';

const Login = ({ onLoginComplete, urlProps }) => {
  const [offerId, setOfferId] = useState('');
  useEffect(() => {
    saveOfferId(urlProps.location, setOfferId);
  }, []);

  return (
    <>
      <Header />
      <ContentWrapperStyled>
        <LoginForm onLoginComplete={onLoginComplete} offerId={offerId} />
        <Link to="/register">
          <Button variant="secondary">Go to register</Button>
        </Link>
        <SocialStyled>
          <SeparatorStyled>Or</SeparatorStyled>
          <Button variant="google">Sign up with Google</Button>
          <Button variant="fb">Sign up with Facebook</Button>
          <Link to="/reset-password">
            <Button variant="link">Forgot password?</Button>
          </Link>
        </SocialStyled>
      </ContentWrapperStyled>
      <Footer />
    </>
  );
};
Login.propTypes = {
  onLoginComplete: PropType.func,
  urlProps: PropType.shape({
    location: PropType.shape({ search: PropType.string })
  })
};
Login.defaultProps = {
  onLoginComplete: () => {},
  urlProps: {}
};
export default Login;
