import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getCustomerSubscriptions } from 'api';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';

import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: {
        currentPlan: false
      },
      errors: {
        currentPlan: []
      }
    };
  }

  componentDidMount() {
    const { planDetails, updateList, innerPopup, hideInnerPopup } = this.props;
    if (innerPopup.isOpen) {
      hideInnerPopup();
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
      isLoading: {
        currentPlan: true
      }
    });
    getCustomerSubscriptions()
      .then(response => {
        if (response.errors.length) {
          this.setState({
            errors: {
              currentPlan: response.errors
            }
          });
        } else {
          const customerSubscriptions = response.responseData.items;
          setCurrentPlan(customerSubscriptions);
        }
        this.setState({
          isLoading: {
            currentPlan: false
          }
        });
      })
      .catch(err => {
        this.setState({
          errors: { currentPlan: [err.message] },
          isLoading: { currentPlan: false }
        });
      });
  };

  renderPopup = type => {
    const { updateList, innerPopup, hideInnerPopup } = this.props;
    switch (type) {
      case 'updateSubscription':
        return (
          <UpdateSubscription
            hideInnerPopup={hideInnerPopup}
            offerDetails={innerPopup.data.offerData}
            updateList={updateList}
            action={innerPopup.data.action}
          />
        );
      default:
        return <></>;
    }
  };

  render() {
    const {
      planDetails,
      innerPopup,
      showInnerPopup,
      updateList,
      t
    } = this.props;
    const { errors, isLoading } = this.state;
    return (
      <WrapStyled>
        {innerPopup.isOpen ? (
          this.renderPopup(innerPopup.type)
        ) : (
          <>
            <SectionHeader marginTop="0">{t('Current plan')}</SectionHeader>
            <CurrentPlan
              subscriptions={planDetails.currentPlan}
              errors={errors.currentPlan}
              isLoading={isLoading.currentPlan}
              showInnerPopup={showInnerPopup}
              updateList={updateList}
            />
          </>
        )}
      </WrapStyled>
    );
  }
}

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  innerPopup: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  t: PropTypes.func
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  t: k => k
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
