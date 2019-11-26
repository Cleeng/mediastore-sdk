import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdyenStyled from './AdyenStyled';
import LocalhostWarning from './util/LocalhostWarning';

const ADYEN_STYLESHEET_HREF =
  'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.2.0/adyen.css';
const ADYEN_SCRIPT_HREF =
  'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.2.0/adyen.js';

const COMPONENT_CONTAINER_ID = 'component-container';
const PAYMENT_METHOD_CARD = 'card';
const ENV_TEST = 'test';

class Adyen extends Component {
  componentDidMount() {
    if (window.AdyenCheckout === undefined) {
      this.loadAdyenStylesheet()
        .then(this.loadAdyenScript)
        .then(this.renderCheckout);
    } else {
      this.renderCheckout();
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
      showPayButton: true,
      environment: ENV_TEST,
      originKey:
        ENVIRONMENT_CONFIGURATION.ADYEN_PUBLIC_KEY[window.location.origin],
      onSubmit,
      onChange
    };
    new window.AdyenCheckout(configuration)
      .create(PAYMENT_METHOD_CARD)
      .mount(`#${COMPONENT_CONTAINER_ID}`);
  };

  render() {
    return (
      <AdyenStyled>
        <LocalhostWarning />
        <div id={COMPONENT_CONTAINER_ID} />
      </AdyenStyled>
    );
  }
}
Adyen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func
};

Adyen.defaultProps = {
  onChange: () => {}
};

export default Adyen;
