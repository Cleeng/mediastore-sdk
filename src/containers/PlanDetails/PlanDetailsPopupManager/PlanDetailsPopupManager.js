import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import ResumeSubscriptionPopup from 'components/ResumeSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import CancelPausePopup from 'components/CancelPausePopup';

const PlanDetailsPopupManager = ({
  customCancellationReasons,
  skipAvailableDowngradesStep
}) => {
  const {
    updateSubscription,
    switchPlan,
    pauseSubscription,
    cancelSwitch,
    cancelPause,
    resumeSubscription
  } = useSelector(state => state.popupManager);

  if (updateSubscription.isOpen)
    return (
      <UpdateSubscription
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
      />
    );

  if (switchPlan.isOpen) return <SwitchPlanPopup />;

  if (pauseSubscription.isOpen) return <PauseSubscriptionPopup />;

  if (resumeSubscription.isOpen) return <ResumeSubscriptionPopup />;

  if (cancelSwitch.isOpen) return <CancelSwitchPopup />;

  if (cancelPause.isOpen) return <CancelPausePopup />;

  return <></>;
};

PlanDetailsPopupManager.propTypes = {
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool
};

PlanDetailsPopupManager.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false
};

export default PlanDetailsPopupManager;
