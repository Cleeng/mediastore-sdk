import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

const UpdateSubscription = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep
}) => {
  const {
    updateSubscription: { action }
  } = useSelector((state) => state.popupManager);

  if (action === 'unsubscribe') {
    return (
      <Unsubscribe
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        skipAvailableFreeExtensionStep={skipAvailableFreeExtensionStep}
      />
    );
  }
  if (action === 'resubscribe') {
    return <Resubscribe />;
  }
  return <></>;
};

UpdateSubscription.propTypes = {
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool,
  skipAvailableFreeExtensionStep: PropTypes.bool
};

UpdateSubscription.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  skipAvailableFreeExtensionStep: false
};

export { UpdateSubscription as PureUpdateSubscription };

export default UpdateSubscription;
