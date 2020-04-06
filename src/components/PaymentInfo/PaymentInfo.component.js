/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMehod from 'components/PaymentMethod';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import Transactions from 'components/Transactions/Transactions';
import { getPaymentDetails, listCustomerTransactions } from 'api';
import { PropTypes } from 'prop-types';

import { WrapStyled } from './PaymentInfoStyled';

const DEFAULT_TRANSACTIONS_NUMBER = 3;

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetailsError: [],
      transactionsError: [],
      isTransactionListExpanded: false,
      transactionsLoading: false
    };
  }

  async componentDidMount() {
    const {
      paymentInfo,
      showLoader,
      hideLoader,
      setTransactionsToShow
    } = this.props;
    if (
      !paymentInfo.paymentMethod.length ||
      !paymentInfo.transactionsList.length
    ) {
      showLoader();
      await this.fetchPaymentInfo();
      hideLoader();
    } else {
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
    }
  }

  toggleTransactionList = () => {
    const {
      setTransactionsList,
      setTransactionsToShow,
      setTransactionListAsFetched,
      paymentInfo
    } = this.props;
    const { isTransactionListExpanded } = this.state;

    if (isTransactionListExpanded) {
      this.setState({
        isTransactionListExpanded: false
      });
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
    } else if (paymentInfo.isTransactionListFetched) {
      this.setState({
        isTransactionListExpanded: true
      });
      setTransactionsToShow();
    } else {
      this.setState({
        transactionsLoading: true
      });
      listCustomerTransactions().then(response => {
        if (response.errors.length) {
          this.setState({
            transactionsError: response.errors
          });
        } else {
          this.setState({
            isTransactionListExpanded: true
          });
          setTransactionListAsFetched();
          setTransactionsList(response.responseData.items);
          setTransactionsToShow();
        }
        this.setState({
          transactionsLoading: false
        });
      });
    }
  };

  async fetchPaymentInfo() {
    const {
      setPaymentMethod,
      setTransactionsList,
      setTransactionsToShow,
      setTransactionListAsFetched,
      hideShowMoreButton
    } = this.props;
    const fetchPaymentDetials = getPaymentDetails().then(response => {
      if (response.errors.length) {
        this.setState({
          paymentDetailsError: response.errors
        });
      } else {
        setPaymentMethod(response.responseData.paymentDetails);
      }
    });
    const fetchTransactions = listCustomerTransactions(
      DEFAULT_TRANSACTIONS_NUMBER + 1,
      0
    ).then(response => {
      if (response.errors.length) {
        this.setState({
          transactionsError: response.errors
        });
      } else {
        setTransactionsList(response.responseData.items);
        if (response.responseData.items.length > DEFAULT_TRANSACTIONS_NUMBER) {
          setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
        } else {
          setTransactionsToShow();
          setTransactionListAsFetched();
          hideShowMoreButton();
        }
      }
    });
    await Promise.all([fetchPaymentDetials, fetchTransactions]);
  }

  render() {
    const { paymentInfo, isLoading, t } = this.props;
    const {
      paymentDetailsError,
      transactionsError,
      transactionsLoading,
      isTransactionListExpanded
    } = this.state;
    return (
      <WrapStyled>
        {!isLoading && (
          <>
            <MyAccountHeading text={t('Payment method')} />
            <PaymentMehod
              paymentDetails={paymentInfo ? paymentInfo.paymentMethod : []}
              error={paymentDetailsError}
            />
            <MyAccountHeading text={t('Transactions')} />
            <Transactions
              transactions={paymentInfo ? paymentInfo.transactionsToShow : []}
              error={transactionsError}
              toggleTransactionList={this.toggleTransactionList}
              transactionsLoading={transactionsLoading}
              isExpanded={isTransactionListExpanded}
              hideShowMoreButton={paymentInfo.hideShowMoreButton}
            />
          </>
        )}
      </WrapStyled>
    );
  }
}

PaymentInfo.propTypes = {
  setPaymentMethod: PropTypes.func.isRequired,
  setTransactionsList: PropTypes.func.isRequired,
  setTransactionsToShow: PropTypes.func.isRequired,
  setTransactionListAsFetched: PropTypes.func.isRequired,
  hideShowMoreButton: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

PaymentInfo.defaultProps = {
  paymentInfo: { paymentMethod: [], transactionsList: [] },
  t: k => k
};

export { PaymentInfo as PurePaymentInfo };

export default withTranslation()(labeling()(PaymentInfo));
