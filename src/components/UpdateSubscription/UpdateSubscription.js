import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

const UpdateSubscription = ({
  customCancellationReasons,
  skipAvailableDowngradesStep
}) => {
  const {
    updateSubscription: { action, retentionActions }
  } = useSelector(state => state.popupManager);

  if (action === 'unsubscribe') {
    return (
      <Unsubscribe
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        retentionActions={retentionActions}
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
  skipAvailableDowngradesStep: PropTypes.bool
};

UpdateSubscription.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false
};

export { UpdateSubscription as PureUpdateSubscription };

export default UpdateSubscription;
