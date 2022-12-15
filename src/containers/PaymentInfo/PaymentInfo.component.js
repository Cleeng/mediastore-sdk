import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMethod from 'components/PaymentMethod';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { getPaymentDetails, listCustomerTransactions } from 'api';
import { PropTypes } from 'prop-types';
import UpdatePaymentDetailsPopup from 'components/UpdatePaymentDetailsPopup';
import { areProvidedPaymentMethodIdsValid } from 'util/paymentMethodHelper';
import { WrapStyled } from './PaymentInfoStyled';

const DEFAULT_TRANSACTIONS_NUMBER = 3;

const PaymentInfoFn = ({
  paymentInfo: {
    isTransactionListFetched,
    paymentDetails,
    transactionsList,
    publisherPaymentMethods,
    activeOrBoundPaymentDetails,
    transactionsToShow,
    isShowMoreButtonHidden
  },
  setPaymentDetails,
  setTransactionsToShow,
  hideInnerPopup,
  innerPopup,
  showInnerPopup,
  setTransactionsList,
  setTransactionsListAsFetched,
  hideShowMoreButton,
  setPublisherPaymentMethods,
  availablePaymentMethodIds,
  t
}) => {
  const [paymentDetailsError, setPaymentDetailsError] = useState([]);
  const [paymentDetailsLoading, setPaymentDetailsLoading] = useState(true);

  const [transactionsError, setTransactionsError] = useState([]);
  const [
    isTransactionsSectionLoading,
    setIsTransactionsSectionLoading
  ] = useState(true);

  const [isTransactionListExpanded, setIsTransactionListExpanded] = useState(
    false
  );
  const [isTransactionsItemsLoading, setIsTransactionsItemsLoading] = useState(
    false
  );

  const toggleTransactionsList = () => {
    if (isTransactionListExpanded) {
      setIsTransactionListExpanded(false);
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
    } else if (isTransactionListFetched) {
      // if transactions was fetched - show all of them without calling API
      setIsTransactionListExpanded(true);
      setTransactionsToShow();
    } else {
      // fetch all transactions when the list expands for the first time
      setIsTransactionsItemsLoading(true);
      listCustomerTransactions()
        .then(response => {
          if (response.errors.length !== 0) {
            setTransactionsError(response.errors);
          } else {
            setIsTransactionListExpanded(true);
            setTransactionsListAsFetched();
            setTransactionsList(response.responseData.items); // state to hold whole transactions
            setTransactionsToShow(); // state to hold the array with showed transactions
          }
        })
        .catch(() => {
          setTransactionsError(['Something went wrong..']);
        })
        .finally(() => {
          setIsTransactionsItemsLoading(false);
        });
    }
  };

  const fetchPaymentDetials = () => {
    getPaymentDetails()
      .then(response => {
        if (response.errors.length) {
          setPaymentDetailsError(response.errors);
        } else {
          setPaymentDetails(response.responseData.paymentDetails);
        }
      })
      .catch(() => {
        setPaymentDetailsError(['Something went wrong..']);
      })
      .finally(() => {
        setPaymentDetailsLoading(false);
      });
  };

  const fetchTransactionsList = () => {
    listCustomerTransactions(DEFAULT_TRANSACTIONS_NUMBER + 1, 0) // fetching +1 transaction to check if have to show 'show more' button
      .then(response => {
        if (response.errors.length) {
          setTransactionsError(response.errors);
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
        }
      })
      .catch(() => {
        setTransactionsError(['Something went wrong..']);
      })
      .finally(() => {
        setIsTransactionsSectionLoading(false);
      });
  };

  const updatePaymentDetailsSection = () => {
    setPaymentDetailsLoading(true);
    fetchPaymentDetials();
  };

  useEffect(() => {
    if (paymentDetails?.length === 0) {
      fetchPaymentDetials();
    } else {
      setPaymentDetailsLoading(false);
    }
    if (transactionsList?.length === 0) {
      fetchTransactionsList();
    } else {
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER); // if transactions are in state - show default number of them
      setIsTransactionsSectionLoading(false);
    }

    if (
      !publisherPaymentMethods &&
      areProvidedPaymentMethodIdsValid(availablePaymentMethodIds)
    ) {
      setPublisherPaymentMethods(availablePaymentMethodIds);
    }
    return () => {
      hideInnerPopup();
    };
  }, []);

  return (
    <WrapStyled>
      {innerPopup.isOpen && innerPopup.type === 'paymentDetails' ? (
        <UpdatePaymentDetailsPopup
          hideInnerPopup={hideInnerPopup}
          setPublisherPaymentMethods={setPublisherPaymentMethods}
          updatePaymentDetailsSection={updatePaymentDetailsSection}
          selectedPaymentMethod={innerPopup.data}
        />
      ) : (
        <>
          <SectionHeader>{t('Current payment method')}</SectionHeader>
          <PaymentMethod
            paymentDetailsLoading={paymentDetailsLoading}
            activeOrBoundPaymentDetails={activeOrBoundPaymentDetails}
            showInnerPopup={showInnerPopup}
            error={paymentDetailsError}
          />
          <SectionHeader marginTop="25px">{t('Payment history')}</SectionHeader>
          <Transactions
            transactions={transactionsToShow}
            toggleTransactionsList={toggleTransactionsList}
            isTransactionsItemsLoading={isTransactionsItemsLoading}
            isTransactionsSectionLoading={isTransactionsSectionLoading}
            isShowMoreButtonHidden={isShowMoreButtonHidden}
            isExpanded={isTransactionListExpanded}
            error={transactionsError}
          />
        </>
      )}
    </WrapStyled>
  );
};

PaymentInfoFn.propTypes = {
  setPaymentDetails: PropTypes.func.isRequired,
  setTransactionsList: PropTypes.func.isRequired,
  setTransactionsToShow: PropTypes.func.isRequired,
  setTransactionsListAsFetched: PropTypes.func.isRequired,
  hideShowMoreButton: PropTypes.func.isRequired,
  paymentInfo: PropTypes.shape({
    isTransactionListFetched: PropTypes.bool,
    paymentDetails: PropTypes.arrayOf(PropTypes.shape({})),
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})),
    publisherPaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
    activeOrBoundPaymentDetails: PropTypes.arrayOf(PropTypes.shape({})),
    transactionsToShow: PropTypes.arrayOf(PropTypes.shape({})),
    isShowMoreButtonHidden: PropTypes.bool
  }),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  innerPopup: PropTypes.objectOf(PropTypes.any).isRequired,
  setPublisherPaymentMethods: PropTypes.func.isRequired,
  availablePaymentMethodIds: PropTypes.shape({
    adyen: PropTypes.number,
    paypal: PropTypes.number
  }),
  t: PropTypes.func
};

PaymentInfoFn.defaultProps = {
  paymentInfo: { paymentMethod: [], transactionsList: [] },
  availablePaymentMethodIds: null,
  t: k => k
};

export default withTranslation()(labeling()(PaymentInfoFn));
