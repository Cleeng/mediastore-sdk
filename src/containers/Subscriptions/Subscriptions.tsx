import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';

import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { fetchOffers } from 'appRedux/offersSlice';
import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch,
  resetOfferToSwitch,
  updateList
} from 'appRedux/planDetailsSlice';
import { hidePopup } from 'appRedux/popupSlice';

import { CustomerOffer } from 'api/Customer/types';
import { WrapStyled } from './SubscriptionsStyled';
import { SubscriptionsProps } from './Subscriptions.types';

const Subscriptions = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: SubscriptionsProps) => {
  const { data: currentPlan } = useAppSelector(
    (state) => state.plan.currentPlan
  );
  const { updateList: updateListValue } = useAppSelector((state) => state.plan);
  const { offers } = useAppSelector((state) => state.offers);
  const { isOpen: isPopupOpen } = useAppSelector((state) => state.popupManager);

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
      (offer) => offer.status === 'active' && offer.offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      (sub) => sub.pendingSwitchId
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

  if (isPopupOpen)
    return (
      <PlanDetailsPopupManager
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        skipCancellationSurveyStep={skipCancellationSurveyStep}
      />
    );

  return (
    <WrapStyled>
      <SectionHeader>
        <>{t('subscriptions.current-plan', 'Current plan')}</>
      </SectionHeader>
      <CurrentPlan />
    </WrapStyled>
  );
};

export default Subscriptions;
