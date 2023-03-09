import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

const UpdateSubscription = ({
  customCancellationReasons,
  skipAvailableDowngradesStep
}) => {
  const {
    updateSubscription: {
      data: { action }
    }
  } = useSelector(state => state.popupManager);

  if (action === 'unsubscribe') {
    return (
      <Unsubscribe
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
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

export default withTranslation()(labeling()(UpdateSubscription));
