import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CouponInput from 'components/CouponInput/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment/Payment';

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
  StyledPriceBeforeWrapper,
  StyledTrialDescription,
  StyledTotalLabel,
  StyledOfferPrice,
  StyledCouponDiscountWrapper,
  StyledPriceWrapper,
  StyledOfferCouponWrapper
} from './OfferStyled';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
        periodDescription,
        imageUrl
      },
      orderDetails: {
        priceBreakdown: { offerPrice, discountedPrice, discountAmount },
        discount: { applied }
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
    const finalPrice = applied ? discountedPrice : offerPrice;
    return (
      <StyledOfferWrapper>
        <Header showLogOutButton />
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
                            'You will be charged {{price}} after {{period}}.',
                            {
                              price: `${customerCurrencySymbol}${offerPrice}`,
                              period: `${freePeriods} ${periodDescription}`
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
            <StyledTotalWrapper>
              {isCouponApplied && (
                <>
                  <StyledPriceBeforeWrapper>
                    <StyledTotalLabel>{t('Price')}:</StyledTotalLabel>
                    <StyledOfferPrice>
                      {`${customerCurrencySymbol}${offerPrice} `}
                      <span>{t('exVAT')}</span>
                    </StyledOfferPrice>
                  </StyledPriceBeforeWrapper>
                  <StyledCouponDiscountWrapper>
                    <StyledTotalLabel>{t('Coupon Discount')}</StyledTotalLabel>
                    <StyledOfferPrice>
                      {`${customerCurrencySymbol}${discountAmount}`}
                    </StyledOfferPrice>
                  </StyledCouponDiscountWrapper>
                </>
              )}
              <StyledPriceWrapper>
                <StyledTotalLabel>{t('Total')}</StyledTotalLabel>
                <StyledOfferPrice>
                  {`${customerCurrencySymbol}${finalPrice} `}
                  <span>{t('exVAT')}</span>
                </StyledOfferPrice>
              </StyledPriceWrapper>
            </StyledTotalWrapper>
          </StyledOfferBody>
          <Payment onPaymentComplete={onPaymentComplete} t={t} />
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
    periodDescription: PropTypes.string,
    priceExclTax: PropTypes.number,
    priceExclTaxBeforeDiscount: PropTypes.number,
    errors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  orderDetails: PropTypes.shape({
    priceBreakdown: PropTypes.shape({
      offerPrice: PropTypes.number,
      discountedPrice: PropTypes.number,
      discountAmount: PropTypes.number
    }),
    discount: PropTypes.shape({
      applied: PropTypes.bool
    })
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
      discountAmount: 0
    },
    discount: {
      applied: false
    }
  },
  couponProps: null,
  t: k => k
};

export default Offer;
