import { connect } from 'react-redux';
import { setPaymentMethod } from 'redux/paymentInfo';
import { showLoader, hideLoader } from 'redux/loader';
import PaymentInfo from './PaymentInfo.component';

export const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo,
    isLoading: state.loader.isLoading
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setPaymentMethod: newPaymentDetails => {
      dispatch(setPaymentMethod(newPaymentDetails));
    },
    showLoader: () => {
      dispatch(showLoader());
    },
    hideLoader: () => {
      dispatch(hideLoader());
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PlanDetailsContainer;
