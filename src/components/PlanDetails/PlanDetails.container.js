import { connect } from 'react-redux';
import {
  setCurrentPlan,
  showSurvey,
  hideSurvey,
  updateList,
  setUpdateAction
} from 'redux/planDetails';
import PlanDetails from './PlanDetails.component';

export const mapStateToProps = state => {
  return {
    planDetails: state.planDetails,
    isSurveyShown: state.isSurveyShown,
    offerToUpdate: state.offerToUpdate,
    updateList: state.updateList,
    updateAction: state.updateAction
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlan: currentPlan => {
      dispatch(setCurrentPlan(currentPlan));
    },
    showSurvey: offerId => {
      dispatch(showSurvey(offerId));
    },
    hideSurvey: () => {
      dispatch(hideSurvey());
    },
    updateList: () => {
      dispatch(updateList());
    },
    setUpdateAction: action => {
      dispatch(setUpdateAction(action));
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanDetails);

export default PlanDetailsContainer;
