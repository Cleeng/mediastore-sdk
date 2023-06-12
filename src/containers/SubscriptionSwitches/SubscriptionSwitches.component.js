import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getAvailableSwitches, getCustomerSubscriptions } from 'api';
import { fetchOffers } from 'redux/offersSlice';
import SectionHeader from 'components/SectionHeader';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import MyAccountError from 'components/MyAccountError';
import { WrapStyled } from './SubscriptionSwitchesStyled';

const SubscriptionSwitches = ({
  offerId,
  planDetails,
  updateList,
  innerPopup,
  hideInnerPopup,
  setSwitchSettings,
  showInnerPopup,
  setOfferToSwitch,
  toOfferId,
  onCancel,
  onSwitchSuccess,
  onSwitchError
}) => {
  const [isLoadingChangePlan, setIsLoadingChangePlan] = useState(false);
  const [isErrorChangePlan, setIsErrorChangePlan] = useState([]);
  const [isSwitchInProgress, setIsSwitchInProgress] = useState(false);
  const [switchSettingsError, setSwitchSettingsError] = useState(false);
  const { offers } = useSelector(state => state.offers);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const fetchSwitchSettings = () => {
    getAvailableSwitches(offerId)
      .then(data => {
        const { response, status } = data;
        if (!response.errors.length) {
          setSwitchSettings({
            offerId,
            settings: response.responseData
          });
          if (toOfferId && response.responseData.available.length) {
            const toOfferData = response.responseData.available.find(
              item => item.toOfferId === toOfferId
            );
            if (toOfferData) {
              showInnerPopup({
                type: 'switchPlan',
                data: {
                  offerData: {
                    ...toOfferData
                  }
                }
              });
            } else {
              setSwitchSettingsError(true);
            }
          }
        } else if (status === 404) {
          setIsSwitchInProgress(true);
        } else {
          setIsErrorChangePlan(response.errors);
          setSwitchSettingsError(true);
        }
      })
      .catch(() => {
        setIsErrorChangePlan([t('Something went wrong..')]);
      })
      .finally(() => {
        setIsLoadingChangePlan(false);
      });
  };

  const fetchOffersData = () => {
    getCustomerSubscriptions()
      .then(response => {
        if (!response.errors.length) {
          const customerSubscriptions = response.responseData.items;
          const subscriptionData = customerSubscriptions.find(
            item => item.offerId === offerId
          );
          if (subscriptionData) {
            setOfferToSwitch(subscriptionData);
            fetchSwitchSettings();
          } else {
            setSwitchSettingsError(true);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
  }, []);

  useEffect(() => {
    if (offerId && !Object.keys(planDetails.offerToSwitch).length) {
      fetchOffersData();
    } else if (offerId && !Object.keys(planDetails.switchSettings).length) {
      fetchSwitchSettings();
    }
    if (offers.length === 0) dispatch(fetchOffers());
  }, [offerId]);

  if (switchSettingsError) {
    return <MyAccountError generalError />;
  }

  if (toOfferId) {
    return (
      <WrapStyled>
        <SwitchPlanPopup
          toOffer={innerPopup.data.offerData}
          fromOffer={planDetails.offerToSwitch}
          hideInnerPopup={hideInnerPopup}
          updateList={updateList}
          isPopupLoading={
            isLoadingChangePlan ||
            !innerPopup.isOpen ||
            innerPopup.type !== 'switchPlan'
          }
          onCancel={onCancel}
          onSwitchSuccess={onSwitchSuccess}
          onSwitchError={onSwitchError}
          showInnerPopup={showInnerPopup}
        />
      </WrapStyled>
    );
  }

  return (
    <WrapStyled>
      {innerPopup.isOpen && innerPopup.type === 'switchPlan' ? (
        <SwitchPlanPopup
          toOffer={innerPopup.data.offerData}
          fromOffer={planDetails.offerToSwitch}
          hideInnerPopup={hideInnerPopup}
          updateList={updateList}
          isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          showInnerPopup={showInnerPopup}
          onSwitchError={onSwitchError}
        />
      ) : (
        <>
          <SectionHeader>
            {t('subscription-switches.change-plan', 'Change Plan')}
          </SectionHeader>
          <SubscriptionSwitchesList
            switchSettings={planDetails.switchSettings[offerId]}
            showInnerPopup={showInnerPopup}
            isOfferSelected={!!offerId}
            isLoading={
              isLoadingChangePlan ||
              (Object.keys(planDetails.switchSettings).length === 0 &&
                !isSwitchInProgress)
            }
            isSwitchInProgress={isSwitchInProgress}
            errors={isErrorChangePlan || []}
          />
        </>
      )}
    </WrapStyled>
  );
};

SubscriptionSwitches.propTypes = {
  offerId: PropTypes.string.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  innerPopup: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  setSwitchSettings: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  toOfferId: PropTypes.string,
  setOfferToSwitch: PropTypes.func,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func
};

SubscriptionSwitches.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  setOfferToSwitch: () => {},
  onCancel: null,
  onSwitchSuccess: null,
  toOfferId: '',
  onSwitchError: null
};

export { SubscriptionSwitches as PureSubscriptionSwitches };

export default SubscriptionSwitches;
