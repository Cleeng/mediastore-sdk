import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getCustomerSubscriptions, getAvailableSwitches } from 'api';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import SwitchPlanPopup from 'components/SwitchPlanPopup';

import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: {
        currentPlan: false,
        changePlan: false
      },
      errors: {
        currentPlan: [],
        changePlan: []
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
    const { setCurrentPlan, setOfferToSwitch } = this.props;

    this.setState({
      isLoading: {
        currentPlan: true,
        changePlan: true
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
          const activeSubscriptions = customerSubscriptions.filter(
            sub => sub.status === 'active'
          );

          if (activeSubscriptions.length === 1) {
            setOfferToSwitch(activeSubscriptions[0]);
          }

          if (activeSubscriptions.length > 0) {
            this.getAndSaveSwitchSettings(customerSubscriptions);
          }
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

  getAndSaveSwitchSettings = async customerSubscriptions => {
    const { setSwitchSettings } = this.props;
    const result = customerSubscriptions.map(offer =>
      getAvailableSwitches(offer.offerId).then(response => {
        if (!response.errors.length) {
          setSwitchSettings({
            offerId: offer.offerId,
            settings: response.responseData
          });
        } else {
          this.setState({
            errors: {
              changePlan: response.errors
            }
          });
        }
      })
    );
    await Promise.all(result)
      .then(() => {
        this.setState({
          isLoading: {
            changePlan: false
          }
        });
      })
      .catch(err => {
        this.setState({
          errors: { changePlan: [err.message] },
          isLoading: {
            changePlan: false
          }
        });
      });
  };

  renderPopup = type => {
    const { updateList, innerPopup, hideInnerPopup, planDetails } = this.props;
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
      case 'switchPlan':
        return (
          <SwitchPlanPopup
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
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
      setOfferToSwitch,
      updateList,
      t
    } = this.props;
    const { errors, isLoading } = this.state;
    const activeSubscriptions = planDetails.currentPlan.filter(
      sub => sub.status === 'active'
    );
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
              setOfferToSwitch={setOfferToSwitch}
              offerToSwitch={planDetails.offerToSwitch}
              updateList={updateList}
            />
            {activeSubscriptions.length !== 0 && (
              <>
                <SectionHeader marginTop="0">{t('Change Plan')}</SectionHeader>
                <SubscriptionSwitchesList
                  switchSettings={
                    planDetails.switchSettings[
                      planDetails.offerToSwitch.offerId
                    ]
                  }
                  showInnerPopup={showInnerPopup}
                  isOfferSelected={!!planDetails.offerToSwitch.offerId}
                  isLoading={
                    isLoading.changePlan ||
                    Object.keys(planDetails.switchSettings).length === 0
                  }
                  errors={errors.changePlan || []}
                />
              </>
            )}
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
  setOfferToSwitch: PropTypes.func.isRequired,
  setSwitchSettings: PropTypes.func.isRequired,
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
