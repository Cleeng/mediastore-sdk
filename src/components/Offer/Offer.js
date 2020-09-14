import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CouponInput from 'components/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment';
import Logout from 'components/Logout';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import SubscriptionCard from 'components/SubscriptionCard';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledImageUrl,
  StyledOfferDetailsAndCoupon,
  StyledTotalLabel,
  StyledOfferPrice,
  StyledPriceBox,
  StyledPriceBoxWrapper,
  StyledTotalOfferPrice,
  StyledLabel,
  StyledPriceWrapper,
  StyledOfferCouponWrapper,
  SubscriptionCardWrapperStyled
} from './OfferStyled';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: ''
    };
  }

  render() {
    const {
      offerDetails: {
        offerTitle,
        customerCurrencySymbol,
        description,
        trialAvailable,
        freePeriods,
        freeDays,
        period,
        imageUrl
      },
      orderDetails: {
        priceBreakdown: {
          offerPrice,
          discountAmount,
          taxValue,
          customerServiceFee
        },
        discount: { applied },
        totalPrice,
        requiredPaymentDetails
      },
      couponProps: {
        showMessage,
        message,
        messageType,
        onSubmit,
        couponLoading
      },
      onPaymentComplete,
      t
    } = this.props;
    const isCouponApplied = applied;
    const { coupon } = this.state;
    const finalPrice = totalPrice;
    const trialPeriodText = freeDays
      ? `${freeDays} days`
      : `${freePeriods} months`;
    const periodText = trialAvailable ? trialPeriodText : period;
    const alternativeDescription = `You will be charged ${offerPrice} after ${periodText}.`;
    return (
      <StyledOfferWrapper>
        <Header>
          <Logout />
        </Header>
        <main>
          <StyledOfferBody>
            <SectionHeader center>{t('Complete your purchase')}</SectionHeader>
            <div>
              {imageUrl && <StyledImageUrl src={imageUrl} alt="Offer" />}
              <StyledOfferDetailsAndCoupon>
                <SubscriptionCardWrapperStyled>
                  <SubscriptionCard
                    period={period}
                    title={offerTitle}
                    description={description || alternativeDescription}
                    currency={customerCurrencySymbol}
                    price={offerPrice}
                    isTrialAvailable={trialAvailable}
                  />
                </SubscriptionCardWrapperStyled>
                <StyledOfferCouponWrapper>
                  <CouponInput
                    showMessage={showMessage}
                    message={message}
                    messageType={messageType}
                    onSubmit={onSubmit}
                    value={coupon}
                    onChange={e => this.setState({ coupon: e })}
                    couponLoading={couponLoading}
                    t={t}
                  />
                </StyledOfferCouponWrapper>
              </StyledOfferDetailsAndCoupon>
            </div>
            <StyledPriceBox>
              <StyledPriceBoxWrapper>
                {isCouponApplied && (
                  <>
                    <StyledPriceWrapper>
                      <StyledLabel>{t('Price')}:</StyledLabel>
                      <StyledOfferPrice>
                        {`${customerCurrencySymbol}${offerPrice} `}
                        <span>{t('exVAT')}</span>
                      </StyledOfferPrice>
                    </StyledPriceWrapper>

                    <StyledPriceWrapper>
                      <StyledLabel>{t('Coupon Discount')}</StyledLabel>
                      <StyledOfferPrice>
                        {`${customerCurrencySymbol}${discountAmount}`}
                      </StyledOfferPrice>
                    </StyledPriceWrapper>
                  </>
                )}
                <StyledPriceWrapper>
                  <StyledLabel>{t('Applicable Tax')}</StyledLabel>
                  <StyledOfferPrice>
                    {`${customerCurrencySymbol}${taxValue}`}
                  </StyledOfferPrice>
                </StyledPriceWrapper>
                {customerServiceFee !== 0 && (
                  <StyledPriceWrapper>
                    <StyledLabel>{t('Customer Service Fee')}</StyledLabel>
                    <StyledOfferPrice>
                      {`${customerCurrencySymbol}${customerServiceFee}`}
                    </StyledOfferPrice>
                  </StyledPriceWrapper>
                )}
                <StyledPriceWrapper>
                  <StyledTotalLabel>{t('Total:')}</StyledTotalLabel>
                  <StyledTotalOfferPrice>
                    {`${customerCurrencySymbol}${finalPrice}`}
                  </StyledTotalOfferPrice>
                </StyledPriceWrapper>
              </StyledPriceBoxWrapper>
            </StyledPriceBox>
          </StyledOfferBody>
          <Payment
            onPaymentComplete={onPaymentComplete}
            isPaymentDetailsRequired={requiredPaymentDetails}
            t={t}
          />
        </main>
        <Footer />
      </StyledOfferWrapper>
    );
  }
}

Offer.propTypes = {
  offerDetails: PropTypes.shape({
    offerTitle: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    customerCurrencySymbol: PropTypes.string,
    trialAvailable: PropTypes.bool,
    freePeriods: PropTypes.number,
    freeDays: PropTypes.number,
    period: PropTypes.string,
    priceExclTax: PropTypes.number,
    priceExclTaxBeforeDiscount: PropTypes.number,
    errors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  orderDetails: PropTypes.shape({
    priceBreakdown: PropTypes.shape({
      offerPrice: PropTypes.number,
      discountedPrice: PropTypes.number,
      discountAmount: PropTypes.number,
      taxValue: PropTypes.number,
      customerServiceFee: PropTypes.number
    }),
    discount: PropTypes.shape({
      applied: PropTypes.bool
    }),
    totalPrice: PropTypes.number,
    requiredPaymentDetails: PropTypes.bool
  }),
  couponProps: PropTypes.shape({
    showMessage: PropTypes.bool,
    message: PropTypes.node,
    messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
    onSubmit: PropTypes.func.isRequired,
    couponLoading: PropTypes.bool
  }),
  onPaymentComplete: PropTypes.func.isRequired,
  t: PropTypes.func
};

Offer.defaultProps = {
  orderDetails: {
    priceBreakdown: {
      offerPrice: 0,
      discountedPrice: 0,
      discountAmount: 0,
      taxValue: 0,
      customerServiceFee: 0
    },
    discount: {
      applied: false
    },
    totalPrice: 0,
    requiredPaymentDetails: true
  },
  couponProps: null,
  t: k => k
};

export default Offer;
