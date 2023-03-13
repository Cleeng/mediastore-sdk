import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import GracePeriodError from 'components/GracePeriodError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { init } from 'redux/publisherConfigSlice';
import { fetchOffers } from 'redux/offersSlice';
import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch
} from 'redux/planDetailsSlice';
import { WrapStyled } from './PlanDetailsStyled';

const PlanDetails = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  displayGracePeriodError
}) => {
  const { data: currentPlan } = useSelector(state => state.plan.currentPlan);
  const { offerToSwitch } = useSelector(state => state.plan);
  const { updateList: updateListValue } = useSelector(state => state.plan);
  const { offers } = useSelector(state => state.offers);
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const { isOpen: isPopupOpen } = useSelector(state => state.popupManager);

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

  const activeSubscriptions = currentPlan.filter(
    offer => offer.status === 'active' && offer.offerType === 'S'
  );

  const isPauseActive = pauseOffersIDs.includes(offerToSwitch.offerId);

  return (
    <WrapStyled>
      <GracePeriodError />
      {isPopupOpen ? (
        <PlanDetailsPopupManager
          customCancellationReasons={customCancellationReasons}
          skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        />
      ) : (
        <>
          <SectionHeader>{t('Current plan')}</SectionHeader>
          <CurrentPlan />
          {activeSubscriptions.length !== 0 && !isPauseActive && (
            <>
              <SectionHeader>{t('Change Plan')}</SectionHeader>
              <SubscriptionSwitchesList />
            </>
          )}
        </>
      )}
    </WrapStyled>
  );
};

PlanDetails.propTypes = {
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
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  displayGracePeriodError: null
};

export default PlanDetails;
