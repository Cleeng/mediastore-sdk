import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getCustomerOffers, getAvailableSwitches } from 'api';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import getSwitch from 'api/Customer/getSwitch';
import { WrapStyled } from './PlanDetailsStyled';

const PlanDetails = ({
  planDetails,
  updateList,
  innerPopup,
  hideInnerPopup,
  setCurrentPlan,
  setSwitchSettings,
  setOfferToSwitch,
  showInnerPopup,
  customCancellationReasons,
  setSwitchDetails,
  t
}) => {
  const [isLoadingCurrentPlan, setIsLoadingCurrentPlan] = useState(false);
  const [isLoadingChangePlan, setIsLoadingChangePlan] = useState(false);
  const [isErrorCurrentPlan, setIsErrorCurrentPlan] = useState([]);
  const [isErrorChangePlan, setIsErrorChangePlan] = useState([]);
  const didMount = useRef(false);

  const getAndSaveSwitchSettings = async customerSubscriptions => {
    const result = customerSubscriptions.map(offer =>
      getAvailableSwitches(offer.offerId).then(response => {
        if (!response.errors.length) {
          setSwitchSettings({
            offerId: offer.offerId,
            settings: response.responseData
          });
        } else {
          setIsErrorChangePlan(response.errors);
        }
      })
    );
    await Promise.all(result)
      .then(() => {
        setIsLoadingChangePlan(false);
      })
      .catch(() => {
        setIsErrorChangePlan(t('Something went wrong..'));
        setIsLoadingChangePlan(false);
      });
  };

  const fetchSubscriptions = async () => {
    setIsLoadingCurrentPlan(true);
    setIsLoadingChangePlan(true);

    getCustomerOffers()
      .then(response => {
        if (response.errors.length) {
          setIsErrorCurrentPlan(response.errors);
        } else {
          const customerOffers = response.responseData.items.map(item => ({
            ...item,
            pendingSwitchId: 'bb79fd32-04c9-4792-9f7a-963a31f6fe23'
          }));
          const offersWithActivePasses = customerOffers.filter(
            offer =>
              !(offer.offerType === 'P' && offer.expiresAt * 1000 < Date.now())
          );
          const customerSubscriptions = customerOffers.filter(
            offer => offer.offerType === 'S'
          );
          setCurrentPlan(offersWithActivePasses);
          const activeSubscriptions = customerSubscriptions.filter(
            sub => sub.status === 'active'
          );
          activeSubscriptions
            .filter(sub => sub.pendingSwitchId)
            .forEach(subscription => {
              getSwitch(subscription.pendingSwitchId).then(resp =>
                setSwitchDetails({
                  switchId: subscription.pendingSwitchId,
                  switchDetails: resp.responseData
                })
              );
            });
          if (activeSubscriptions.length === 1) {
            setOfferToSwitch(activeSubscriptions[0]);
          }

          if (activeSubscriptions.length > 0) {
            getAndSaveSwitchSettings(customerSubscriptions);
          }
        }
        setIsLoadingCurrentPlan(false);
      })
      .catch(() => {
        setIsErrorCurrentPlan(t('Something went wrong..'));
        setIsLoadingCurrentPlan(false);
      });
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
    if (planDetails.currentPlan.length === 0) {
      fetchSubscriptions();
    }
  }, []);

  useEffect(() => {
    if (didMount.current) {
      fetchSubscriptions();
    } else {
      didMount.current = true;
    }
  }, [planDetails.updateList]);

  const renderPopup = type => {
    switch (type) {
      case 'updateSubscription':
        return (
          <UpdateSubscription
            hideInnerPopup={hideInnerPopup}
            showInnerPopup={showInnerPopup}
            offerDetails={innerPopup.data.offerData}
            updateList={updateList}
            action={innerPopup.data.action}
            customCancellationReasons={customCancellationReasons}
          />
        );
      case 'switchPlan':
        return (
          <SwitchPlanPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      default:
        return <></>;
    }
  };

  const activeSubscriptions = planDetails.currentPlan.filter(
    offer => offer.status === 'active' && offer.offerType === 'S'
  );

  return (
    <WrapStyled>
      {innerPopup.isOpen ? (
        renderPopup(innerPopup.type)
      ) : (
        <>
          <SectionHeader>{t('Current plan')}</SectionHeader>
          <CurrentPlan
            subscriptions={planDetails.currentPlan}
            errors={isErrorCurrentPlan}
            isLoading={isLoadingCurrentPlan}
            showInnerPopup={showInnerPopup}
            setOfferToSwitch={setOfferToSwitch}
            offerToSwitch={planDetails.offerToSwitch}
            updateList={updateList}
            switchDetails={planDetails.switchDetails}
          />
          {activeSubscriptions.length !== 0 && (
            <>
              <SectionHeader>{t('Change Plan')}</SectionHeader>
              <SubscriptionSwitchesList
                switchSettings={
                  planDetails.switchSettings[planDetails.offerToSwitch.offerId]
                }
                showInnerPopup={showInnerPopup}
                isOfferSelected={!!planDetails.offerToSwitch.offerId}
                isLoading={
                  isLoadingChangePlan ||
                  Object.keys(planDetails.switchSettings).length === 0
                }
                errors={isErrorChangePlan || []}
                fromOfferId={planDetails.offerToSwitch.offerId}
              />
            </>
          )}
        </>
      )}
    </WrapStyled>
  );
};

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  innerPopup: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  setOfferToSwitch: PropTypes.func.isRequired,
  setSwitchSettings: PropTypes.func.isRequired,
  setSwitchDetails: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  t: PropTypes.func
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  customCancellationReasons: null,
  t: k => k
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
