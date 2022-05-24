import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getAvailableSwitches, getCustomerSubscriptions } from 'api';
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
  t
}) => {
  const [isLoadingChangePlan, setIsLoadingChangePlan] = useState(false);
  const [isErrorChangePlan, setIsErrorChangePlan] = useState([]);
  const [switchSettingsError, setSwitchSettingsError] = useState(false);
  const didMount = useRef(false);

  const getAndSaveSwitchSettings = async () => {
    getAvailableSwitches(offerId)
      .then(response => {
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

  const getOfferAndSwitchData = async () => {
    getCustomerSubscriptions()
      .then(response => {
        if (!response.errors.length) {
          const customerSubscriptions = response.responseData.items;
          const subscriptionData = customerSubscriptions.find(
            item => item.offerId === offerId
          );
          if (subscriptionData) {
            setOfferToSwitch(
              customerSubscriptions.find(item => item.offerId === offerId)
            );
            getAndSaveSwitchSettings();
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
    if (didMount.current) {
      if (
        offerId &&
        planDetails.offerToSwitch &&
        !Object.keys(planDetails.offerToSwitch).length
      ) {
        getOfferAndSwitchData();
      } else {
        getAndSaveSwitchSettings();
      }
    } else {
      didMount.current = true;
    }
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
        />
      ) : (
        <>
          <SectionHeader>{t('Change Plan')}</SectionHeader>
          <SubscriptionSwitchesList
            switchSettings={planDetails.switchSettings[offerId]}
            showInnerPopup={showInnerPopup}
            isOfferSelected={!!offerId}
            isLoading={
              isLoadingChangePlan ||
              Object.keys(planDetails.switchSettings).length === 0
            }
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
  t: PropTypes.func
};

SubscriptionSwitches.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  setOfferToSwitch: () => {},
  onCancel: null,
  onSwitchSuccess: null,
  toOfferId: '',
  t: k => k
};

export { SubscriptionSwitches as PureSubscriptionSwitches };

export default withTranslation()(labeling()(SubscriptionSwitches));
