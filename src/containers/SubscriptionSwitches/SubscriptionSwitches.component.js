import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import SectionHeader from 'components/SectionHeader';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import MyAccountError from 'components/MyAccountError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { showPopup, hidePopup } from 'redux/popupSlice';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { fetchOffers } from 'redux/offersSlice';

import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch,
  updateList
} from 'redux/planDetailsSlice';
import { WrapStyled } from './SubscriptionSwitchesStyled';

const SubscriptionSwitches = ({
  offerId,
  onCancel,
  toOfferId,
  onSwitchSuccess,
  onSwitchError
}) => {
  const { isOpen: isPopupOpen } = useSelector((state) => state.popupManager);
  const { data: switchSettings } = useSelector(
    (store) => store.plan.switchSettings
  );
  const { offers } = useSelector((state) => state.offers);
  const [switchSettingsError, setSwitchSettingsError] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const getAndSaveSwitchSettings = async (selectedSubscriptionData) => {
    await dispatch(fetchAvailableSwitches([selectedSubscriptionData]));
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

    const selectedSubscriptionData = activeSubscriptions.find(
      (offer) => offer.offerId === offerId
    );
    if (!selectedSubscriptionData) {
      setSwitchSettingsError(true);
      return;
    }
    dispatch(setOfferToSwitch(selectedSubscriptionData));
    getAndSaveSwitchSettings(selectedSubscriptionData);
  };

  const immediatelyOpenSwitchPopupIfPossible = () => {
    if (offerId && toOfferId) {
      const toOfferData = switchSettings[offerId]?.available.find(
        (item) => item.toOfferId === toOfferId
      );
      if (!toOfferData) return;
      dispatch(
        showPopup({
          type: POPUP_TYPES.switchPlan,
          data: {
            offerData: {
              ...toOfferData
            }
          }
        })
      );
    }
  };

  useEffect(() => {
    if (offerId) {
      fetchOffersData();
    }
    if (isPopupOpen) {
      dispatch(hidePopup());
      dispatch(updateList());
    }
    if (offers.length === 0) dispatch(fetchOffers());
  }, []);

  useEffect(() => {
    if (offerId && !switchSettings[offerId]) {
      fetchOffersData();
    }
  }, [offerId]);

  useEffect(() => {
    immediatelyOpenSwitchPopupIfPossible();
  }, [switchSettings]);

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
      <SectionHeader>
        {t('subscription-switches.change-plan', 'Change Plan')}
      </SectionHeader>
      <SubscriptionSwitchesList />
    </WrapStyled>
  );
};

SubscriptionSwitches.propTypes = {
  offerId: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func,
  toOfferId: PropTypes.string
};

SubscriptionSwitches.defaultProps = {
  onCancel: null,
  onSwitchSuccess: null,
  onSwitchError: null,
  toOfferId: null
};

export { SubscriptionSwitches as PureSubscriptionSwitches };

export default SubscriptionSwitches;
