import { connect } from 'react-redux';
import {
  setPaymentMethod,
  setTransactionsList,
  setTransactionsToShow,
  setTransactionListAsFetched
} from 'redux/paymentInfo';
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
    setTransactionsList: newTransactionList => {
      dispatch(setTransactionsList(newTransactionList));
    },
    setTransactionsToShow: items => {
      dispatch(setTransactionsToShow(items));
    },
    setTransactionListAsFetched: () => {
      dispatch(setTransactionListAsFetched());
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
