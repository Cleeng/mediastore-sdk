/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow, mount } from 'enzyme';
import MyAccountError from 'components/MyAccountError';
import { PureTransactions } from './Transactions';
import { InsideWrapperStyled } from './TransactionsStyled';

const mockTransaction = [
  {
    transactionId: 'T650862998',
    transactionDate: 1584361260,
    offerId: 'S568296139_ZW',
    offerType: 'subscription',
    offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
  }
];
const toggleTransactionsListMock = jest.fn();
jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<Transactions/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render transactions', () => {
      const wrapper = shallow(
        <PureTransactions
          transactions={mockTransaction}
          toggleTransactionsList={toggleTransactionsListMock}
        />
      );
      expect(wrapper.find(InsideWrapperStyled).exists()).toBe(true);
    });
    it('should show info when there are no transactions', () => {
      const wrapper = shallow(
        <PureTransactions
          transactions={[]}
          toggleTransactionsList={toggleTransactionsListMock}
        />
      );
      expect(wrapper.find(MyAccountError).exists()).toBe(true);
      expect(wrapper.find(InsideWrapperStyled).exists()).toBe(false);
    });
    it('should hide button if all transaction are fetched', () => {
      const wrapper = shallow(
        <PureTransactions
          transactions={mockTransaction}
          toggleTransactionsList={toggleTransactionsListMock}
          isShowMoreButtonHidden
        />
      );
      expect(wrapper.find('button').exists()).toBe(false);
    });
  });
  describe('@action', () => {
    it('should call toggleTransactionsList on button click', () => {
      const wrapper = mount(
        <PureTransactions
          transactions={mockTransaction}
          toggleTransactionsList={toggleTransactionsListMock}
          isExpanded
        />
      );
      wrapper.find('button').simulate('click');
      expect(toggleTransactionsListMock).toHaveBeenCalled();
    });
  });
});
