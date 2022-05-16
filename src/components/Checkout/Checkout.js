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
    const { onSuccess, offerId } = this.props;

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
          />
        );
      case 5:
        return <ThankYouPage onSuccess={() => onSuccess()} />;
      case 6:
        return <PasswordReset />;
      default:
        return null;
    }
  }
}

Checkout.propTypes = {
  offerId: PropTypes.string,
  onSuccess: PropTypes.func
};

Checkout.defaultProps = {
  offerId: null,
  onSuccess: () => {}
};

export default Checkout;
