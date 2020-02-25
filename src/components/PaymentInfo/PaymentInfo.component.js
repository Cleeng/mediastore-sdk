/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PaymentMehod from 'components/PaymentMethod';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import { getPaymentDetails } from 'api';
import { PropTypes } from 'prop-types';

import { WrapStyled } from './PaymentInfoStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const { paymentInfo, setPaymentMethod } = this.props;

    if (!paymentInfo.paymentMethod.length)
      getPaymentDetails().then(response => {
        if (response.errors.length) {
          this.setState({
            errors: response.errors
          });
        } else {
          setPaymentMethod(response.responseData.paymentDetails);
        }
      });
  }

  render() {
    const { paymentInfo } = this.props;

    return (
      <WrapStyled>
        <MyAccountHeading text="Payment Method" />
        <PaymentMehod
          paymentDetails={paymentInfo ? paymentInfo.paymentMethod : []}
        />
        {/* <MyAccountHeading text="Transactions" /> */}
      </WrapStyled>
    );
  }
}

export default PlanDetails;

PlanDetails.propTypes = {
  setPaymentMethod: PropTypes.func.isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.any)
};

PlanDetails.defaultProps = {
  paymentInfo: { paymentMethod: [] }
};
