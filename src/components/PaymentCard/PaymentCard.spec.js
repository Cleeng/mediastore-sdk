/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import PaymentCard from './PaymentCard';
import {
  CardWrapStyled,
  CardEditStyled,
  CardExpirationStyled,
  CardNumberStyled,
  CardExpirationLabel
} from './PaymentCardStyled';

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  ),
  useTranslation: () => ({
    t: key => key
  })
}));

describe('<PaymentCard/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const showInnerPopupMock = jest.fn();
  const defaultProps = {
    isDataLoaded: true,
    details: {
      id: 193925084,
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
      paymentMethodId: null,
      active: true,
      bound: false
    },
    showInnerPopup: showInnerPopupMock
  };

  const payPalPaymentMethod = {
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    paymentMethodSpecificParams: {
      holderName: 'dsadsadsa'
    },
    paymentMethodId: null,
    active: true,
    bound: false
  };
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<PaymentCard {...defaultProps} />);
      expect(wrapper.find(CardWrapStyled)).toHaveLength(1);
      expect(wrapper.find(CardEditStyled)).toHaveLength(1);
    });
    it('should show lastCardFourDigits and cardExpirationDate', () => {
      const wrapper = shallow(<PaymentCard {...defaultProps} />);
      expect(wrapper.find(CardNumberStyled)).toHaveLength(1);
      expect(wrapper.find(CardExpirationStyled)).toHaveLength(1);
    });
    it('should show holder name when no cardExpirationDate', () => {
      const wrapper = shallow(
        <PaymentCard {...defaultProps} details={payPalPaymentMethod} />
      );
      expect(wrapper.find(CardExpirationStyled)).toHaveLength(1);
      expect(wrapper.find(CardExpirationLabel).text()).toBe('Holder name');
    });
  });
});
