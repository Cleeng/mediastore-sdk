import React from 'react';
import { mount } from 'enzyme';
import PaymentMethod from './PaymentMethod';
import { CardWrapStyled, Message } from './PaymentMethodStyled';

const initialValue = { paymentDetails: [] };

const mockPaymentDetailsByTypes = [
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

const mockPaymentDetailsNotSupported = [
  {
    id: 193925086,
    customerId: 280372348,
    token: '8315816736477319',
    paymentGateway: 'adyen',
    paymentMethod: 'notSupportedMethod',
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
      expect(wrapper.props('paymentDetails')).toEqual(initialValue);
    });
    it('should render all supported payment types', () => {
      wrapper.setProps({
        paymentDetails: mockPaymentDetailsByTypes
      });
      expect(wrapper.find(CardWrapStyled)).toHaveLength(1);
    });
    it('should show the message if type is not supported', () => {
      wrapper.setProps({
        paymentDetails: mockPaymentDetailsNotSupported
      });
      expect(wrapper.find(Message)).toHaveLength(1);
    });
  });
});
