import { connect } from 'react-redux';
import {
  setCurrentPlan,
  updateList,
  setOfferToSwitch,
  setSwitchSettings
} from 'redux/planDetails';
import { showInnerPopup, hideInnerPopup } from 'redux/innerPopupReducer';

import Subscriptions from './Subscriptions.component';

export const mapStateToProps = state => {
  return {
    planDetails: state.planDetails,
    updateList: state.updateList,
    innerPopup: state.innerPopup
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlan: currentPlan => {
      dispatch(setCurrentPlan(currentPlan));
    },
    updateList: () => {
      dispatch(updateList());
    },
    showInnerPopup: payload => {
      dispatch(showInnerPopup(payload));
    },
    hideInnerPopup: () => {
      dispatch(hideInnerPopup());
    },
    setOfferToSwitch: payload => {
      dispatch(setOfferToSwitch(payload));
    },
    setSwitchSettings: payload => {
      dispatch(setSwitchSettings(payload));
    }
  };
};

const SubscriptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions);

export default SubscriptionsContainer;
