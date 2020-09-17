import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import { getCustomerSubscriptions } from 'api';
import { PropTypes } from 'prop-types';
import UpdateSubscription from 'components/UpdateSubscription';

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
    const { planDetails, hideSurvey, updateList } = this.props;
    if (planDetails.isSurveyShown) {
      hideSurvey();
      updateList();
    }
    if (planDetails.currentPlan.length === 0) {
      this.fetchSubscriptions();
    }
  }

  componentDidUpdate(prevProps) {
    const { planDetails } = this.props;
    if (prevProps.planDetails.updateList !== planDetails.updateList) {
      this.fetchSubscriptions();
    }
  }

  fetchSubscriptions = async () => {
    const { setCurrentPlan } = this.props;

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
  };

  render() {
    const {
      planDetails,
      hideSurvey,
      showSurvey,
      updateList,
      setUpdateAction,
      t
    } = this.props;
    const { errors, currentPlanLoading } = this.state;

    return (
      <WrapStyled>
        {planDetails.isSurveyShown ? (
          <>
            <UpdateSubscription
              hideSurvey={hideSurvey}
              offerDetails={planDetails.offerToUpdate}
              updateList={updateList}
              action={planDetails.updateAction}
            />
          </>
        ) : (
          <>
            <SectionHeader marginTop="0">{t('Current plan')}</SectionHeader>
            <CurrentPlan
              subscriptions={planDetails.currentPlan}
              errors={errors}
              currentPlanLoading={currentPlanLoading}
              showSurvey={showSurvey}
              setUpdateAction={setUpdateAction}
            />
          </>
        )}
      </WrapStyled>
    );
  }
}

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  setUpdateAction: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  showSurvey: PropTypes.func.isRequired,
  hideSurvey: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  t: PropTypes.func
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  t: k => k
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
