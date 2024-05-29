import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import PasswordReset from 'components/PasswordReset';
import Capture from 'components/Capture/Capture';
import CheckoutConsents from 'components/CheckoutConsents';
import OfferContainer from 'containers/OfferContainer';
import RedeemGift from 'components/RedeemGift';
import ThankYouPage from 'components/ThankYouPage';
import Auth from 'services/auth';
import PasswordResetSuccess from 'components/PasswordResetSuccess';
import { getData } from 'util/appConfigHelper';
import { connect } from 'react-redux';
import { init } from 'appRedux/publisherConfigSlice';

const CheckoutSteps = {
  LOGIN: {
    stepNumber: 0,
    nextStep: 2
  },
  REGISTER: {
    stepNumber: 1,
    nextStep: 2
  },
  CAPTURE: {
    stepNumber: 2,
    nextStep: 3
  },
  CONSENTS: {
    stepNumber: 3,
    nextStep: 4
  },
  PURCHASE: {
    stepNumber: 4,
    nextStep: 5
  },
  PASSWORD_SUCCESS: {
    stepNumber: 6,
    nextStep: 7
  },
  REDEEM_GIFT: {
    stepNumber: 8
  }
};

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      giftCode: ''
    };
  }

  componentDidMount() {
    const { initValues, offerId, adyenConfiguration } = this.props;

    const urlParams = new URLSearchParams(window.location.search);
    const giftCodeParam = urlParams.get('giftCode');

    if (giftCodeParam) {
      this.setState({
        giftCode: giftCodeParam
      });
    }

    initValues({
      offerId,
      adyenConfiguration
    });
    if (Auth.isLogged()) {
      this.setState({
        currentStep: 3
      });
    }
  }

  goToStep = (step) => {
    this.setState({
      currentStep: step
    });
  };

  render() {
    const { currentStep, giftCode } = this.state;
    const {
      couponCode,
      onSuccess,
      offerId,
      resetPasswordCallback,
      hideRedeemButton
    } = this.props;

    switch (currentStep) {
      case 0:
        return (
          <Login
            onSuccess={() => this.goToStep(CheckoutSteps.LOGIN.nextStep)}
            onRegisterClick={() => this.goToStep(1)}
            onPasswordResetClick={() => this.goToStep(6)}
          />
        );
      case 1:
        return (
          <Register
            onSuccess={() => this.goToStep(CheckoutSteps.REGISTER.nextStep)}
            onHaveAccountClick={() => this.goToStep(0)}
          />
        );
      case 2:
        return (
          <Capture
            onSuccess={() => this.goToStep(CheckoutSteps.CAPTURE.nextStep)}
          />
        );
      case 3:
        return (
          <CheckoutConsents
            onSuccess={() =>
              giftCode
                ? this.goToStep(CheckoutSteps.REDEEM_GIFT.stepNumber)
                : this.goToStep(CheckoutSteps.CONSENTS.nextStep)
            }
          />
        );
      case 4:
        return (
          <OfferContainer
            isCheckout
            offerId={offerId}
            couponCode={couponCode}
            onSuccess={() => this.goToStep(CheckoutSteps.PURCHASE.nextStep)}
            onRedeemClick={() =>
              this.goToStep(CheckoutSteps.REDEEM_GIFT.stepNumber)
            }
            hideRedeemButton={hideRedeemButton}
          />
        );
      case 5:
        return <ThankYouPage onSuccess={onSuccess} />;
      case 6:
        return (
          <PasswordReset
            onSuccess={() =>
              this.goToStep(CheckoutSteps.PASSWORD_SUCCESS.nextStep)
            }
          />
        );
      case 7:
        return (
          <PasswordResetSuccess
            email={getData('CLEENG_CUSTOMER_EMAIL')}
            resetPasswordCallback={resetPasswordCallback}
          />
        );
      case 8:
        return (
          <RedeemGift
            onBackClick={() => {
              this.goToStep(CheckoutSteps.PURCHASE.stepNumber);
            }}
            onSuccess={onSuccess}
          />
        );
      default:
        return null;
    }
  }
}

Checkout.propTypes = {
  adyenConfiguration: PropTypes.objectOf(PropTypes.any),
  couponCode: PropTypes.string,
  hideRedeemButton: PropTypes.bool,
  initValues: PropTypes.func.isRequired,
  offerId: PropTypes.string,
  onSuccess: PropTypes.func,
  resetPasswordCallback: PropTypes.func
};

Checkout.defaultProps = {
  adyenConfiguration: null,
  couponCode: null,
  hideRedeemButton: false,
  offerId: null,
  onSuccess: () => null,
  resetPasswordCallback: () => null
};

export const mapDispatchToProps = (dispatch) => ({
  initValues: (values) => {
    dispatch(init(values));
  }
});

export default connect(null, mapDispatchToProps)(Checkout);
