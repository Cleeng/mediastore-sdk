import { connect } from 'react-redux';
import {
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton
} from 'redux/paymentInfo';
import { showInnerPopup } from 'redux/innerPopupReducer';
import { init as initPublisherConfig } from 'redux/publisherConfigSlice';
import { updatePaymentDetailsPopup } from 'redux/popupSlice';
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
    },
    showInnerPopup: payload => {
      dispatch(showInnerPopup(payload));
    },
    hidePaymentInfoPopup: () => {
      dispatch(updatePaymentDetailsPopup({ isOpen: false }));
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
