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
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import ResumeSubscriptionPopup from 'components/ResumeSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import CancelPausePopup from 'components/CancelPausePopup';
import getSwitch from 'api/Customer/getSwitch';
import GracePeriodError from 'components/GracePeriodError';
import { useDispatch, useSelector } from 'react-redux';
import { init } from 'redux/publisherConfigSlice';
import { fetchOffers } from 'redux/offersSlice';
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
  skipAvailableDowngradesStep,
  setSwitchDetails,
  t,
  displayGracePeriodError
}) => {
  const [isLoadingCurrentPlan, setIsLoadingCurrentPlan] = useState(false);
  const [isLoadingChangePlan, setIsLoadingChangePlan] = useState(false);
  const [isSwitchInProgress, setIsSwitchInProgress] = useState(false);
  const [isErrorCurrentPlan, setIsErrorCurrentPlan] = useState([]);
  const [isErrorChangePlan, setIsErrorChangePlan] = useState([]);
  const { offers } = useSelector(state => state.offers);
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const didMount = useRef(false);
  const dispatch = useDispatch();

  const getAndSaveSwitchSettings = async customerSubscriptions => {
    if (customerSubscriptions.length > 1) {
      setOfferToSwitch({}); // reset previously saved offer to switch
    }
    const result = customerSubscriptions.map(offer =>
      getAvailableSwitches(offer.offerId).then(data => {
        const { response, status } = data;
        if (!response.errors.length) {
          setSwitchSettings({
            offerId: offer.offerId,
            settings: response.responseData
          });
        } else if (status === 404) {
          setIsSwitchInProgress(true);
        } else setIsErrorChangePlan(response.errors);
      })
    );
    await Promise.all(result)
      .then(() => {
        setIsLoadingChangePlan(false);
      })
      .catch(() => {
        setIsErrorChangePlan([t('Something went wrong..')]);
        setIsLoadingChangePlan(false);
      });
  };

  const fetchSubscriptions = async () => {
    setIsLoadingCurrentPlan(true);
    setIsLoadingChangePlan(true);

    const customerOffersResponse = await getCustomerOffers();
    if (customerOffersResponse.errors?.length) {
      setIsErrorCurrentPlan(customerOffersResponse.errors);
    } else {
      const customerOffers = customerOffersResponse.items;
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

      const offersWithPendingSwitches = activeSubscriptions.filter(
        sub => sub.pendingSwitchId
      );

      if (offersWithPendingSwitches.length) {
        offersWithPendingSwitches.forEach(subscription => {
          getSwitch(subscription.pendingSwitchId).then(resp =>
            setSwitchDetails({
              details: {
                [subscription.pendingSwitchId]: resp.responseData
              }
            })
          );
        });
      }
      if (activeSubscriptions.length === 1) {
        setOfferToSwitch(activeSubscriptions[0]);
      }
      if (activeSubscriptions.length > 0) {
        getAndSaveSwitchSettings(customerSubscriptions);
      }
    }
    setIsLoadingCurrentPlan(false);
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
    if (planDetails.currentPlan.length === 0) {
      fetchSubscriptions();
    }
    if (displayGracePeriodError !== null) {
      dispatch(
        init({
          displayGracePeriodError
        })
      );
    }
    if (offers.length === 0) dispatch(fetchOffers());
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
            skipAvailableDowngradesStep={skipAvailableDowngradesStep}
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
      case 'pauseSubscription':
        return (
          <PauseSubscriptionPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      case 'cancelSwitch':
        return (
          <CancelSwitchPopup
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            popupData={innerPopup.data}
            updateList={updateList}
            setSwitchDetails={setSwitchDetails}
          />
        );
      case 'cancelPause':
        return (
          <CancelPausePopup
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            popupData={innerPopup.data}
            updateList={updateList}
            setSwitchDetails={setSwitchDetails}
          />
        );
      case 'resumeSubscription':
        return (
          <ResumeSubscriptionPopup
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

  const isPauseActive = pauseOffersIDs.includes(
    planDetails.offerToSwitch.offerId
  );

  return (
    <WrapStyled>
      <GracePeriodError />
      {innerPopup.isOpen ? (
        renderPopup(innerPopup.type)
      ) : (
        <>
          {/* TODO: implement headers hierachy (dynamic calculation) */}
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
          {activeSubscriptions.length !== 0 && !isPauseActive && (
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
                  (Object.keys(planDetails.switchSettings).length === 0 &&
                    !isSwitchInProgress)
                }
                isSwitchInProgress={isSwitchInProgress}
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
  skipAvailableDowngradesStep: PropTypes.bool,
  t: PropTypes.func,
  displayGracePeriodError: PropTypes.bool
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  t: k => k,
  displayGracePeriodError: null
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
