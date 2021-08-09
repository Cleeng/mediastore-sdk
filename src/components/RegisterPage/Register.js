import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import googleIcon from 'assets/images/google.png';
import fbIcon from 'assets/images/fbIB.svg';
import ErrorPage from 'components/ErrorPage';
import BackButton from 'components/BackButton';
import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled,
  LoginWrapperStyled as RegisterWrapperStyled
} from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import labeling from 'containers/labeling';
import savePublisherId from 'util/publisherIdHelper';
import saveOfferId from 'util/offerIdHelper';
import { isHosted, getData } from 'util/appConfigHelper';
import RegisterForm from './RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: null,
      isOfferError: false,
      publisherId: null
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    if (urlProps.location) {
      saveOfferId(urlProps.location, this.setOfferId);
      savePublisherId(urlProps.location, this.setPublisherId);
    } else {
      this.setOfferId(getData('CLEENG_OFFER_ID'));
      this.setPublisherId(getData('CLEENG_PUBLISHER_ID'));
    }
  }

  setOfferId = value => this.setState({ offerId: value });

  setPublisherId = value => this.setState({ publisherId: value });

  setOfferError = value => this.setState({ isOfferError: value });

  render() {
    const { isOfferError, offerId, publisherId } = this.state;
    const { t, onSuccess } = this.props;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" resetError={() => this.setOfferError()} />
    ) : (
      <RegisterWrapperStyled>
        <Header>
          <BackButton />
        </Header>
        <ContentWrapperStyled>
          <RegisterForm
            t={t}
            offerId={offerId}
            publisherId={publisherId}
            setOfferError={this.setOfferError}
            onSuccess={onSuccess}
          />
          <Button
            isLink
            to={{ pathname: '/login' }}
            theme="secondary"
            size="big"
          >
            {t('Have an account?')}
          </Button>
          {!isHosted() && (
            <SocialStyled>
              <SeparatorStyled>{t('Or sign up with')}</SeparatorStyled>
              <Button
                theme="simple"
                fontWeight="500"
                label="Sign up with Facebook"
                icon={fbIcon}
              >
                Facebook
              </Button>
              <Button
                theme="simple"
                fontWeight="500"
                label="Sign up with Google"
                icon={googleIcon}
              >
                Google
              </Button>
            </SocialStyled>
          )}
        </ContentWrapperStyled>
        <Footer />
      </RegisterWrapperStyled>
    );
  }
}
Register.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  onSuccess: PropTypes.func,
  t: PropTypes.func
};

Register.defaultProps = {
  urlProps: {},
  onSuccess: () => {},
  t: k => k
};

export { Register as PureRegister };

export default withTranslation()(labeling()(Register));
