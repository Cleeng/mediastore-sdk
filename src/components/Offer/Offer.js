import React from 'react';
import PropTypes from 'prop-types';
import CouponInput from 'components/CouponInput/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment/Payment';

import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledPageTitle,
  StyledOfferContent,
  StyledimageUrl,
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
} from './OfferStyled';

const roundPrice = value => Math.round(value * 100) / 100;

const Offer = ({
  offerDetails: {
    title,
    description,
    imageUrl,
    price,
    priceBeforeDiscount,
    customerCurrencySymbol,
    isCouponApplied,
    isTrialAllowed,
    freePeriods,
    periodDescription,
    errors
  },
  couponProps: { showMessage, message, messageType, onSubmit },
  onPaymentComplete
}) => (
  <StyledOfferWrapper>
    <StyledOfferBody>
      <StyledPageTitle>Complete your purchase</StyledPageTitle>
      <StyledOfferContent>
        <StyledimageUrl src={imageUrl} alt="Offer" />
        <StyledOfferDetailsAndCoupon>
          <StyledOfferDetailsWrapper>
            <StyledOfferTitle>
              {!errors.length ? title : 'This is not a valid offer.'}
            </StyledOfferTitle>
            <StyledOfferDetails>
              <StyledOfferDescription>
                {isTrialAllowed && (
                  <StyledTrialDescription>
                    {`You will be charged ${customerCurrencySymbol}${price} after ${freePeriods} ${periodDescription}.`}
                  </StyledTrialDescription>
                )}
                {description}
              </StyledOfferDescription>
              <StyledOfferDetailsPrice>
                {isTrialAllowed && <StyledTrial>trial period</StyledTrial>}
                <StyledPrice>
                  {`${customerCurrencySymbol}${price} `}
                  <span>exVAT</span>
                </StyledPrice>
              </StyledOfferDetailsPrice>
            </StyledOfferDetails>
          </StyledOfferDetailsWrapper>
          <CouponInput
            showMessage={showMessage}
            message={message}
            messageType={messageType}
            onSubmit={onSubmit}
          />
        </StyledOfferDetailsAndCoupon>
      </StyledOfferContent>
      <StyledTotalWrapper>
        {isCouponApplied && (
          <>
            <StyledPriceBeforeWrapper>
              <StyledTotalLabel>Price:</StyledTotalLabel>
              <StyledOfferPrice>
                {`${customerCurrencySymbol}${priceBeforeDiscount} `}
                <span>exVAT</span>
              </StyledOfferPrice>
            </StyledPriceBeforeWrapper>
            <StyledCouponDiscountWrapper>
              <StyledTotalLabel>Coupon Discount</StyledTotalLabel>
              <StyledOfferPrice>
                {`${customerCurrencySymbol}${roundPrice(
                  priceBeforeDiscount - price
                )}`}
              </StyledOfferPrice>
            </StyledCouponDiscountWrapper>
          </>
        )}
        <StyledPriceWrapper>
          <StyledTotalLabel>Total</StyledTotalLabel>
          <StyledOfferPrice>
            {`${customerCurrencySymbol}${price} `}
            <span>exVAT</span>
          </StyledOfferPrice>
        </StyledPriceWrapper>
      </StyledTotalWrapper>
    </StyledOfferBody>
    <Payment onPaymentComplete={onPaymentComplete} />
  </StyledOfferWrapper>
);

Offer.propTypes = {
  offerDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    priceBeforeDiscount: PropTypes.number,
    customerCurrencySymbol: PropTypes.string,
    isCouponApplied: PropTypes.bool,
    isTrialAllowed: PropTypes.bool,
    freePeriods: PropTypes.number,
    periodDescription: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  couponProps: PropTypes.shape({
    showMessage: PropTypes.bool,
    message: PropTypes.node,
    messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
    onSubmit: PropTypes.func.isRequired
  }),
  onPaymentComplete: PropTypes.func.isRequired
};

Offer.defaultProps = { couponProps: null };

export default Offer;
