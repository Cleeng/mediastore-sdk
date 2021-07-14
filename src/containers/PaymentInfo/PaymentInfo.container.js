import { connect } from 'react-redux';
import {
  setPaymentDetails,
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton,
  setPublisherPaymentMethods
} from 'redux/paymentInfo';
import { showInnerPopup, hideInnerPopup } from 'redux/innerPopupReducer';
import PaymentInfo from './PaymentInfo.component';

export const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo,
    innerPopup: state.innerPopup
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setPaymentDetails: newPaymentDetails => {
      dispatch(setPaymentDetails(newPaymentDetails));
    },
    setTransactionsList: newTransactionList => {
      dispatch(setTransactionsList(newTransactionList));
    },
    setTransactionsToShow: items => {
      dispatch(setTransactionsToShow(items));
    },
    setTransactionsListAsFetched: () => {
      dispatch(setTransactionsListAsFetched());
    },
    hideShowMoreButton: () => {
      dispatch(hideShowMoreButton());
    },
    showInnerPopup: payload => {
      dispatch(showInnerPopup(payload));
    },
    hideInnerPopup: () => {
      dispatch(hideInnerPopup());
    },
    setPublisherPaymentMethods: payload => {
      dispatch(setPublisherPaymentMethods(payload));
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PlanDetailsContainer;
