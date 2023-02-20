/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import { dateFormat } from 'util/planHelper';
import MyAccountError from 'components/MyAccountError';
import Button from 'components/Button';
import { ReactComponent as noTransactionsIcon } from 'assets/images/errors/transaction_icon.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { logos } from 'util/paymentMethodHelper';
import {
  DEFAULT_TRANSACTIONS_NUMBER,
  fetchListCustomerTransactions,
  toggleTransactionList
} from 'redux/transactionsSlice';
import { useDispatch, useSelector } from 'react-redux';

import {
  WrapStyled,
  InsideWrapperStyled,
  LeftBoxStyled,
  TitleStyled,
  SubTitleStyled,
  RightBoxStyled,
  IdStyled,
  DateStyled,
  ButtonTextStyled,
  TransactionListStyled,
  LogoWrapStyled,
  InfoStyled
} from './TransactionsStyled';

const TransactionsSkeleton = () => (
  <Card withBorder>
    {[...Array(3)].map((i, k) => (
      // eslint-disable-next-line react/no-array-index-key
      <InsideWrapperStyled key={`skeleton-item-${k}`} length={3}>
        <LeftBoxStyled>
          <SkeletonWrapper height={40} width={40} />
          <InfoStyled>
            <TitleStyled>
              <SkeletonWrapper width={260} />
            </TitleStyled>
            <SubTitleStyled>
              <SkeletonWrapper width={100} />
            </SubTitleStyled>
          </InfoStyled>
        </LeftBoxStyled>
        <RightBoxStyled>
          <IdStyled>
            <SkeletonWrapper width={80} />
          </IdStyled>
          <DateStyled>
            <SkeletonWrapper width={80} />
          </DateStyled>
        </RightBoxStyled>
      </InsideWrapperStyled>
    ))}
  </Card>
);

const Transactions = ({ t }) => {
  const {
    transactions: transactionsList,
    showToggleButton,
    error: transactionsError,
    loading: isTransactionsSectionLoading,
    isListExpanded: isTransactionListExpanded
  } = useSelector(state => state.transactions);

  const transactionsToShow = isTransactionListExpanded
    ? transactionsList
    : transactionsList.slice(0, DEFAULT_TRANSACTIONS_NUMBER);

  const dispatch = useDispatch();

  const toggleTransactionsList = () => dispatch(toggleTransactionList());

  useEffect(() => {
    if (transactionsList?.length === 0) {
      dispatch(fetchListCustomerTransactions());
    }
  }, []);

  if (isTransactionsSectionLoading) return <TransactionsSkeleton />;

  if (transactionsError.length !== 0)
    return (
      <WrapStyled>
        <MyAccountError generalError />
      </WrapStyled>
    );

  if (transactionsList.length === 0)
    return (
      <WrapStyled>
        <MyAccountError
          icon={noTransactionsIcon}
          title={t('No transactions found!')}
          subtitle={t(
            'The section will show you recent transactions history after first payment'
          )}
        />
      </WrapStyled>
    );

  return (
    <WrapStyled>
      <Card withBorder>
        <TransactionListStyled
          isExpanded={isTransactionListExpanded}
          length={transactionsToShow.length}
        >
          {transactionsToShow.map(
            ({
              paymentMethod,
              transactionId,
              offerId,
              offerTitle,
              transactionDate
            }) => {
              const LogoComponent = logos[paymentMethod];
              return (
                <InsideWrapperStyled
                  key={transactionId}
                  length={transactionsToShow.length}
                >
                  <LeftBoxStyled>
                    <LogoWrapStyled>
                      <LogoComponent />
                    </LogoWrapStyled>
                    <InfoStyled>
                      <TitleStyled>
                        {t(`offer-title-${offerId}`, offerTitle)}
                      </TitleStyled>
                      <SubTitleStyled>
                        {t(`Paid with`)}{' '}
                        {paymentMethod === 'card' ? t('card') : paymentMethod}
                      </SubTitleStyled>
                    </InfoStyled>
                  </LeftBoxStyled>
                  <RightBoxStyled>
                    <IdStyled>{transactionId}</IdStyled>
                    <DateStyled>{dateFormat(transactionDate)}</DateStyled>
                  </RightBoxStyled>
                </InsideWrapperStyled>
              );
            }
          )}
        </TransactionListStyled>
        {showToggleButton && (
          <Button
            theme="primary"
            margin="20px 0 0 auto"
            width="unset"
            label={isTransactionListExpanded ? t('Show less') : t('Show more')}
            onClickFn={() => toggleTransactionsList()}
            padding="12px 33px 12px 20px"
          >
            <ButtonTextStyled isExpanded={isTransactionListExpanded}>
              {isTransactionListExpanded ? t('Show less') : t('Show more')}
            </ButtonTextStyled>
          </Button>
        )}
      </Card>
    </WrapStyled>
  );
};

Transactions.propTypes = {
  t: PropTypes.func
};

Transactions.defaultProps = {
  t: k => k
};

export { Transactions as PureTransactions };

export default withTranslation()(labeling()(Transactions));
