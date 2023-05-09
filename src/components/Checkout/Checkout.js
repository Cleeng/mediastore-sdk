import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { browserName, browserVersion } from 'react-device-detect';
// import mixpanel from 'mixpanel-browser';

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
// import jwtDecode from 'jwt-decode';
// import { version } from '../../../package.json'; // import alias ?
import collectMixpanelData from 'util/analyticsHelper';

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
    const { initValues, offerId, adyenConfiguration } = this.props;

    // mixpanel analytics
    // const { publisherId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));
    // const componentName = Checkout.name; // or this.constructor.name strictly for class-based components

    // mixpanel.init('2708ff6e8bd2fd0b04aad2432a4c1924');
    // mixpanel.track(`${componentName} render`, {
    //   'Publisher ID': publisherId,
    //   'MSSDK Version': version,
    //   'Component Name': componentName
    // });
    initValues({
      offerId,
      adyenConfiguration
    });
    if (Auth.isLogged()) {
      collectMixpanelData(Checkout.name);
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
    const { onSuccess, offerId, resetPasswordCallback } = this.props;

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
  onSuccess: PropTypes.func,
  resetPasswordCallback: PropTypes.func,
  adyenConfiguration: PropTypes.objectOf(PropTypes.any),
  initValues: PropTypes.func.isRequired
};

Checkout.defaultProps = {
  offerId: null,
  onSuccess: () => {},
  resetPasswordCallback: () => {},
  adyenConfiguration: null
};

export const mapDispatchToProps = dispatch => ({
  initValues: values => {
    dispatch(init(values));
  }
});

export default connect(null, mapDispatchToProps)(Checkout);
