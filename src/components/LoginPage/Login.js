import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ErrorPage from 'components/ErrorPage';
import saveOfferId from '../../util/offerIdHelper';
import labeling from '../../containers/labeling';

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

  setOfferError = value => this.setState({ isOfferError: value });

  render() {
    const { isOfferError, offerId } = this.state;
    const { t, onLoginComplete } = this.props;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" />
    ) : (
      <>
        <Header />
        <ContentWrapperStyled>
          <LoginForm
            t={t}
            onLoginComplete={onLoginComplete}
            offerId={offerId}
            setOfferError={this.setOfferError}
          />
          <Link to="/register">
            <Button variant="secondary">{t('Go to register')}</Button>
          </Link>
          <SocialStyled>
            <SeparatorStyled>{t('Or')}</SeparatorStyled>
            <Button variant="google">{t('Sign up with Google')}</Button>
            <Button variant="fb">{t('Sign up with Facebook')}</Button>
            <Link to="/reset-password">
              <Button variant="link">{t('Forgot password?')}</Button>
            </Link>
          </SocialStyled>
        </ContentWrapperStyled>
        <Footer />
      </>
    );
  }
}
Login.propTypes = {
  onLoginComplete: PropTypes.func,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func
};
Login.defaultProps = {
  onLoginComplete: () => {},
  urlProps: {},
  t: k => k
};
export default withTranslation()(labeling()(Login));
