import { connect } from 'react-redux';
import { setPaymentDetails } from 'redux/planDetails';
import PlanDetails from './PlanDetails.component';

export const mapStateToProps = state => {
  return {
    planDetails: state.planDetails
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setPaymentDetails: newPaymentDetails => {
      dispatch(setPaymentDetails(newPaymentDetails));
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanDetails);

export default PlanDetailsContainer;
