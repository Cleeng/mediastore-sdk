import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ErrorPage from 'components/ErrorPage';
import {
  ContentWrapperStyled,
  LoginWrapperStyled as RegisterWrapperStyled
} from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import labeling from 'containers/labeling';
import savePublisherId from 'util/publisherIdHelper';
import saveOfferId from 'util/offerIdHelper';
import { getData } from 'util/appConfigHelper';
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
    const { t, onSuccess, onHaveAccountClick } = this.props;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" resetError={() => this.setOfferError()} />
    ) : (
      <RegisterWrapperStyled>
        <Header />
        <ContentWrapperStyled>
          <RegisterForm
            t={t}
            offerId={offerId}
            publisherId={publisherId}
            setOfferError={this.setOfferError}
            onSuccess={onSuccess}
          />
          <Button
            theme="secondary"
            size="big"
            onClickFn={() => onHaveAccountClick()}
          >
            {t('Have an account?')}
          </Button>
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
  onHaveAccountClick: PropTypes.func,
  t: PropTypes.func
};

Register.defaultProps = {
  urlProps: {},
  onSuccess: () => {},
  onHaveAccountClick: () => {},
  t: k => k
};

export { Register as PureRegister };

export default withTranslation()(labeling()(Register));
