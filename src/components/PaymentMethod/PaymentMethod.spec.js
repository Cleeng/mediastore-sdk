/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import { PurePaymentMethod } from './PaymentMethod';
import { CardWrapStyled, Message } from './PaymentMethodStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

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
    id: 193925084,
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

const mockPaymentDetailsPaypal = [
  {
    id: 193925082,
    customerId: 280372348,
    token: '8315816736477319',
    paymentGateway: 'adyen',
    paymentMethod: 'paypal',
    paymentMethodId: null
  }
];

describe('<PaymentMethod/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<PurePaymentMethod />);
      expect(wrapper.prop('paymentDetails')).toEqual([]);
    });
    it('should render all supported payment types', () => {
      const wrapper = mount(
        <PurePaymentMethod paymentDetails={mockPaymentDetailsByTypes} />
      );
      expect(wrapper.find(CardWrapStyled)).toHaveLength(1);
    });
    it('should show specifid data for paypal', () => {
      const wrapper = mount(
        <PurePaymentMethod paymentDetails={mockPaymentDetailsPaypal} />
      );
      expect(wrapper.find(CardWrapStyled)).toHaveLength(1);
      expect(wrapper.find(CardWrapStyled).props().type).toEqual('paypal');
    });
    it('should show the message if type is not supported', () => {
      const wrapper = mount(
        <PurePaymentMethod paymentDetails={mockPaymentDetailsNotSupported} />
      );
      expect(wrapper.find(Message)).toHaveLength(1);
    });
  });
});
