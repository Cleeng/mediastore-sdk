import { useAppSelector } from 'redux/store';
import { POPUP_TYPES, selectPopupDetails } from 'redux/popupSlice';
import UpdateSubscription from 'components/UpdateSubscription/UpdateSubscription';
import SwitchPlanPopup from 'components/SwitchPlanPopup';
import PauseSubscriptionPopup from 'components/PauseSubscriptionPopup';
import ResumeSubscriptionPopup from 'components/ResumeSubscriptionPopup';
import CancelSwitchPopup from 'components/CancelSwitchPopup';
import CancelPausePopup from 'components/CancelPausePopup';
import React from 'react';
import { PlanDetailsPopupManagerProps } from './PlanDetailsPopupManager.types';

const PlanDetailsPopupManager = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep,
  onCancel,
  onSwitchSuccess,
  onSwitchError
}: PlanDetailsPopupManagerProps) => {
  const { isOpen, currentType } = useAppSelector(selectPopupDetails);

  if (!isOpen) return <></>;

  switch (currentType) {
    case POPUP_TYPES.UPDATE_SUBSCRIPTION_POPUP:
      return (
        <UpdateSubscription
          customCancellationReasons={customCancellationReasons}
          skipAvailableDowngradesStep={skipAvailableDowngradesStep}
          skipAvailableFreeExtensionStep={skipAvailableFreeExtensionStep}
        />
      );
    case POPUP_TYPES.SWITCH_PLAN_POPUP:
      return (
        <SwitchPlanPopup
          onCancel={onCancel}
          onSwitchSuccess={onSwitchSuccess}
          onSwitchError={onSwitchError}
        />
      );
    case POPUP_TYPES.PAUSE_SUBSCRIPTION_POPUP:
      return <PauseSubscriptionPopup />;
    case POPUP_TYPES.RESUME_SUBSCRIPTION_POPUP:
      return <ResumeSubscriptionPopup />;
    case POPUP_TYPES.CANCEL_SWITCH_POPUP:
      return <CancelSwitchPopup />;
    case POPUP_TYPES.CANCEL_PAUSE_POPUP:
      return <CancelPausePopup />;
    default:
      return <></>;
  }
};

export default PlanDetailsPopupManager;
