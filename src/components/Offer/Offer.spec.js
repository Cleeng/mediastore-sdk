/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Offer from './Offer';
import mockOfferDetails from './__mocks__/offerDetails';
import mockOrderDetails from './__mocks__/orderDetails';
import {
  StyledOfferPrice,
  StyledPriceBox,
  StyledPriceBoxWrapper,
  StyledTotalOfferPrice,
  StyledPriceWrapper
} from './OfferStyled';

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
        />
      );

      expect(wrapper.find(StyledPriceBox)).toHaveLength(1);
      expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);

      expect(wrapper.find(StyledOfferPrice).text()).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.taxValue}`
      );

      expect(wrapper.find(StyledTotalOfferPrice).text()).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice}`
      );
    });

    it('displays coupon discount', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={{
            ...mockOfferDetails
          }}
          orderDetails={{
            ...mockOrderDetails,
            discount: {
              applied: true
            }
          }}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
        />
      );

      expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);
      expect(wrapper.find(StyledPriceWrapper)).toHaveLength(4);

      expect(
        wrapper
          .find(StyledPriceWrapper)
          .at(0)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice} exVAT`
      );
      expect(
        wrapper
          .find(StyledPriceWrapper)
          .at(1)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.discountAmount}`
      );
      expect(
        wrapper
          .find(StyledPriceWrapper)
          .at(2)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.taxValue}`
      );
      expect(
        wrapper
          .find(StyledPriceWrapper)
          .at(3)
          .find(StyledTotalOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.totalPrice}`
      );
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
        />
      );

      wrapper.find('CouponInput').simulate('change', couponCode);
      expect(wrapper.state().coupon).toBe(couponCode);
    });
  });
});
