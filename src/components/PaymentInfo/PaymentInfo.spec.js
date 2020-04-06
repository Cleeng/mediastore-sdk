import React from 'react';
import { shallow } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import { PurePaymentInfo } from './PaymentInfo.component';

jest.mock('api', () => ({
  getPaymentDetails: jest
    .fn()
    .mockResolvedValue({
      responseData: {
        paymentDetails: [
          {
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
          }
        ],
        message: 'Payment details sent successfully'
      },
      errors: []
    })
    .mockName('getPaymentDetails'),
  listCustomerTransactions: jest
    .fn()
    .mockResolvedValue({
      responseData: {
        items: [
          {
            transactionId: 'T650862998',
            transactionDate: 1584361260,
            offerId: 'S568296139_ZW',
            offerType: 'subscription',
            offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
          }
        ]
      },
      errors: []
    })
    .mockName('listCustomerTransactions')
}));

const setPaymentMethodMock = jest.fn();
const setTransactionsList = jest.fn();
const setTransactionsToShow = jest.fn();
const setTransactionListAsFetched = jest.fn();
const hideShowMoreButton = jest.fn();
const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();

const initialState = {
  paymentDetailsError: [],
  transactionsError: [],
  isTransactionListExpanded: false,
  transactionsLoading: false
};
describe('<PaymentInfo/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(
        <PurePaymentInfo
          setPaymentMethod={setPaymentMethodMock}
          setTransactionsList={setTransactionsList}
          setTransactionsToShow={setTransactionsToShow}
          setTransactionListAsFetched={setTransactionListAsFetched}
          hideShowMoreButton={hideShowMoreButton}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      expect(wrapper.find(MyAccountHeading)).toHaveLength(2);
      expect(wrapper.state()).toEqual(initialState);
    });
  });
});
