/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import PaymentCard from './PaymentCard';
import {
  CardWrapStyled,
  CardEditStyled,
  CardExpirationStyled,
  CardNumberStyled
} from './PaymentCardStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<PaymentCard/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const showInnerPopupMock = jest.fn();
  const defaultProps = {
    isDataLoaded: true,
    activePaymentMethod: {
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
  });
});
