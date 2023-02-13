/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMethod from 'components/PaymentMethod';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { listCustomerTransactions } from 'api';
import { PropTypes } from 'prop-types';
import UpdatePaymentDetailsPopup from 'components/UpdatePaymentDetailsPopup';
import { useSelector, useDispatch } from 'react-redux';
import GracePeriodError from 'components/GracePeriodError';
import { init } from 'redux/publisherConfigSlice';
import withAddPaymentDetailsFinalizationHandler from 'containers/WithAddPaymentDetailsFinalizationHandler';
import { fetchPaymentDetails } from 'redux/paymentDetailsSlice';
import { WrapStyled } from './PaymentInfoStyled';

const DEFAULT_TRANSACTIONS_NUMBER = 3;

const PaymentInfoFn = ({
  paymentInfo: {
    isTransactionListFetched,
    transactionsList,
    transactionsToShow,
    isShowMoreButtonHidden
  },
  setTransactionsToShow,
  hidePaymentInfoPopup,
  initPublisherConfig,
  setTransactionsList,
  setTransactionsListAsFetched,
  hideShowMoreButton,
  popupManager,
  adyenConfiguration: adyenConfigurationProp,
  t,
  displayGracePeriodError
}) => {
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
  const { adyenConfiguration: adyenConfigurationStore } = useSelector(
    state => state.publisherConfig
  );

  const adyenConfiguration = adyenConfigurationProp || adyenConfigurationStore;
  const dispatch = useDispatch();

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

  const fetchTransactionsList = () => {
    listCustomerTransactions(DEFAULT_TRANSACTIONS_NUMBER + 1, 0) // fetching +1 transaction to check if you have to show 'show more' button
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
    dispatch(fetchPaymentDetails());
  };

  useEffect(() => {
    if (transactionsList?.length === 0) {
      fetchTransactionsList();
    } else {
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER); // if transactions are in state - show default number of them
      setIsTransactionsSectionLoading(false);
    }

    initPublisherConfig({ adyenConfiguration });
    if (displayGracePeriodError !== null) {
      dispatch(
        init({
          displayGracePeriodError
        })
      );
    }

    return () => {
      hidePaymentInfoPopup();
    };
  }, []);

  return (
    <WrapStyled>
      <GracePeriodError />
      {popupManager.paymentDetails.isOpen ? (
        <UpdatePaymentDetailsPopup
          updatePaymentDetailsSection={updatePaymentDetailsSection}
        />
      ) : (
        <>
          <SectionHeader>{t('Current payment method')}</SectionHeader>
          <PaymentMethod />
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
  setTransactionsList: PropTypes.func.isRequired,
  setTransactionsToShow: PropTypes.func.isRequired,
  setTransactionsListAsFetched: PropTypes.func.isRequired,
  hideShowMoreButton: PropTypes.func.isRequired,
  paymentInfo: PropTypes.shape({
    isTransactionListFetched: PropTypes.bool,
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})),
    publisherPaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
    transactionsToShow: PropTypes.arrayOf(PropTypes.shape({})),
    isShowMoreButtonHidden: PropTypes.bool
  }),
  hidePaymentInfoPopup: PropTypes.func.isRequired,
  popupManager: PropTypes.objectOf(PropTypes.any).isRequired,
  initPublisherConfig: PropTypes.func.isRequired,
  adyenConfiguration: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func,
  displayGracePeriodError: PropTypes.bool
};

PaymentInfoFn.defaultProps = {
  paymentInfo: { paymentMethod: [], transactionsList: [] },
  adyenConfiguration: null,
  t: k => k,
  displayGracePeriodError: null
};

export default withTranslation()(
  labeling()(withAddPaymentDetailsFinalizationHandler(PaymentInfoFn))
);
