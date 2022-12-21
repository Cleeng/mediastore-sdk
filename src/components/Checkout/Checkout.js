import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import PasswordReset from 'components/PasswordReset';
import Capture from 'components/Capture/Capture';
import CheckoutConsents from 'components/CheckoutConsents';
import OfferContainer from 'containers/OfferContainer';
import ThankYouPage from 'components/ThankYouPage';
import Auth from 'services/auth';
import PasswordResetSuccess from 'components/PasswordResetSuccess';
import { getData } from 'util/appConfigHelper';
import { connect } from 'react-redux';
import { init } from 'redux/publisherConfigSlice';

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
  }
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }

  componentDidMount() {
    const {
      initValues,
      offerId,
      availablePaymentMethods: paymentMethodsProvidedByPublisher
    } = this.props;
    initValues({
      offerId,
      paymentMethodsProvidedByPublisher
    });
    if (Auth.isLogged()) {
      this.setState({
        currentStep: 3
      });
    }
  }

  goToStep = step => {
    this.setState({
      currentStep: step
    });
  };

  render() {
    const { currentStep } = this.state;
    const {
      onSuccess,
      offerId,
      resetPasswordCallback,
      availablePaymentMethods: paymentMethodsProvidedByPublisher
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
            onSuccess={() => this.goToStep(CheckoutSteps.CONSENTS.nextStep)}
          />
        );
      case 4:
        return (
          <OfferContainer
            offerId={offerId}
            onSuccess={() => this.goToStep(CheckoutSteps.PURCHASE.nextStep)}
            availablePaymentMethods={paymentMethodsProvidedByPublisher}
          />
        );
      case 5:
        return <ThankYouPage onSuccess={() => onSuccess()} />;
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
      default:
        return null;
    }
  }
}

Checkout.propTypes = {
  offerId: PropTypes.string,
  availablePaymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      methodName: PropTypes.string,
      default: PropTypes.bool
    })
  ),
  onSuccess: PropTypes.func,
  resetPasswordCallback: PropTypes.func,
  initValues: PropTypes.func.isRequired
};

Checkout.defaultProps = {
  offerId: null,
  availablePaymentMethods: null,
  onSuccess: () => {},
  resetPasswordCallback: () => {}
};

export const mapDispatchToProps = dispatch => ({
  initValues: values => {
    dispatch(init(values));
  }
});

export default connect(null, mapDispatchToProps)(Checkout);
