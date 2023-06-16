import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';

import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import GracePeriodError from 'components/GracePeriodError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { init } from 'redux/publisherConfigSlice';
import { selectPopupDetails } from 'redux/popupSlice';
import { selectPlanDetails, selectCurrentPlan } from 'redux/planDetailsSlice';

import { fetchOffers } from 'redux/offersSlice';
import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch,
  resetOfferToSwitch
} from 'redux/planDetailsSlice';
import { WrapStyled } from './PlanDetailsStyled';
import { PlanDetailsProps, CustomersOffer } from './PlanDetails.types';

const PlanDetails = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  displayGracePeriodError
}: PlanDetailsProps) => {
  const { data: currentPlan } = useAppSelector(selectCurrentPlan);
  const { offerToSwitch } = useAppSelector(selectPlanDetails);
  const { updateList: updateListValue } = useAppSelector(selectPlanDetails);
  const { isOpen: isPopupOpen } = useAppSelector(selectPopupDetails);
  const { offers } = useAppSelector(state => state.offers);
  const { pauseOffersIDs } = useAppSelector(store => store.offers);

  const { t } = useTranslation();
  const didMount = useRef(false);
  const dispatch = useAppDispatch();

  const getAndSaveSwitchSettings = async (
    customerSubscriptions: CustomersOffer[]
  ) => {
    if (customerSubscriptions.length > 1) {
      dispatch(resetOfferToSwitch());
    }
    dispatch(fetchAvailableSwitches(customerSubscriptions));
  };

  const fetchSubscriptions = async () => {
    const customerOffers = await dispatch(fetchCustomerOffers()).unwrap();

    const activeSubscriptions = customerOffers.filter(
      (offer: CustomersOffer) =>
        offer.status === 'active' && offer.offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      (sub: CustomersOffer) => sub.pendingSwitchId
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

  if (isPopupOpen)
    return (
      <PlanDetailsPopupManager
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
      />
    );

  return (
    <WrapStyled>
      <GracePeriodError />
      <SectionHeader>
        <>
          {t('plandetails.current-plan', 'Current Plan')}
        </>
      </SectionHeader>
      <CurrentPlan />
      {activeSubscriptions.length !== 0 && !isPauseActive && (
        <>
          <SectionHeader>
            <>
              {t('plandetails.change-plan', 'Change Plan')}
            </>
            </SectionHeader>
          <SubscriptionSwitchesList />
        </>
      )}
    </WrapStyled>
  );
};

export default PlanDetails;
