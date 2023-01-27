import { connect } from 'react-redux';
import {
  setPaymentDetails,
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton
} from 'redux/paymentInfo';
import { showInnerPopup, hideInnerPopup } from 'redux/innerPopupReducer';
import { init as initPublisherConfig } from 'redux/publisherConfigSlice';
import PaymentInfo from './PaymentInfo.component';

export const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo,
    popupManager: state.popupManager
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
    hidePaymentInfoPopup: () => {
      dispatch(hideInnerPopup());
    },
    initPublisherConfig: payload => {
      dispatch(initPublisherConfig(payload));
    }
  };
};

const PaymentInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PaymentInfoContainer;
