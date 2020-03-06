/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import CurrentPlan from 'components/CurrentPlan';
import { getCustomerSubscriptions } from 'api';
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
    const { planDetails, setCurrentPlan, showLoader, hideLoader } = this.props;
    if (!planDetails.currentPlan.length) {
      showLoader();
      getCustomerSubscriptions().then(response => {
        if (response.errors.length) {
          this.setState({
            errors: response.errors
          });
        } else {
          setCurrentPlan(response.responseData.items);
          hideLoader();
        }
      });
    }
  }

  render() {
    const { planDetails, isLoading } = this.props;

    return (
      <WrapStyled>
        {!isLoading && (
          <>
            <MyAccountHeading text="Current Plan" />
            <CurrentPlan subscriptions={planDetails.currentPlan} />
          </>
        )}
      </WrapStyled>
    );
  }
}

export default PlanDetails;

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any)
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] }
};
