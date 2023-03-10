import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import ResumeSubscriptionPopup from 'components/ResumeSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import CancelPausePopup from 'components/CancelPausePopup';

const PlanDetailsPopupManager = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  onCancel,
  onSwitchSuccess,
  onSwitchError
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

  if (switchPlan.isOpen)
    return (
      <SwitchPlanPopup
        onCancel={onCancel}
        onSwitchSuccess={onSwitchSuccess}
        onSwitchError={onSwitchError}
      />
    );

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
  skipAvailableDowngradesStep: PropTypes.bool,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func
};

PlanDetailsPopupManager.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  onCancel: null,
  onSwitchSuccess: null,
  onSwitchError: null
};

export default PlanDetailsPopupManager;
