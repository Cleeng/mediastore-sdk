import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';

import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import GracePeriodError from 'components/GracePeriodError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { init } from 'redux/publisherConfigSlice';
import { selectPopupDetails, hidePopup } from 'redux/popupSlice';
import {
  selectPlanDetails,
  selectCurrentPlan,
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch,
  resetOfferToSwitch,
  updateList
} from 'redux/planDetailsSlice';
import { fetchOffers } from 'redux/offersSlice';
import { CustomerOffer } from 'api/Customer/types/getCustomerOffers.types';
import { WrapStyled } from './PlanDetailsStyled';
import { PlanDetailsProps } from './PlanDetails.types';

const PlanDetails = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep,
  displayGracePeriodError
}: PlanDetailsProps) => {
  const { data: currentPlan } = useAppSelector(selectCurrentPlan);
  const {
    offerToSwitch: { offerId: offerToSwitchId }
  } = useAppSelector(selectPlanDetails);
  const { updateList: updateListValue } = useAppSelector(selectPlanDetails);
  const { isOpen: isPopupOpen } = useAppSelector(selectPopupDetails);
  const { offers } = useAppSelector(state => state.offers);
  const { pauseOffersIDs } = useAppSelector(store => store.offers);
  const { t } = useTranslation();
  const didMount = useRef(false);
  const dispatch = useAppDispatch();

  const getAndSaveSwitchSettings = async (
    customerSubscriptions: CustomerOffer[]
  ) => {
    if (customerSubscriptions.length > 1) {
      dispatch(resetOfferToSwitch());
    }
    dispatch(fetchAvailableSwitches(customerSubscriptions));
  };

  const fetchSubscriptions = async () => {
    const customerOffers = await dispatch(fetchCustomerOffers()).unwrap();

    const activeSubscriptions = customerOffers.filter(
      (offer: CustomerOffer) =>
        offer.status === 'active' && offer.offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      (sub: CustomerOffer) => sub.pendingSwitchId
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

    if (isPopupOpen) {
      dispatch(hidePopup());
      dispatch(updateList());
    }
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

  const isPauseActive = pauseOffersIDs.includes(offerToSwitchId);

  if (isPopupOpen)
    return (
      <PlanDetailsPopupManager
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        skipAvailableFreeExtensionStep={skipAvailableFreeExtensionStep}
      />
    );

  return (
    <WrapStyled>
      <GracePeriodError />
      <SectionHeader>
        <>{t('plandetails.current-plan', 'Current Plan')}</>
      </SectionHeader>
      <CurrentPlan />
      {activeSubscriptions.length !== 0 && !isPauseActive && (
        <>
          <SectionHeader>
            <>{t('plandetails.change-plan', 'Change Plan')}</>
          </SectionHeader>
          <SubscriptionSwitchesList />
        </>
      )}
    </WrapStyled>
  );
};

export default PlanDetails;
