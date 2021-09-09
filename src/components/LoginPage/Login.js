import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ErrorPage from 'components/ErrorPage';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import saveOfferId from 'util/offerIdHelper';
import savePublisherId from 'util/publisherIdHelper';
import labeling from 'containers/labeling';
import { getData } from 'util/appConfigHelper';

import { ContentWrapperStyled, LoginWrapperStyled } from './LoginStyled';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '',
      publisherId: '',
      isOfferError: false,
      emailChanged: false
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    if (urlProps.location) {
      saveOfferId(urlProps.location, this.setOfferId);
      savePublisherId(urlProps.location, this.setPublisherId);

      if (urlProps.location.search.includes('emailChanged=true')) {
        this.setState({
          emailChanged: true
        });
      }
    } else {
      this.setOfferId(getData('CLEENG_OFFER_ID'));
      this.setPublisherId(getData('CLEENG_PUBLISHER_ID'));
    }
  }

  setOfferId = value => this.setState({ offerId: value });

  setPublisherId = value => this.setState({ publisherId: value });

  setOfferError = value => this.setState({ isOfferError: value });

  render() {
    const { isOfferError, offerId, publisherId, emailChanged } = this.state;
    const { isMyAccount, onSuccess, t } = this.props;
    return isOfferError ? (
      <ErrorPage
        type="offerNotExist"
        resetError={() => this.setOfferError(false)}
      />
    ) : (
      <LoginWrapperStyled>
        <Header />
        <ContentWrapperStyled>
          <LoginForm
            t={t}
            offerId={offerId}
            publisherId={publisherId}
            setOfferError={this.setOfferError}
            isMyAccount={isMyAccount}
            emailChanged={emailChanged}
            onSuccess={onSuccess}
          />
          {!isMyAccount && (
            <>
              <Button
                isLink
                to={{ pathname: '/register' }}
                theme="secondary"
                size="big"
              >
                {t('Go to register')}
              </Button>
            </>
          )}
          <Button
            isLink
            to={{
              pathname: '/reset-password',
              fromMyAccount: isMyAccount
            }}
            theme="link"
            margin="20px auto 0 auto"
          >
            {t('Forgot password?')}
          </Button>
        </ContentWrapperStyled>
        <Footer isCheckout={!isMyAccount} />
      </LoginWrapperStyled>
    );
  }
}
Login.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  isMyAccount: PropTypes.bool,
  onSuccess: PropTypes.func,
  t: PropTypes.func
};
Login.defaultProps = {
  urlProps: {},
  isMyAccount: false,
  onSuccess: () => {},
  t: k => k
};

export { Login as PureLogin };

export default withTranslation()(labeling()(Login));
