import React from 'react';
import { shallow } from 'enzyme';
import Offer from './Offer';
import mockOfferDetails from './__mocks__/offerDetails';
import {
  StyledOfferTitle,
  StyledOfferDescription,
  StyledTrial,
  StyledTrialDescription,
  StyledPriceWrapper,
  StyledOfferPrice,
  StyledPriceBeforeWrapper,
  StyledCouponDiscountWrapper
} from './StyledOffer';

describe('Offer', () => {
  describe('@@render', () => {
    it('displays basic details', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          price={mockOfferDetails.price}
          priceBeforeDiscount={mockOfferDetails.price}
        />
      );

      expect(wrapper.find(StyledTrial)).toHaveLength(0);
      expect(wrapper.find(StyledPriceBeforeWrapper)).toHaveLength(0);

      expect(wrapper.find(StyledOfferTitle).text()).toBe(
        mockOfferDetails.title
      );
      expect(wrapper.find(StyledOfferDescription).text()).toBe(
        mockOfferDetails.description
      );
      expect(wrapper.find(StyledOfferPrice).text()).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOfferDetails.price} exVAT`
      );
    });

    it('displays trial', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={{ ...mockOfferDetails, hasTrial: true }}
          price={mockOfferDetails.price}
          priceBeforeDiscount={mockOfferDetails.price}
        />
      );

      const trialDescription = `You will be charged ${mockOfferDetails.customerCurrencySymbol}${mockOfferDetails.price} after ${mockOfferDetails.freePeriods}.`;

      expect(wrapper.find(StyledTrial)).toHaveLength(1);
      expect(wrapper.find(StyledTrialDescription).text()).toBe(
        trialDescription
      );
      expect(wrapper.find(StyledOfferDescription).text()).toBe(
        `${trialDescription}${mockOfferDetails.description}`
      );
    });

    it('displays coupon discount', () => {
      const priceBeforeDiscount = mockOfferDetails.price + 10;
      const wrapper = shallow(
        <Offer
          offerDetails={{ ...mockOfferDetails }}
          price={mockOfferDetails.price}
          priceBeforeDiscount={priceBeforeDiscount}
          couponApplied
        />
      );

      expect(wrapper.find(StyledPriceBeforeWrapper)).toHaveLength(1);
      expect(
        wrapper
          .find(StyledPriceBeforeWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${priceBeforeDiscount} exVAT`
      );
      expect(wrapper.find(StyledCouponDiscountWrapper)).toHaveLength(1);
      expect(
        wrapper
          .find(StyledCouponDiscountWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${Math.round(
          (priceBeforeDiscount - mockOfferDetails.price) * 100
        ) / 100}`
      );
      expect(
        wrapper
          .find(StyledPriceWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOfferDetails.price} exVAT`
      );
    });

    it('handles error', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          price={mockOfferDetails.price}
          priceBeforeDiscount={mockOfferDetails.price}
          error="FAIL"
        />
      );

      expect(wrapper.find(StyledOfferTitle).text()).toBe(
        'This is not a valid offer.'
      );
    });
  });
});
