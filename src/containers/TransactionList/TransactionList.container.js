import { connect } from 'react-redux';
import {
  setTransactionsList,
  setTransactionsToShow,
  setTransactionsListAsFetched,
  hideShowMoreButton
} from 'redux/paymentInfo';
import TransactionList from './TransactionList.component';

export const mapStateToProps = state => {
  return {
    paymentInfo: state.paymentInfo
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

const PlanDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList);

export default PlanDetailsContainer;
