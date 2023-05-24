import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getCustomerOffers, getAvailableSwitches } from 'api';
import getSwitch from 'api/Customer/getSwitch';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import { WrapStyled } from './SubscriptionsStyled';

const Subscriptions = ({
  planDetails,
  updateList,
  innerPopup,
  hideInnerPopup,
  setCurrentPlan,
  // eslint-disable-next-line no-unused-vars
  setSwitchSettings,
  setOfferToSwitch,
  showInnerPopup,
  setSwitchDetails,
  skipAvailableDowngradesStep,
  t
}) => {
  const [isLoadingCurrentPlan, setIsLoadingCurrentPlan] = useState(false);
  const [isErrorCurrentPlan, setIsErrorCurrentPlan] = useState([]);
  const didMount = useRef(false);
  console.log('package refreshed!');
  const getAndSaveSwitchSettings = async customerSubscriptions => {
    if (customerSubscriptions.length > 1) {
      setOfferToSwitch({}); // reset previously saved offer to switch
    }
    customerSubscriptions.map(offer =>
      getAvailableSwitches(offer.offerId).then(data => {
        const { response } = data;
        if (!response.errors.length) {
          setSwitchSettings({
            offerId: offer.offerId,
            settings: response.responseData
          });
        }
      })
    );
  };

  const fetchSubscriptions = async () => {
    setIsLoadingCurrentPlan(true);

    const customerOffersResponse = await getCustomerOffers();
    if (customerOffersResponse.errors?.length) {
      setIsErrorCurrentPlan(customerOffersResponse.errors);
    } else {
      const customerOffers = customerOffersResponse.items;
      const customerSubscriptions = customerOffers.filter(
        offer => offer.offerType === 'S'
      );
      setCurrentPlan(customerSubscriptions);

      const activeSubscriptions = customerSubscriptions.filter(
        sub => sub.status === 'active'
      );

      const offersWithPendingSwitches = activeSubscriptions.filter(
        sub => sub.pendingSwitchId
      );

      if (offersWithPendingSwitches.length) {
        offersWithPendingSwitches.forEach(subscription => {
          getSwitch(subscription.pendingSwitchId).then(resp =>
            setSwitchDetails({
              details: {
                [subscription.pendingSwitchId]: resp.responseData
              }
            })
          );
        });
      }
      if (activeSubscriptions.length === 1) {
        setOfferToSwitch(activeSubscriptions[0]);
      }
      if (activeSubscriptions.length > 0) {
        getAndSaveSwitchSettings(customerSubscriptions);
      }
    }
    setIsLoadingCurrentPlan(false);
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
    if (planDetails.currentPlan.length === 0) {
      fetchSubscriptions();
    }
  }, []);

  useEffect(() => {
    if (didMount.current) {
      fetchSubscriptions();
    } else {
      didMount.current = true;
    }
  }, [planDetails.updateList]);

  const renderPopup = type => {
    switch (type) {
      case 'updateSubscription':
        return (
          <UpdateSubscription
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            offerDetails={innerPopup.data.offerData}
            updateList={updateList}
            action={innerPopup.data.action}
            skipAvailableDowngradesStep={skipAvailableDowngradesStep}
          />
        );
      case 'switchPlan':
        return (
          <SwitchPlanPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      case 'pauseSubscription':
        return (
          <PauseSubscriptionPopup
            showInnerPopup={showInnerPopup}
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
            isPartOfCancellationFlow={innerPopup.data.isPartOfCancellationFlow}
          />
        );
      case 'cancelSwitch':
        return (
          <CancelSwitchPopup
            showInnerPopup={showInnerPopup}
            hideInnerPopup={hideInnerPopup}
            popupData={innerPopup.data}
            updateList={updateList}
            setSwitchDetails={setSwitchDetails}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <WrapStyled>
      {innerPopup.isOpen ? (
        renderPopup(innerPopup.type)
      ) : (
        <>
          <SectionHeader>{t('Current plan')}</SectionHeader>
          <CurrentPlan
            subscriptions={planDetails.currentPlan}
            errors={isErrorCurrentPlan}
            isLoading={isLoadingCurrentPlan}
            showInnerPopup={showInnerPopup}
            setOfferToSwitch={setOfferToSwitch}
            offerToSwitch={planDetails.offerToSwitch}
            updateList={updateList}
          />
        </>
      )}
    </WrapStyled>
  );
};

Subscriptions.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  innerPopup: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  setOfferToSwitch: PropTypes.func.isRequired,
  setSwitchSettings: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  setSwitchDetails: PropTypes.func.isRequired,
  skipAvailableDowngradesStep: PropTypes.bool,
  t: PropTypes.func
};

Subscriptions.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  skipAvailableDowngradesStep: false,
  t: k => k
};

export { Subscriptions as PureSubscriptions };

export default withTranslation()(labeling()(Subscriptions));
