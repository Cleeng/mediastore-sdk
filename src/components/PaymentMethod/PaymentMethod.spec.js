import React from 'react';
import { mount } from 'enzyme';
import PaymentMethod from './PaymentMethod';

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
  },
  {
    id: 193925086,
    customerId: 280372348,
    token: '8315816736477319',
    paymentGateway: 'adyen',
    paymentMethod: 'paypal',
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

describe('<PaymentMethod/>', () => {
  const wrapper = mount(<PaymentMethod />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.state('paymentDetails')).toBe(null);
    });
    it('should set state based on passed paymentDetails prop', () => {
      wrapper.setProps({
        paymentDetails: mockPaymentDetails
      });
      expect(wrapper.state('paymentDetails')).toBe(mockPaymentDetails);
    });
  });
});
