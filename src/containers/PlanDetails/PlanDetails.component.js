import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';

import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import ResumeSubscriptionPopup from 'components/ResumeSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import CancelPausePopup from 'components/CancelPausePopup';
import GracePeriodError from 'components/GracePeriodError';
import { useDispatch, useSelector } from 'react-redux';
import { init } from 'redux/publisherConfigSlice';
import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch,
  updateList,
  setSwitchDetails
} from 'redux/planDetailsSlice';
import { fetchOffers } from 'redux/offersSlice';
import { WrapStyled } from './PlanDetailsStyled';

const PlanDetails = ({
  innerPopup,
  hideInnerPopup,
  showInnerPopup,
  customCancellationReasons, // this one have to stay here
  skipAvailableDowngradesStep, // this one have to stay here
  displayGracePeriodError // this one have to stay here
}) => {
  const [isSwitchInProgress, setIsSwitchInProgress] = useState(false);

  const { data: currentPlan } = useSelector(state => state.plan.currentPlan);

  const {
    data: switchSettings,
    loading: isSwitchSettingsLoading,
    error: isSwitchSettingsError
  } = useSelector(state => state.plan.switchSettings);

  const { offerToSwitch } = useSelector(state => state.plan);
  const { updateList: updateListValue } = useSelector(state => state.plan);

  const { offers } = useSelector(state => state.offers);
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const { t } = useTranslation();
  const didMount = useRef(false);
  const dispatch = useDispatch();

  const getAndSaveSwitchSettings = async customerSubscriptions => {
    if (customerSubscriptions.length > 1) {
      dispatch(setOfferToSwitch({})); // reset previously saved offer to switch
    }
    dispatch(fetchAvailableSwitches(customerSubscriptions));
  };

  const fetchSubscriptions = async () => {
    const customerOffers = await dispatch(fetchCustomerOffers()).unwrap();

    const activeSubscriptions = customerOffers.filter(
      offer => offer.status === 'active' && offer.offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      sub => sub.pendingSwitchId
    );

    dispatch(fetchPendingSwitches(offersWithPendingSwitches));

    if (activeSubscriptions.length === 1) {
      dispatch(setOfferToSwitch(activeSubscriptions[0]));
    }

    if (activeSubscriptions.length > 0) {
      getAndSaveSwitchSettings(activeSubscriptions);
    }
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      dispatch(updateList());
    }
    if (currentPlan.length === 0) {
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
  }, [updateListValue]);

  const renderPopup = type => {
    switch (type) {
      case 'updateSubscription':
        return (
          <UpdateSubscription
            hideInnerPopup={hideInnerPopup}
            showInnerPopup={showInnerPopup}
            offerDetails={innerPopup.data.offerData}
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
            fromOffer={offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      case 'pauseSubscription':
        return (
          <PauseSubscriptionPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      case 'cancelSwitch':
        return (
          <CancelSwitchPopup
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            popupData={innerPopup.data}
            setSwitchDetails={setSwitchDetails}
          />
        );
      case 'cancelPause':
        return (
          <CancelPausePopup
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            popupData={innerPopup.data}
            setSwitchDetails={setSwitchDetails}
          />
        );
      case 'resumeSubscription':
        return (
          <ResumeSubscriptionPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      default:
        return <></>;
    }
  };

  const activeSubscriptions = currentPlan.filter(
    offer => offer.status === 'active' && offer.offerType === 'S'
  );

  const isPauseActive = pauseOffersIDs.includes(offerToSwitch.offerId);

  return (
    <WrapStyled>
      <GracePeriodError />
      {innerPopup.isOpen ? (
        renderPopup(innerPopup.type)
      ) : (
        <>
          <SectionHeader>{t('Current plan')}</SectionHeader>
          <CurrentPlan
            showInnerPopup={showInnerPopup}
            offerToSwitch={offerToSwitch}
          />
          {activeSubscriptions.length !== 0 && !isPauseActive && (
            <>
              <SectionHeader>{t('Change Plan')}</SectionHeader>
              <SubscriptionSwitchesList
                switchSettings={switchSettings[offerToSwitch.offerId]}
                showInnerPopup={showInnerPopup}
                isOfferSelected={!!offerToSwitch.offerId}
                isLoading={
                  isSwitchSettingsLoading ||
                  (Object.keys(switchSettings).length === 0 &&
                    !isSwitchInProgress)
                }
                isSwitchInProgress={isSwitchInProgress}
                errors={isSwitchSettingsError || []}
                fromOfferId={offerToSwitch.offerId}
              />
            </>
          )}
        </>
      )}
    </WrapStyled>
  );
};

PlanDetails.propTypes = {
  innerPopup: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool,
  displayGracePeriodError: PropTypes.bool
};

PlanDetails.defaultProps = {
  innerPopup: {},
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  displayGracePeriodError: null
};

export default PlanDetails;
