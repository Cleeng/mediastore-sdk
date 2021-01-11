import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { PureCouponInput as CouponInput } from 'components/CouponInput/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment';
import Logout from 'components/Logout';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import SubscriptionCard from 'components/SubscriptionCard';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import { getData } from 'util/appConfigHelper';
import { periodMapper, dateFormat } from 'util/planHelper';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
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

  generateDescription = offerType => {
    switch (offerType) {
      case 'S': {
        const {
          offerDetails: {
            freePeriods,
            freeDays,
            trialAvailable,
            period,
            customerCurrencySymbol
          },
          orderDetails: {
            priceBreakdown: { offerPrice }
          }
        } = this.props;
        const trialPeriodText = freeDays
          ? `${freeDays} days`
          : `${freePeriods > 1 ? `${freePeriods} ${period}s` : period}`;
        if (trialAvailable) {
          return `You will be charged ${offerPrice}${customerCurrencySymbol} after ${trialPeriodText}. 
          </br>Next payments will occur for every ${periodMapper[period].chargedForEveryText}.`;
        }
        return `You will be charged ${offerPrice}${customerCurrencySymbol} for every ${periodMapper[period].chargedForEveryText}.`;
      }
      case 'P': {
        const {
          offerDetails: { period, expiresAt }
        } = this.props;
        if (!period) {
          return `Access until ${dateFormat(expiresAt, true)}`;
        }
        return `${periodMapper[period].accessText} season pass`;
      }
      case 'E': {
        const {
          offerDetails: { startTime }
        } = this.props;
        return `Pay-per-view event ${
          startTime ? dateFormat(startTime, true) : ''
        }`;
      }
      case 'R': {
        const {
          offerDetails: { period }
        } = this.props;
        return `${periodMapper[period].accessText} access`;
      }
      case 'A':
        return 'Unlimited access';
      default:
        return '';
    }
  };

  render() {
    const {
      offerDetails: {
        offerTitle,
        customerCurrencySymbol,
        trialAvailable,
        period,
        expiresAt,
        startTime
      },
      orderDetails: {
        priceBreakdown: {
          offerPrice,
          discountAmount,
          taxValue,
          customerServiceFee,
          paymentMethodFee
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
      updatePriceBreakdown,
      t
    } = this.props;
    const isCouponApplied = applied;
    const { coupon } = this.state;
    const finalPrice = totalPrice;
    const offerType = getData('CLEENG_OFFER_TYPE');
    const isFree = totalPrice === 0 && !trialAvailable && !isCouponApplied;
    return (
      <StyledOfferWrapper>
        <Header>
          <Logout />
        </Header>
        <main>
          {isFree ? (
            <FreeOffer
              icon={period || offerType}
              title={offerTitle}
              period={period}
              expiresAt={expiresAt}
              startTime={startTime}
              onPaymentComplete={onPaymentComplete}
            />
          ) : (
            <>
              <StyledOfferBody>
                <SectionHeader center>
                  {t('Complete your purchase')}
                </SectionHeader>
                <>
                  <StyledOfferDetailsAndCoupon>
                    <SubscriptionCardWrapperStyled>
                      <SubscriptionCard
                        period={period}
                        icon={period || offerType}
                        title={offerTitle}
                        description={this.generateDescription(offerType)}
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
                </>
                <CheckoutPriceBox
                  finalPrice={finalPrice}
                  isCouponApplied={isCouponApplied}
                  discountAmount={discountAmount}
                  taxValue={taxValue}
                  customerServiceFee={customerServiceFee}
                  paymentMethodFee={paymentMethodFee}
                  customerCurrencySymbol={customerCurrencySymbol}
                  offerPrice={offerPrice}
                />
              </StyledOfferBody>
              <Payment
                onPaymentComplete={onPaymentComplete}
                isPaymentDetailsRequired={requiredPaymentDetails}
                updatePriceBreakdown={updatePriceBreakdown}
                t={t}
              />
            </>
          )}
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
    expiresAt: PropTypes.string,
    priceExclTax: PropTypes.number,
    priceExclTaxBeforeDiscount: PropTypes.number,
    errors: PropTypes.arrayOf(PropTypes.string),
    startTime: PropTypes.number
  }).isRequired,
  orderDetails: PropTypes.shape({
    priceBreakdown: PropTypes.shape({
      offerPrice: PropTypes.number,
      discountedPrice: PropTypes.number,
      discountAmount: PropTypes.number,
      taxValue: PropTypes.number,
      customerServiceFee: PropTypes.number,
      paymentMethodFee: PropTypes.number
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
  updatePriceBreakdown: PropTypes.func.isRequired,
  t: PropTypes.func
};

Offer.defaultProps = {
  orderDetails: {
    priceBreakdown: {
      offerPrice: 0,
      discountedPrice: 0,
      discountAmount: 0,
      taxValue: 0,
      customerServiceFee: 0,
      paymentMethodFee: 0
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

export { Offer as PureOffer };

export default withTranslation()(labeling()(Offer));
