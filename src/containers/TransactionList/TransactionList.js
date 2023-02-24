import React from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { PropTypes } from 'prop-types';
import { WrapStyled } from './TransactionListStyled';

const TransactionList = ({ t }) => {
  return (
    <WrapStyled>
      <SectionHeader marginTop="25px">{t('Transactions')}</SectionHeader>
      <Transactions />
    </WrapStyled>
  );
};

TransactionList.propTypes = {
  t: PropTypes.func
};

TransactionList.defaultProps = {
  t: k => k
};

export { TransactionList as PureTransactionList };

export default withTranslation()(labeling()(TransactionList));
