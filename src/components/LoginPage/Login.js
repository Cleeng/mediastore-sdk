import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ErrorPage from 'components/ErrorPage';
import saveOfferId from '../../util/offerIdHelper';
import savePublisherId from '../../util/publisherIdHelper';
import labeling from '../../containers/labeling';
import Auth from '../../services/auth';

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
    savePublisherId(urlProps.location, () => {});
    Auth.isLogged();
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
        <Header />
        <ContentWrapperStyled>
          <LoginForm
            t={t}
            offerId={offerId}
            setOfferError={this.setOfferError}
          />
          <Button isLink to="/register" variant="secondary">
            {t('Go to register')}
          </Button>
          <SocialStyled>
            <SeparatorStyled>{t('Or')}</SeparatorStyled>
            <Button variant="google" label="Log in with Google">
              {t('Log in with Google')}
            </Button>
            <Button variant="fb" label="Log in with Facebook">
              {t('Log in with Facebook')}
            </Button>
            <Button isLink to="/reset-password" variant="link">
              {t('Forgot password?')}
            </Button>
          </SocialStyled>
        </ContentWrapperStyled>
        <Footer />
      </>
    );
  }
}
Login.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func
};
Login.defaultProps = {
  urlProps: {},
  t: k => k
};

export { Login as PureLogin };

export default withTranslation()(labeling()(Login));
