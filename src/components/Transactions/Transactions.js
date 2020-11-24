/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Loader from 'components/Loader';
import Card from 'components/Card';
import { dateFormat } from 'util/planHelper';
import MyAccountError from 'components/MyAccountError';
import Button from 'components/Button';
import { ReactComponent as noTransactionsIcon } from 'assets/images/errors/transaction_icon.svg';
import {
  WrapStyled,
  InsideWrapperStyled,
  LeftBoxStyled,
  TitleStyled,
  SubTitleStyled,
  RightBoxStyled,
  IdStyled,
  DateStyled,
  ButtonTextStyled
} from './TransactionsStyled';

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
    <Loader isMyAccount />
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
          {transactions.map(subItem => (
            <InsideWrapperStyled
              key={subItem.transactionId}
              length={transactions.length}
            >
              <LeftBoxStyled>
                <TitleStyled>{subItem.offerTitle}</TitleStyled>
                <SubTitleStyled>
                  {t(`Paid with`)}{' '}
                  {subItem.paymentMethod === 'card'
                    ? t('card')
                    : subItem.paymentMethod}
                </SubTitleStyled>
              </LeftBoxStyled>
              <RightBoxStyled>
                <IdStyled>{subItem.transactionId}</IdStyled>
                <DateStyled>{dateFormat(subItem.transactionDate)}</DateStyled>
              </RightBoxStyled>
            </InsideWrapperStyled>
          ))}
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
                {(isTransactionsItemsLoading && t('Loading...')) ||
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
