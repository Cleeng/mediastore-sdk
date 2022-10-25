import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

const UpdateSubscription = ({
  action,
  offerDetails,
  hideInnerPopup,
  showInnerPopup,
  updateList,
  customCancellationReasons,
  skipAvailableDowngradesStep
}) => {
  if (action === 'unsubscribe') {
    return (
      <Unsubscribe
        offerDetails={offerDetails}
        hideInnerPopup={hideInnerPopup}
        updateList={updateList}
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        showInnerPopup={showInnerPopup}
      />
    );
  }
  if (action === 'resubscribe') {
    return (
      <Resubscribe
        offerDetails={offerDetails}
        hideInnerPopup={hideInnerPopup}
        updateList={updateList}
      />
    );
  }
  return <></>;
};

UpdateSubscription.propTypes = {
  action: PropTypes.oneOf(['unsubscribe', 'resubscribe']).isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  showInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
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
