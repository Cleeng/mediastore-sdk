import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { AdyenStyled, ConfirmButtonStyled } from './AdyenStyled';

const COMPONENT_CONTAINER_ID = 'component-container';
const PAYMENT_METHOD_CARD = 'card';

const ADYEN_ENV =
  ENVIRONMENT_CONFIGURATION.REACT_ENV === 'production' ? 'live' : 'test';

const ADYEN_STYLESHEET_HREF = `https://checkoutshopper-${ADYEN_ENV}.adyen.com/checkoutshopper/sdk/3.11.4/adyen.css`;

const ADYEN_SCRIPT_HREF = `https://checkoutshopper-${ADYEN_ENV}.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js`;

class Adyen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    if (window.AdyenCheckout === undefined) {
      this.loadAdyenStylesheet()
        .then(this.loadAdyenScript)
        .then(this.renderCheckout)
        .then(() => {
          this.setState({
            isLoaded: true
          });
        });
    } else {
      this.renderCheckout();
      this.setState({
        isLoaded: true
      });
    }
  }

  loadAdyenStylesheet = () =>
    new Promise((resolve, reject) => {
      const linkEl = document.createElement('link');
      linkEl.onload = resolve;
      linkEl.onerror = reject;
      linkEl.rel = 'stylesheet';
      linkEl.href = ADYEN_STYLESHEET_HREF;
      document.body.append(linkEl);
    });

  // we won't test chain loading resources from Adyen
  /* istanbul ignore next */
  loadAdyenScript = () =>
    new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script');
      scriptEl.onload = resolve;
      scriptEl.onerror = reject;
      scriptEl.src = ADYEN_SCRIPT_HREF;
      document.body.append(scriptEl);
    });

  renderCheckout = () => {
    const { onSubmit, onChange } = this.props;

    const configuration = {
      showPayButton: false,
      environment: ADYEN_ENV,
      clientKey: ENVIRONMENT_CONFIGURATION.ADYEN_CLIENT_KEY,
      onSubmit,
      onChange
    };
    this.checkout = new window.AdyenCheckout(configuration)
      .create(PAYMENT_METHOD_CARD)
      .mount(`#${COMPONENT_CONTAINER_ID}`);
  };

  render() {
    const { isLoaded } = this.state;
    const { t, isPaymentProcessing } = this.props;
    return (
      <AdyenStyled>
        <div id={COMPONENT_CONTAINER_ID} />
        {isLoaded && (
          <ConfirmButtonStyled>
            <Button
              theme="confirm"
              size="big"
              onClickFn={() => this.checkout.submit()}
              disabled={isPaymentProcessing}
            >
              {isPaymentProcessing ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('Confirm')
              )}
            </Button>
          </ConfirmButtonStyled>
        )}
      </AdyenStyled>
    );
  }
}
Adyen.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  isPaymentProcessing: PropTypes.bool
};

Adyen.defaultProps = {
  t: k => k,
  onChange: () => {},
  isPaymentProcessing: false
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
