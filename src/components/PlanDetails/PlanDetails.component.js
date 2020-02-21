/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PaymentMehod from 'components/PaymentMethod';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import { getPaymentDetails } from 'api';
import { PropTypes } from 'prop-types';

import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const { planDetails, setPaymentDetails } = this.props;

    if (!planDetails.paymentDetails.length)
      getPaymentDetails().then(response => {
        if (response.errors.length) {
          this.setState({
            errors: response.errors
          });
        } else {
          setPaymentDetails(
            response.responseData.paymentDetails.paymentDetails
          );
        }
      });
  }

  render() {
    const { planDetails } = this.props;

    return (
      <WrapStyled>
        <MyAccountHeading text="Plan Details" />
        <PaymentMehod
          paymentDetails={planDetails ? planDetails.paymentDetails : []}
        />
        <MyAccountHeading text="Transactions" />
      </WrapStyled>
    );
  }
}

export default PlanDetails;

PlanDetails.propTypes = {
  setPaymentDetails: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any)
};

PlanDetails.defaultProps = {
  planDetails: { paymentDetails: [] }
};
