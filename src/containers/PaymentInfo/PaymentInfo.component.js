import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMehod from 'components/PaymentMethod';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { getPaymentDetails, listCustomerTransactions } from 'api';
import { PropTypes } from 'prop-types';
import UpdatePaymentDetailsPopup from 'components/UpdatePaymentDetailsPopup';
import { WrapStyled } from './PaymentInfoStyled';

const DEFAULT_TRANSACTIONS_NUMBER = 3;

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetailsError: [],
      transactionsError: [],
      isTransactionListExpanded: false,
      isTransactionsSectionLoading: false,
      isTransactionsItemsLoading: false,
      paymentDetailsLoading: false
    };
  }

  componentDidMount() {
    const { paymentInfo, setTransactionsToShow } = this.props;
    if (paymentInfo.paymentDetails && paymentInfo.paymentDetails.length === 0) {
      this.setState({
        paymentDetailsLoading: true
      });
      this.fetchPaymentDetials();
    }
    if (paymentInfo.transactionsList.length === 0) {
      this.setState({
        isTransactionsSectionLoading: true
      });
      this.fetchTransactionsList();
    } else if (paymentInfo.transactionsList.length !== 0) {
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER); // if transactions are in state - show default number of them
    }
  }

  componentWillUnmount() {
    const { hideInnerPopup } = this.props;
    this.setState = () => {};
    hideInnerPopup();
  }

  toggleTransactionsList = () => {
    const {
      setTransactionsList,
      setTransactionsToShow,
      setTransactionsListAsFetched,
      paymentInfo,
      t
    } = this.props;
    const { isTransactionListExpanded } = this.state;

    if (isTransactionListExpanded) {
      this.setState({
        isTransactionListExpanded: false
      });
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
    } else if (paymentInfo.isTransactionListFetched) {
      // if transactions was fetched - show all of them without calling API
      this.setState({
        isTransactionListExpanded: true
      });
      setTransactionsToShow();
    } else {
      // fetch all transactions when the list expands for the first time
      this.setState({
        isTransactionsItemsLoading: true
      });
      listCustomerTransactions()
        .then(response => {
          if (response.errors.length !== 0) {
            this.setState({
              transactionsError: response.errors
            });
          } else {
            this.setState({
              isTransactionListExpanded: true
            });
            setTransactionsListAsFetched();
            setTransactionsList(response.responseData.items); // state to hold whole transactions
            setTransactionsToShow(); // state to hold the array with showed transactions
          }
          this.setState({
            isTransactionsItemsLoading: false
          });
        })
        .catch(() => {
          this.setState({
            transactionsError: [t('Something went wrong..')],
            isTransactionsItemsLoading: false
          });
        });
    }
  };

  fetchPaymentDetials = () => {
    const { setPaymentDetails, t } = this.props;
    getPaymentDetails()
      .then(response => {
        if (response.errors.length) {
          this.setState({
            paymentDetailsError: response.errors,
            paymentDetailsLoading: false
          });
        } else {
          setPaymentDetails(response.responseData.paymentDetails);
          this.setState({
            paymentDetailsLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          paymentDetailsError: [t('Something went wrong..')],
          paymentDetailsLoading: false
        });
      });
  };

  fetchTransactionsList = () => {
    const {
      setTransactionsList,
      setTransactionsToShow,
      setTransactionsListAsFetched,
      hideShowMoreButton,
      t
    } = this.props;

    listCustomerTransactions(DEFAULT_TRANSACTIONS_NUMBER + 1, 0) // fetching +1 transaction to check if have to show 'show more' button
      .then(response => {
        if (response.errors.length) {
          this.setState({
            transactionsError: response.errors,
            isTransactionsSectionLoading: false
          });
        } else {
          setTransactionsList(response.responseData.items);
          if (
            response.responseData.items.length > DEFAULT_TRANSACTIONS_NUMBER // if there are more transactions to fetch - show only default number
          ) {
            setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
          } else {
            // if there is nothing more to fetch
            setTransactionsToShow();
            setTransactionsListAsFetched();
            hideShowMoreButton();
          }
          this.setState({
            isTransactionsSectionLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          transactionsError: [t('Something went wrong..')],
          isTransactionsSectionLoading: false
        });
      });
  };

  updatePaymentDetailsSection = () => {
    this.setState({
      paymentDetailsLoading: true
    });
    this.fetchPaymentDetials();
  };

  render() {
    const {
      paymentInfo,
      showInnerPopup,
      innerPopup,
      hideInnerPopup,
      setPublisherPaymentMethods,
      t
    } = this.props;
    const {
      paymentDetailsError,
      transactionsError,
      isTransactionsItemsLoading,
      isTransactionsSectionLoading,
      paymentDetailsLoading,
      isTransactionListExpanded
    } = this.state;
    return (
      <WrapStyled>
        {innerPopup.isOpen && innerPopup.type === 'paymentDetails' ? (
          <UpdatePaymentDetailsPopup
            hideInnerPopup={hideInnerPopup}
            setPublisherPaymentMethods={setPublisherPaymentMethods}
            updatePaymentDetailsSection={this.updatePaymentDetailsSection}
            selectedPaymentMethod={innerPopup.data}
          />
        ) : (
          <>
            <SectionHeader marginTop="0">{t('Payment method')}</SectionHeader>
            <PaymentMehod
              paymentDetailsLoading={paymentDetailsLoading}
              activeOrBoundPaymentDetails={
                paymentInfo.activeOrBoundPaymentDetails
              }
              showInnerPopup={showInnerPopup}
              error={paymentDetailsError}
            />
            <SectionHeader>{t('Transactions')}</SectionHeader>
            <Transactions
              transactions={paymentInfo.transactionsToShow}
              toggleTransactionsList={this.toggleTransactionsList}
              isTransactionsItemsLoading={isTransactionsItemsLoading}
              isTransactionsSectionLoading={isTransactionsSectionLoading}
              isShowMoreButtonHidden={paymentInfo.isShowMoreButtonHidden}
              isExpanded={isTransactionListExpanded}
              error={transactionsError}
            />
          </>
        )}
      </WrapStyled>
    );
  }
}

PaymentInfo.propTypes = {
  setPaymentDetails: PropTypes.func.isRequired,
  setTransactionsList: PropTypes.func.isRequired,
  setTransactionsToShow: PropTypes.func.isRequired,
  setTransactionsListAsFetched: PropTypes.func.isRequired,
  hideShowMoreButton: PropTypes.func.isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  innerPopup: PropTypes.objectOf(PropTypes.any).isRequired,
  setPublisherPaymentMethods: PropTypes.func.isRequired,
  t: PropTypes.func
};

PaymentInfo.defaultProps = {
  paymentInfo: { paymentMethod: [], transactionsList: [] },
  t: k => k
};

export { PaymentInfo as PurePaymentInfo };

export default withTranslation()(labeling()(PaymentInfo));
