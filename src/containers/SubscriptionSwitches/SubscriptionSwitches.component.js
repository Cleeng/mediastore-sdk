import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOffers } from 'redux/offersSlice';
import SectionHeader from 'components/SectionHeader';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import MyAccountError from 'components/MyAccountError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';

import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch
} from 'redux/planDetailsSlice';
import { WrapStyled } from './SubscriptionSwitchesStyled';

const SubscriptionSwitches = ({
  offerId,
  onCancel,
  onSwitchSuccess,
  onSwitchError
}) => {
  const { offerToSwitch } = useSelector(state => state.plan);
  const { isOpen: isPopupOpen } = useSelector(state => state.popupManager);
  const { data: switchSettings } = useSelector(
    store => store.plan.switchSettings
  );

  const [switchSettingsError, setSwitchSettingsError] = useState(false);
  const { offers } = useSelector(state => state.offers);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const getAndSaveSwitchSettings = async customerSubscriptions => {
    await dispatch(fetchAvailableSwitches(customerSubscriptions));
  };

  const fetchOffersData = async () => {
    const customerOffers = await dispatch(fetchCustomerOffers()).unwrap();

    const activeSubscriptions = customerOffers.filter(
      ({ status, offerType }) => status === 'active' && offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      ({ pendingSwitchId }) => pendingSwitchId
    );

    dispatch(fetchPendingSwitches(offersWithPendingSwitches));

    const selectedSubscription = activeSubscriptions.filter(
      offer => offer.offerId === offerId
    );

    if (selectedSubscription.length === 1) {
      dispatch(setOfferToSwitch(activeSubscriptions[0]));
      getAndSaveSwitchSettings(activeSubscriptions);
    } else {
      setSwitchSettingsError(true);
    }
  };

  useEffect(() => {
    if (offerId && !Object.keys(offerToSwitch).length) {
      fetchOffersData();
    } else if (offerId && !Object.keys(switchSettings).length) {
      getAndSaveSwitchSettings();
    }
    if (offers.length === 0) dispatch(fetchOffers());
  }, [offerId]);

  if (switchSettingsError) {
    return <MyAccountError generalError />;
  }

  if (isPopupOpen)
    return (
      <PlanDetailsPopupManager
        onCancel={onCancel}
        onSwitchSuccess={onSwitchSuccess}
        onSwitchError={onSwitchError}
      />
    );

  return (
    <WrapStyled>
      <SectionHeader>{t('Change Plan')}</SectionHeader>
      <SubscriptionSwitchesList />
    </WrapStyled>
  );
};

SubscriptionSwitches.propTypes = {
  offerId: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func
};

SubscriptionSwitches.defaultProps = {
  onCancel: null,
  onSwitchSuccess: null,
  onSwitchError: null
};

export default SubscriptionSwitches;
