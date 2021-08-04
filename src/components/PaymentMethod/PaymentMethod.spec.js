/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount, shallow } from 'enzyme';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import PurePaymentMethod from './PaymentMethod';
import { Message } from './PaymentMethodStyled';

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  ),
  useTranslation: () => ({
    t: key => key
  })
}));

const mockPaymentDetailsNotSupported = {
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
  paymentMethodId: null,
  active: true
};

const paymentDetails = {
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
  active: true
};

describe('<PaymentMethod/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('@renders', () => {
    const showPopupMock = jest.fn();
    it('should show the message if type is not supported', () => {
      const wrapper = mount(
        <PurePaymentMethod
          activeOrBoundPaymentDetails={[mockPaymentDetailsNotSupported]}
        />
      );
      expect(wrapper.find(Message)).toHaveLength(1);
    });
    it('should render error when request failed', () => {
      const wrapper = shallow(
        <PurePaymentMethod
          error={['errorMock']}
          activeOrBoundPaymentDetails={[]}
        />
      );
      expect(wrapper.find(MyAccountError)).toHaveLength(1);
      expect(wrapper.find(MyAccountError).prop('generalError')).toBe(true);
    });
    it('should open popup to add payment details', () => {
      const wrapper = shallow(
        <PurePaymentMethod
          activeOrBoundPaymentDetails={[]}
          showInnerPopup={showPopupMock}
        />
      );
      expect(wrapper.find(MyAccountError)).toHaveLength(1);
      expect(wrapper.find(MyAccountError).prop('withBorder')).toBe(true);
      wrapper.find(MyAccountError).simulate('click');
      expect(showPopupMock).toHaveBeenCalledTimes(1);
    });
    it('should render PaymentCard with proper desctiption', () => {
      const wrapper = shallow(
        <PurePaymentMethod
          activeOrBoundPaymentDetails={[paymentDetails]}
          showInnerPopup={showPopupMock}
        />
      );
      expect(wrapper.find(PaymentCard)).toHaveLength(1);
    });
  });
});
