import { connect } from 'react-redux';
import { setPaymentMethod } from 'redux/paymentInfo';
import PaymentInfo from './PaymentInfo.component';

const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPaymentMethod: newPaymentDetails => {
      dispatch(setPaymentMethod(newPaymentDetails));
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PlanDetailsContainer;
