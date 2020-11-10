/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import Offer from './Offer';
import mockOfferDetails from './__mocks__/offerDetails';
import mockOrderDetails from './__mocks__/orderDetails';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockCouponProps = {
  showMessage: false,
  message: '',
  messageType: MESSAGE_TYPE_SUCCESS,
  onSubmit: jest.fn().mockResolvedValue({})
};
describe('Offer', () => {
  describe('@render', () => {
    it('displays basic details', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          orderDetails={mockOrderDetails}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );

      expect(wrapper.find(CheckoutPriceBox)).toHaveLength(1);
    });
  });
  describe('@events', () => {
    it('should add coupon to state on coupon applied', () => {
      const couponCode = 'abc';
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          orderDetails={mockOrderDetails}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );

      wrapper.find('CouponInput').simulate('change', couponCode);
      expect(wrapper.state().coupon).toBe(couponCode);
    });
  });
});
