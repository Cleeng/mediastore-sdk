import React from 'react';
import { shallow } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import PaymentMehod from 'components/PaymentMethod';
import PlanDetails from './PlanDetails';
import { getPaymentDetails } from '../../api';

const mockPaymentDetails = [
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
];

jest.mock('api', () => ({
  getPaymentDetails: jest
    .fn()
    .mockResolvedValue({
      responseData: {
        paymentDetails: {
          data: {
            success: true,
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
          }
        }
      },
      errors: []
    })
    .mockName('getPaymentDetails')
}));

describe('<PlanDetails/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<PlanDetails />);
      expect(wrapper.find(PaymentMehod)).toHaveLength(1);
      expect(wrapper.find(MyAccountHeading)).toHaveLength(2);
    });
    it('should fetch payment methods on render', () => {
      const wrapper = shallow(<PlanDetails />);
      setImmediate(() => {
        expect(wrapper.state('paymentDetails')).toEqual(mockPaymentDetails);
      });
    });
    it('should store errors if returned cannot fetch', () => {
      const returnedErrors = ['Some error'];
      getPaymentDetails.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = shallow(<PlanDetails />);
      setImmediate(() => {
        expect(wrapper.state('errors')).toBe(returnedErrors);
      });
    });
  });
});
