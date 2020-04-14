import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import CurrentPlan from 'components/CurrentPlan';
import { getCustomerSubscriptions } from 'api';
import { PropTypes } from 'prop-types';
import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanLoading: false,
      errors: []
    };
  }

  componentDidMount() {
    const { planDetails, setCurrentPlan } = this.props;
    if (planDetails.currentPlan.length === 0) {
      this.setState({
        currentPlanLoading: true
      });
      getCustomerSubscriptions()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentPlan(response.responseData.items);
          }
          this.setState({
            currentPlanLoading: false
          });
        })
        .catch(err => {
          this.setState({ errors: [err.message], currentPlanLoading: false });
        });
    }
  }

  render() {
    const { planDetails, t } = this.props;
    const { errors, currentPlanLoading } = this.state;
    return (
      <WrapStyled>
        <MyAccountHeading text={t('Current plan')} />
        <CurrentPlan
          subscriptions={planDetails.currentPlan}
          errors={errors}
          currentPlanLoading={currentPlanLoading}
        />
      </WrapStyled>
    );
  }
}

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  t: k => k
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
