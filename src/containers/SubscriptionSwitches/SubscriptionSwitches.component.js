import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import SectionHeader from 'components/SectionHeader';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import MyAccountError from 'components/MyAccountError';
import PlanDetailsPopupManager from 'components/PlanDetailsPopupManager';
import { showPopup } from 'redux/popupSlice';
import { POPUP_TYPES } from 'redux/innerPopupReducer';

import {
  fetchCustomerOffers,
  fetchPendingSwitches,
  fetchAvailableSwitches,
  setOfferToSwitch
} from 'redux/planDetailsSlice';
import { WrapStyled } from './SubscriptionSwitchesStyled';

const SubscriptionSwitches = ({
  offerId,
  toOfferId,
  onCancel,
  onSwitchSuccess,
  onSwitchError
}) => {
  const { offerToSwitch } = useSelector(state => state.plan);
  const { updateList: updateListValue } = useSelector(state => state.plan);
  const { isOpen: isPopupOpen } = useSelector(state => state.popupManager);
  const { data: switchSettings } = useSelector(
    store => store.plan.switchSettings
  );

  const [switchSettingsError, setSwitchSettingsError] = useState(false);

  const { t } = useTranslation();
  const didMount = useRef(false);
  const dispatch = useDispatch();

  const getAndSaveSwitchSettings = async customerSubscriptions => {
    await dispatch(fetchAvailableSwitches(customerSubscriptions));
  };

  const fetchOffersData = async () => {
    const customerOffers = await dispatch(fetchCustomerOffers()).unwrap();

    const activeSubscriptions = customerOffers.filter(
      offer => offer.status === 'active' && offer.offerType === 'S'
    );

    const offersWithPendingSwitches = activeSubscriptions.filter(
      sub => sub.pendingSwitchId
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
    if (toOfferId && Object.keys(switchSettings).length) {
      if (!switchSettings[offerId]) setSwitchSettingsError(true);
      else {
        const toOffer = switchSettings[offerId].available.find(
          item => item.toOfferId === toOfferId
        );
        if (!toOffer) setSwitchSettingsError(true);
        else
          dispatch(
            showPopup({
              type: POPUP_TYPES.switchPlan,
              data: {
                offerData: {
                  ...toOffer
                }
              }
            })
          );
      }
    }
  }, [offerId, switchSettings]);

  useEffect(() => {
    if (didMount.current) {
      fetchOffersData();
    } else {
      didMount.current = true;
    }
  }, [updateListValue]);

  if (switchSettingsError) {
    return <MyAccountError generalError />;
  }

  return (
    <WrapStyled>
      {isPopupOpen ? (
        <PlanDetailsPopupManager
          onCancel={onCancel}
          onSwitchSuccess={onSwitchSuccess}
          onSwitchError={onSwitchError}
        />
      ) : (
        <>
          <SectionHeader>{t('Change Plan')}</SectionHeader>
          <SubscriptionSwitchesList />
        </>
      )}
    </WrapStyled>
  );
};

SubscriptionSwitches.propTypes = {
  offerId: PropTypes.string.isRequired,
  toOfferId: PropTypes.string,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func
};

SubscriptionSwitches.defaultProps = {
  onCancel: null,
  onSwitchSuccess: null,
  toOfferId: '',
  onSwitchError: null
};

export default SubscriptionSwitches;
