/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import { dateFormat } from 'util/planHelper';
import MyAccountError from 'components/MyAccountError';
import Button from 'components/Button';
import { ReactComponent as noTransactionsIcon } from 'assets/images/errors/transaction_icon.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import Loader from 'components/Loader';
import { logos } from 'util/paymentMethodHelper';

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

const Transactions = ({
  transactions,
  toggleTransactionsList,
  isTransactionsItemsLoading,
  isExpanded,
  isShowMoreButtonHidden,
  error,
  isTransactionsSectionLoading,
  t
}) =>
  isTransactionsSectionLoading ? (
    <TransactionsSkeleton />
  ) : (
    <WrapStyled>
      {error.length !== 0 ? (
        <MyAccountError generalError />
      ) : transactions.length === 0 ? (
        <MyAccountError
          icon={noTransactionsIcon}
          title={t('No transactions found!')}
          subtitle={t(
            'The section will show you recent transactions history after first payment'
          )}
        />
      ) : (
        <Card withBorder>
          <TransactionListStyled
            isExpanded={isExpanded}
            length={transactions.length}
          >
            {transactions.map(
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
                    length={transactions.length}
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
          {!isShowMoreButtonHidden && (
            <Button
              theme="primary"
              margin="20px 0 0 auto"
              width="unset"
              label={(isExpanded && t('Show less')) || t('Show more')}
              onClickFn={() => toggleTransactionsList()}
              padding="12px 33px 12px 20px"
            >
              <ButtonTextStyled isExpanded={isExpanded}>
                {(isTransactionsItemsLoading && (
                  <Loader buttonLoader color="#ffffff" />
                )) ||
                  (isExpanded && t('Show less')) ||
                  t('Show more')}
              </ButtonTextStyled>
            </Button>
          )}
        </Card>
      )}
    </WrapStyled>
  );

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.arrayOf(PropTypes.any),
  toggleTransactionsList: PropTypes.func.isRequired,
  isTransactionsItemsLoading: PropTypes.bool,
  isExpanded: PropTypes.bool,
  t: PropTypes.func,
  isShowMoreButtonHidden: PropTypes.bool,
  isTransactionsSectionLoading: PropTypes.bool
};

Transactions.defaultProps = {
  transactions: [],
  error: [],
  isTransactionsItemsLoading: false,
  isExpanded: false,
  t: k => k,
  isShowMoreButtonHidden: false,
  isTransactionsSectionLoading: false
};

export { Transactions as PureTransactions };

export default withTranslation()(labeling()(Transactions));
