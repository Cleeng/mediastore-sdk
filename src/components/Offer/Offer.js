import React from 'react';
import PropTypes from 'prop-types';
// import CouponInput from '../CouponInput';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledTitle,
  StyledOfferContent,
  StyledOfferImg,
  StyledOfferDetailsAndCoupon,
  StyledOfferDetailsWrapper,
  StyledOfferTitle,
  StyledOfferDetails,
  StyledOfferDescription,
  StyledOfferDetailsPrice,
  StyledTrial,
  StyledPrice,
  StyledTotalWrapper,
  StyledPriceBeforeWrapper,
  StyledTrialDescription,
  StyledTotalLabel,
  StyledOfferPrice,
  StyledCouponDiscountWrapper,
  StyledPriceWrapper
} from './StyledOffer';

const roundPrice = value => Math.round(value * 100) / 100;

const Offer = ({
  offerDetails,
  error,
  // onCouponApplied,
  couponApplied,
  price,
  priceBeforeDiscount
}) => (
  <StyledOfferWrapper>
    <StyledOfferBody>
      <StyledTitle>Complete your purchase</StyledTitle>
      <StyledOfferContent>
        <StyledOfferImg src={offerDetails.offerimg} alt="Offer" />
        <StyledOfferDetailsAndCoupon>
          <StyledOfferDetailsWrapper>
            <StyledOfferTitle>
              {!error ? offerDetails.offerTitle : 'This is not a valid offer.'}
            </StyledOfferTitle>
            <StyledOfferDetails>
              <StyledOfferDescription>
                {offerDetails.hasTrial && (
                  <StyledTrialDescription>
                    {`You will be charged ${offerDetails.customerCurrencySymbol}${price} after ${offerDetails.freePeriods}.`}
                  </StyledTrialDescription>
                )}
                {offerDetails.offerDescription}
              </StyledOfferDescription>
              <StyledOfferDetailsPrice>
                {offerDetails.hasTrial && (
                  <StyledTrial>trial period</StyledTrial>
                )}
                <StyledPrice>
                  {`${offerDetails.customerCurrencySymbol}${price} `}
                  <span>exVAT</span>
                </StyledPrice>
              </StyledOfferDetailsPrice>
            </StyledOfferDetails>
          </StyledOfferDetailsWrapper>
          {/* <CouponInput email={email} onCouponApplied={onCouponApplied} /> */}
        </StyledOfferDetailsAndCoupon>
      </StyledOfferContent>
      <StyledTotalWrapper>
        {couponApplied && (
          <>
            <StyledPriceBeforeWrapper>
              <StyledTotalLabel>Price:</StyledTotalLabel>
              <StyledOfferPrice>
                {`${offerDetails.customerCurrencySymbol}${priceBeforeDiscount} `}
                <span>exVAT</span>
              </StyledOfferPrice>
            </StyledPriceBeforeWrapper>
            <StyledCouponDiscountWrapper>
              <StyledTotalLabel>Coupon Discount</StyledTotalLabel>
              <StyledOfferPrice>
                {`${offerDetails.customerCurrencySymbol}${roundPrice(
                  priceBeforeDiscount - price
                )}`}
              </StyledOfferPrice>
            </StyledCouponDiscountWrapper>
          </>
        )}
        <StyledPriceWrapper>
          <StyledTotalLabel>Total</StyledTotalLabel>
          <StyledOfferPrice>
            {`${offerDetails.customerCurrencySymbol}${price} `}
            <span>exVAT</span>
          </StyledOfferPrice>
        </StyledPriceWrapper>
      </StyledTotalWrapper>
    </StyledOfferBody>
    {/* <div className={s.offerPayment}>
      <Payments />
    </div> */}
  </StyledOfferWrapper>
);

Offer.propTypes = {
  offerDetails: PropTypes.shape({
    offerimg: PropTypes.string,
    offerTitle: PropTypes.string,
    customerCurrencySymbol: PropTypes.string,
    offerPrice: PropTypes.number,
    freePeriods: PropTypes.number,
    hasTrial: PropTypes.bool,
    offerPeriod: PropTypes.string,
    offerDescription: PropTypes.string
  }),
  error: PropTypes.string,
  // onCouponApplied: PropTypes.func,
  couponApplied: PropTypes.bool,
  price: PropTypes.number,
  priceBeforeDiscount: PropTypes.number
};

Offer.defaultProps = {
  offerDetails: {
    offerimg: 'https://webstoresdk.cleeng.com/assets/ff1e5e2f.png',
    offerTitle: 'Some test offer',
    customerCurrencySymbol: '$',
    offerPrice: 5,
    freePeriods: 2,
    hasTrial: false,
    offerPeriod: '',
    offerDescription:
      'Monthly plan. Renews automatically. Cancel anytime you want.'
  },
  // onCouponApplied: () => {},
  price: 6,
  priceBeforeDiscount: 11,
  couponApplied: false,
  error: ''
};

export default Offer;
