import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ErrorPage from 'components/ErrorPage';
import saveOfferId from '../../util/offerIdHelper';
import labeling from '../../containers/labeling';

import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegisterForm from './RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: null,
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
    const { t } = this.props;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" />
    ) : (
      <>
        <Header showBackIcon />
        <ContentWrapperStyled>
          <RegisterForm
            t={t}
            offerId={offerId}
            setOfferError={this.setOfferError}
          />
          <Button isLink to="/login" variant="secondary">
            {t('Have an account?')}
          </Button>
          <SocialStyled>
            <SeparatorStyled>{t('Or')}</SeparatorStyled>
            <Button variant="google">{t('Sign up with Google')}</Button>
            <Button variant="fb">{t('Sign up with Facebook')}</Button>
          </SocialStyled>
        </ContentWrapperStyled>
        <Footer />
      </>
    );
  }
}
Register.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func
};

Register.defaultProps = {
  urlProps: {},
  t: k => k
};

export { Register as PureRegister };

export default withTranslation()(labeling()(Register));
