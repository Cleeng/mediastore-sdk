import { connect } from 'react-redux';
import {
  setPaymentMethod,
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton
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
    setPaymentMethod: newPaymentDetails => {
      dispatch(setPaymentMethod(newPaymentDetails));
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
    }
  };
};

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PlanDetailsContainer;
