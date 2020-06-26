import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CouponInput from 'components/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment';
import Logout from 'components/Logout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledPageTitle,
  StyledImageUrl,
  StyledOfferDetailsAndCoupon,
  StyledOfferDetailsWrapper,
  StyledOfferTitle,
  StyledOfferDetails,
  StyledOfferDescription,
  StyledOfferDetailsPrice,
  StyledTrial,
  StyledPrice,
  StyledTotalWrapper,
  StyledTrialDescription,
  StyledTotalLabel,
  StyledOfferPrice,
  StyledPriceBoxWrapper,
  StyledPriceBoxItemWrapper,
  StyledPriceWrapper,
  StyledOfferCouponWrapper
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
        priceBreakdown: { offerPrice, discountAmount, taxValue },
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
    return (
      <StyledOfferWrapper>
        <Header>
          <Logout />
        </Header>
        <main>
          <StyledOfferBody>
            <StyledPageTitle>{t('Complete your purchase')}</StyledPageTitle>
            <div>
              {imageUrl && <StyledImageUrl src={imageUrl} alt="Offer" />}
              <StyledOfferDetailsAndCoupon>
                <StyledOfferDetailsWrapper withoutImage={!imageUrl}>
                  <StyledOfferTitle>{offerTitle}</StyledOfferTitle>
                  <StyledOfferDetails>
                    <StyledOfferDescription>
                      {trialAvailable && (
                        <StyledTrialDescription>
                          {t(
                            'You will be charged {{price}}exVat after {{period}}.',
                            {
                              price: `${customerCurrencySymbol}${offerPrice}`,
                              period: `${
                                freeDays
                                  ? `${freeDays} days`
                                  : `${freePeriods} ${period}`
                              }`
                            }
                          )}
                        </StyledTrialDescription>
                      )}
                      {description}
                    </StyledOfferDescription>
                    <StyledOfferDetailsPrice>
                      {trialAvailable && (
                        <StyledTrial>{t('trial period')}</StyledTrial>
                      )}
                      <StyledPrice>
                        {`${customerCurrencySymbol}${offerPrice} `}
                        <span>{t('exVAT')}</span>
                      </StyledPrice>
                    </StyledOfferDetailsPrice>
                  </StyledOfferDetails>
                </StyledOfferDetailsWrapper>
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
            <StyledPriceBoxWrapper>
              {isCouponApplied && (
                <>
                  <StyledPriceBoxItemWrapper>
                    <StyledTotalLabel>{t('Price')}:</StyledTotalLabel>
                    <StyledOfferPrice>
                      {`${customerCurrencySymbol}${offerPrice} `}
                      <span>{t('exVAT')}</span>
                    </StyledOfferPrice>
                  </StyledPriceBoxItemWrapper>

                  <StyledPriceBoxItemWrapper>
                    <StyledTotalLabel>{t('Coupon Discount')}</StyledTotalLabel>
                    <StyledOfferPrice>
                      {`${customerCurrencySymbol}${discountAmount}`}
                    </StyledOfferPrice>
                  </StyledPriceBoxItemWrapper>
                </>
              )}
              <StyledPriceBoxItemWrapper>
                <StyledTotalLabel>{t('Applicable Tax')}</StyledTotalLabel>
                <StyledOfferPrice>
                  {`${customerCurrencySymbol}${taxValue}`}
                </StyledOfferPrice>
              </StyledPriceBoxItemWrapper>
            </StyledPriceBoxWrapper>
            <StyledTotalWrapper>
              <StyledPriceWrapper>
                <StyledTotalLabel>{t('Total')}</StyledTotalLabel>
                <StyledOfferPrice>
                  {`${customerCurrencySymbol}${finalPrice}`}
                </StyledOfferPrice>
              </StyledPriceWrapper>
            </StyledTotalWrapper>
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
      taxValue: PropTypes.number
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
      taxValue: 0
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
