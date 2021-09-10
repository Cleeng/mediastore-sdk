import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getAvailableSwitches } from 'api';
import SectionHeader from 'components/SectionHeader';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import { WrapStyled } from './SubscriptionSwitchesStyled';

const SubscriptionSwitches = ({
  offerId,
  planDetails,
  updateList,
  innerPopup,
  hideInnerPopup,
  setSwitchSettings,
  showInnerPopup,
  t
}) => {
  const [isLoadingChangePlan, setIsLoadingChangePlan] = useState(false);
  const [isErrorChangePlan, setIsErrorChangePlan] = useState([]);
  const didMount = useRef(false);

  const getAndSaveSwitchSettings = async () => {
    getAvailableSwitches(offerId)
      .then(response => {
        if (!response.errors.length) {
          setSwitchSettings({
            offerId,
            settings: response.responseData
          });
        } else {
          setIsErrorChangePlan(response.errors);
        }
      })
      .then(() => {
        setIsLoadingChangePlan(false);
      })
      .catch(() => {
        setIsErrorChangePlan([t('Something went wrong..')]);
        setIsLoadingChangePlan(false);
      });
  };

  useEffect(() => {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
    if (planDetails.currentPlan.length === 0) {
      getAndSaveSwitchSettings();
    }
  }, []);

  useEffect(() => {
    if (didMount.current) {
      getAndSaveSwitchSettings();
    } else {
      didMount.current = true;
    }
  }, [offerId]);

  const renderPopup = type => {
    switch (type) {
      case 'updateSubscription':
        return (
          <UpdateSubscription
            hideInnerPopup={hideInnerPopup}
            offerDetails={innerPopup.data.offerData}
            updateList={updateList}
            action={innerPopup.data.action}
          />
        );
      case 'switchPlan':
        return (
          <SwitchPlanPopup
            toOffer={innerPopup.data.offerData}
            fromOffer={planDetails.offerToSwitch}
            hideInnerPopup={hideInnerPopup}
            updateList={updateList}
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
          <SectionHeader marginTop="0">{t('Change Plan')}</SectionHeader>
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
  t: PropTypes.func
};

SubscriptionSwitches.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  t: k => k
};

export { SubscriptionSwitches as PureSubscriptionSwitches };

export default withTranslation()(labeling()(SubscriptionSwitches));
