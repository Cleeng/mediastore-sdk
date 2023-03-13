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
  const { isOpen, currentType } = useSelector(state => state.popupManager);

  if (!isOpen) return <></>;

  switch (currentType) {
    case 'updateSubscription':
      return (
        <UpdateSubscription
          customCancellationReasons={customCancellationReasons}
          skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        />
      );
    case 'switchPlan':
      return (
        <SwitchPlanPopup
          onCancel={onCancel}
          onSwitchSuccess={onSwitchSuccess}
          onSwitchError={onSwitchError}
        />
      );
    case 'pauseSubscription':
      return <PauseSubscriptionPopup />;
    case 'resumeSubscription':
      return <ResumeSubscriptionPopup />;
    case 'cancelSwitch':
      return <CancelSwitchPopup />;
    case 'cancelPause':
      return <CancelPausePopup />;
    default:
      return <></>;
  }

  // if logic

  // if (currentType === 'updateSubscription')
  //   return (
  //     <UpdateSubscription
  //       customCancellationReasons={customCancellationReasons}
  //       skipAvailableDowngradesStep={skipAvailableDowngradesStep}
  //     />
  //   );

  // if (currentType === 'switchPlan')
  //   return (
  //     <SwitchPlanPopup
  //       onCancel={onCancel}
  //       onSwitchSuccess={onSwitchSuccess}
  //       onSwitchError={onSwitchError}
  //     />
  //   );

  // if (currentType === 'pauseSubscription') return <PauseSubscriptionPopup />;

  // if (currentType === 'resumeSubscription') return <ResumeSubscriptionPopup />;

  // if (currentType === 'cancelSwitch') return <CancelSwitchPopup />;

  // if (currentType === 'cancelPause') return <CancelPausePopup />;

  // return <></>;
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
