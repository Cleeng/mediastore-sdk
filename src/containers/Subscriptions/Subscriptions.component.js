import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PropTypes } from 'prop-types';

import { getCustomerSubscriptions } from 'api';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
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
  t
}) => {
  const [isLoadingCurrentPlan, setIsLoadingCurrentPlan] = useState(false);
  const [isErrorCurrentPlan, setIsErrorCurrentPlan] = useState([]);
  const didMount = useRef(false);

  const fetchSubscriptions = async () => {
    setIsLoadingCurrentPlan(true);

    getCustomerSubscriptions()
      .then(response => {
        if (response.errors.length) {
          setIsErrorCurrentPlan(response.errors);
        } else {
          const customerSubscriptions = response.responseData.items;
          setCurrentPlan(customerSubscriptions);
        }
        setIsLoadingCurrentPlan(false);
      })
      .catch(() => {
        setIsErrorCurrentPlan(t('Something went wrong..'));
        setIsLoadingCurrentPlan(false);
      });
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
            hideInnerPopup={hideInnerPopup}
            offerDetails={innerPopup.data.offerData}
            updateList={updateList}
            action={innerPopup.data.action}
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
  t: PropTypes.func
};

Subscriptions.defaultProps = {
  planDetails: { currentPlan: [] },
  innerPopup: {},
  t: k => k
};

export { Subscriptions as PureSubscriptions };

export default withTranslation()(labeling()(Subscriptions));
