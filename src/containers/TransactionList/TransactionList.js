import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { WrapStyled } from './TransactionListStyled';

const TransactionList = () => {
  const { t } = useTranslation();
  return (
    <WrapStyled>
      <SectionHeader marginTop="25px">
        {t('transaction-list.header', 'Transactions')}
      </SectionHeader>
      <Transactions />
    </WrapStyled>
  );
};

export { TransactionList as PureTransactionList };

export default TransactionList;
