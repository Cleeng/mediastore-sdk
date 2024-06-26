import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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

import { WrapStyled } from './SubscriptionsStyled';

const Subscriptions = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep
}) => {
  const { data: currentPlan } = useSelector((state) => state.plan.currentPlan);
  const { updateList: updateListValue } = useSelector((state) => state.plan);
  const { offers } = useSelector((state) => state.offers);
  const { isOpen: isPopupOpen } = useSelector((state) => state.popupManager);

  const { t } = useTranslation();
  const didMount = useRef(false);
  const dispatch = useDispatch();

  const getAndSaveSwitchSettings = async (customerSubscriptions) => {
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
        skipAvailableFreeExtensionStep={skipAvailableFreeExtensionStep}
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

Subscriptions.propTypes = {
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool,
  skipAvailableFreeExtensionStep: PropTypes.bool
};

Subscriptions.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  skipAvailableFreeExtensionStep: false
};

export default Subscriptions;
