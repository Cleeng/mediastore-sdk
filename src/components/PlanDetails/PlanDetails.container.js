import { connect } from 'react-redux';
import { setCurrentPlan } from 'redux/planDetails';
import PlanDetails from './PlanDetails.component';

export const mapStateToProps = state => {
  return {
    planDetails: state.planDetails
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlan: currentPlan => {
      dispatch(setCurrentPlan(currentPlan));
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanDetails);

export default PlanDetailsContainer;
