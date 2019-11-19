import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '',
      isOfferError: false
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
  }

  setOfferId = value => this.setState({ offerId: value });

  loginCallback = () => {
    const { offerId } = this.state;
    const { onLoginComplete } = this.props;
    if (offerId) {
      onLoginComplete();
    } else {
      this.setState({ isOfferError: true });
    }
  };

  render() {
    const { isOfferError, offerId } = this.state;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" />
    ) : (
      <>
        <Header />
        <ContentWrapperStyled>
          <LoginForm onLoginComplete={this.loginCallback} offerId={offerId} />
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
  }
}
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
