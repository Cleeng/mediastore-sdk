import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Button from 'components/Button';
import Card from 'components/Card';
import { dateFormat } from 'components/CurrentPlan/helpers';
import MyAccountError from 'components/MyAccountError/MyAccountError';
import {
  WrapStyled,
  // InfoMessageStyled,
  InsideWrapperStyled,
  LeftBoxStyled,
  TitleStyled,
  SubTitleStyled,
  RightBoxStyled,
  IdStyled,
  DateStyled,
  ButtonTextStyled
} from './TransactionsStyled';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      transactions,
      toggleTransactionList,
      transactionsLoading,
      isExpanded,
      hideShowMoreButton,
      // error,
      t
    } = this.props;
    return (
      <WrapStyled>
        {transactions.length === 0 ? (
          <MyAccountError subtitle="You haven't completed any transaction yet." />
        ) : (
          <Card withShadow>
            {transactions.map(subItem => (
              <InsideWrapperStyled key={subItem.offerTitle}>
                <LeftBoxStyled>
                  <TitleStyled>{subItem.offerTitle}</TitleStyled>
                  <SubTitleStyled>
                    {t(`payed with`)}{' '}
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
            {!hideShowMoreButton && (
              <Button
                size="small"
                theme={isExpanded ? 'primary' : 'secondary'}
                margin="20px 0 0 auto"
                width="unset"
                label={(isExpanded && t('Show less')) || t('Show more')}
                onClickFn={() => toggleTransactionList()}
              >
                <ButtonTextStyled isExpanded={isExpanded}>
                  {(transactionsLoading && t('Loading...')) ||
                    (isExpanded && t('Show less')) ||
                    t('Show more')}
                </ButtonTextStyled>
              </Button>
            )}
          </Card>
        )}
      </WrapStyled>
    );
  }
}

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.any),
  // error: PropTypes.arrayOf(PropTypes.string),
  toggleTransactionList: PropTypes.func.isRequired,
  transactionsLoading: PropTypes.bool,
  isExpanded: PropTypes.bool,
  t: PropTypes.func,
  hideShowMoreButton: PropTypes.bool
};

Transactions.defaultProps = {
  transactions: [],
  // error: [],
  transactionsLoading: false,
  isExpanded: false,
  t: k => k,
  hideShowMoreButton: false
};

export { Transactions as PureTransactions };

export default withTranslation()(labeling()(Transactions));
