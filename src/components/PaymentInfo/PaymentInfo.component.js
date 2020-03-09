/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMehod from 'components/PaymentMethod';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import { getPaymentDetails } from 'api';
import { PropTypes } from 'prop-types';

import { WrapStyled } from './PaymentInfoStyled';

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const {
      paymentInfo,
      setPaymentMethod,
      showLoader,
      hideLoader
    } = this.props;

    if (!paymentInfo.paymentMethod.length) {
      showLoader();
      getPaymentDetails().then(response => {
        if (response.errors.length) {
          this.setState({
            errors: response.errors
          });
        } else {
          setPaymentMethod(response.responseData.paymentDetails);
          hideLoader();
        }
      });
    } else {
      hideLoader();
    }
  }

  render() {
    const { paymentInfo, isLoading, t } = this.props;

    return (
      <WrapStyled>
        {!isLoading && (
          <>
            <MyAccountHeading text={t('Payment Method')} />
            <PaymentMehod
              paymentDetails={paymentInfo ? paymentInfo.paymentMethod : []}
            />
          </>
        )}
      </WrapStyled>
    );
  }
}

PaymentInfo.propTypes = {
  setPaymentMethod: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

PaymentInfo.defaultProps = {
  paymentInfo: { paymentMethod: [] },
  t: k => k
};

export default withTranslation()(labeling()(PaymentInfo));
