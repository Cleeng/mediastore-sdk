import { connect } from 'react-redux';
import {
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton
} from 'redux/paymentInfo';
import PaymentInfo from './PaymentInfo.component';

export const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo,
    popupManager: state.popupManager
  };
};

export const mapDispatchToProps = dispatch => {
  return {
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
    }
  };
};

const PaymentInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PaymentInfoContainer;
