/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PaymentMehod from 'components/PaymentMethod';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import { getPaymentDetails } from 'api';

import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetails: null,
      errors: null
    };
  }

  componentDidMount() {
    getPaymentDetails().then(response => {
      if (response.errors.length) {
        this.setState({
          errors: response.errors
        });
      } else {
        this.setState({
          paymentDetails:
            response.responseData.paymentDetails.data.paymentDetails
        });
      }
    });
  }

  render() {
    const { paymentDetails } = this.state;
    return (
      <WrapStyled>
        <MyAccountHeading text="Plan Details" />
        <PaymentMehod paymentDetails={paymentDetails} />
        <MyAccountHeading text="Transactions" />
      </WrapStyled>
    );
  }
}

export default PlanDetails;
