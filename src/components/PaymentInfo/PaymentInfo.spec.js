import React from 'react';
import { mount } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import PaymentInfo from './PaymentInfo.component';
import { getPaymentDetails } from '../../api';

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
    .mockName('getPaymentDetails')
}));

const setPaymentMethodMock = jest.fn();
const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();

describe('<PaymentInfo/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <PaymentInfo
          setPaymentMethod={setPaymentMethodMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      expect(wrapper.find(MyAccountHeading)).toHaveLength(1);
    });
    it('should set state when error occurred', () => {
      const returnedErrors = ['Some error'];
      getPaymentDetails.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = mount(
        <PaymentInfo
          setPaymentMethod={setPaymentMethodMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      setImmediate(() => {
        expect(wrapper.state('errors')).toBe(returnedErrors);
      });
    });
  });
});
