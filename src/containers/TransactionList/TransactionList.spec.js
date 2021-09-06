/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import listCustomerTransactionsRequest from 'api/Customer/listCustomerTransactions';
import getPaymentDetailsRequst from 'api/Customer/getPaymentDetails';
import { PureTransactionList } from './TransactionList.component';

jest.mock('api/Customer/listCustomerTransactions');
jest.mock('api/Customer/getPaymentDetails');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const setPaymentMethodMock = jest.fn();
const setTransactionsListMock = jest.fn();
const setTransactionsToShowMock = jest.fn();
const setTransactionsListAsFetchedMock = jest.fn();
const hideShowMoreButtonMock = jest.fn();
const paymentDetailsData = {
  id: 193925086,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null
};
const mockError = ['mockError'];
const transactionsListObject = {
  transactionId: 'T650862998',
  transactionDate: 1584361260,
  offerId: 'S568296139_ZW',
  offerType: 'subscription',
  offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
};

const defaultProps = {
  setPaymentMethod: setPaymentMethodMock,
  setTransactionsList: setTransactionsListMock,
  setTransactionsToShow: setTransactionsToShowMock,
  setTransactionsListAsFetched: setTransactionsListAsFetchedMock,
  hideShowMoreButton: hideShowMoreButtonMock
};
describe('<TransactionList/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@render', () => {
    it('should fetch data on componentDidMount', done => {
      listCustomerTransactionsRequest.mockResolvedValue({
        responseData: {
          items: [transactionsListObject]
        },
        errors: []
      });
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{ paymentMethod: [], transactionsList: [] }}
        />
      );
      expect(wrapper.find(SectionHeader)).toHaveLength(1);
      setImmediate(() => {
        expect(setTransactionsListMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalledWith([
          transactionsListObject
        ]);
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        expect(setTransactionsListAsFetchedMock).toHaveBeenCalled();
        expect(hideShowMoreButtonMock).toHaveBeenCalled();
        done();
      });
    });
    it('should not fetch data when data was fetched', () => {
      shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [transactionsListObject]
          }}
        />
      );
      expect(setTransactionsToShowMock).toHaveBeenCalled();
      expect(getPaymentDetailsRequst).not.toHaveBeenCalled();
      expect(listCustomerTransactionsRequest).not.toHaveBeenCalled();
    });
    it('should set errors when fetch faild', done => {
      listCustomerTransactionsRequest.mockResolvedValue({
        responseData: {},
        errors: mockError
      });
      const wrapper = shallow(<PureTransactionList {...defaultProps} />);
      setImmediate(() => {
        expect(setPaymentMethodMock).not.toHaveBeenCalled();
        expect(wrapper.state('transactionsError')).toBe(mockError);
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchTransactionsList fail', done => {
      listCustomerTransactionsRequest.mockRejectedValue(new Error('error'));
      const wrapper = shallow(<PureTransactionList {...defaultProps} />);
      setImmediate(() => {
        expect(wrapper.state('transactionsError')).toEqual([
          'Something went wrong..'
        ]);
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should not set transaction list as fetched when it is possible to fetch more items', done => {
      getPaymentDetailsRequst.mockResolvedValue({
        responseData: { paymentDetails: [paymentDetailsData] },
        errors: []
      });
      listCustomerTransactionsRequest.mockResolvedValue({
        responseData: {
          items: [
            transactionsListObject,
            transactionsListObject,
            transactionsListObject,
            transactionsListObject
          ]
        },
        errors: []
      });
      shallow(<PureTransactionList {...defaultProps} />);
      setImmediate(() => {
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        expect(setTransactionsToShowMock).toHaveBeenCalledWith(3);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('@action', () => {
    it('should hide transaction list on click show less button', () => {
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [
              transactionsListObject,
              transactionsListObject,
              transactionsListObject,
              transactionsListObject
            ]
          }}
        />
      );
      wrapper.setState({
        isTransactionListExpanded: true
      });
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionListExpanded')).toBe(false);
      expect(setTransactionsToShowMock).toHaveBeenCalled();
    });
    it('should exapand list and NOT fetch transactions list if data was fetched', () => {
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [
              transactionsListObject,
              transactionsListObject,
              transactionsListObject,
              transactionsListObject
            ],
            isTransactionListFetched: true
          }}
        />
      );
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionListExpanded')).toBe(true);
      expect(setTransactionsToShowMock).toHaveBeenCalled();
    });
    it('should fetch whole transactions list if it was NOT fetched', done => {
      listCustomerTransactionsRequest.mockResolvedValue({
        responseData: {
          items: [
            transactionsListObject,
            transactionsListObject,
            transactionsListObject,
            transactionsListObject,
            transactionsListObject
          ]
        },
        errors: []
      });
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [
              transactionsListObject,
              transactionsListObject,
              transactionsListObject,
              transactionsListObject
            ],
            isTransactionListFetched: false
          }}
        />
      );
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(listCustomerTransactionsRequest).toHaveBeenCalled();
      setImmediate(() => {
        expect(wrapper.state('isTransactionListExpanded')).toBe(true);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalledWith([
          transactionsListObject,
          transactionsListObject,
          transactionsListObject,
          transactionsListObject,
          transactionsListObject
        ]);
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        done();
      });
    });
    it('should set error in state when listCustomerTransactions fail on click show more button', done => {
      listCustomerTransactionsRequest.mockResolvedValue({
        responseData: {},
        errors: mockError
      });
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [
              transactionsListObject,
              transactionsListObject,
              transactionsListObject,
              transactionsListObject
            ],
            isTransactionListFetched: false
          }}
        />
      );
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(listCustomerTransactionsRequest).toHaveBeenCalled();
      setImmediate(() => {
        expect(wrapper.state('transactionsError')).toBe(mockError);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });

    it('should catch error when listCustomerTransactions fail on click show more button', done => {
      listCustomerTransactionsRequest.mockRejectedValue(new Error('error'));
      const wrapper = shallow(
        <PureTransactionList
          {...defaultProps}
          paymentInfo={{
            paymentMethod: [paymentDetailsData],
            transactionsList: [
              transactionsListObject,
              transactionsListObject,
              transactionsListObject,
              transactionsListObject
            ],
            isTransactionListFetched: false
          }}
        />
      );
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(listCustomerTransactionsRequest).toHaveBeenCalled();
      setImmediate(() => {
        expect(wrapper.state('transactionsError')).toEqual([
          'Something went wrong..'
        ]);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
