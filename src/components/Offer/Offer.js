import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import CouponInput from 'components/CouponInput/CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import { periodMapper } from 'util/planHelper';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
  StyledOfferCouponWrapper,
  OfferCardWrapperStyled
} from './OfferStyled';
import OfferCheckoutCard from '../OfferCheckoutCard';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: ''
    };
  }

  render() {
    const {
      offerDetails: { trialAvailable, period },
      orderDetails,
      orderDetails: {
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
      availablePaymentMethods,
      t
    } = this.props;
    const isCouponApplied = applied;
    const { coupon } = this.state;
    const isFree = totalPrice === 0 && !trialAvailable && !isCouponApplied;

    if (isFree) {
      return (
        <StyledOfferWrapper>
          <Header />
          <main>
            <FreeOffer onPaymentComplete={onPaymentComplete} />
          </main>
        </StyledOfferWrapper>
      );
    }

    return (
      <StyledOfferWrapper>
        <Header />
        <main>
          <>
            <StyledOfferBody>
              <SectionHeader center>
                {t('Complete your purchase')}
              </SectionHeader>
              <>
                <StyledOfferDetailsAndCoupon>
                  <OfferCardWrapperStyled>
                    <OfferCheckoutCard />
                  </OfferCardWrapperStyled>
                  <StyledOfferCouponWrapper>
                    <CouponInput
                      showMessage={showMessage}
                      message={message}
                      messageType={messageType}
                      onSubmit={onSubmit}
                      value={coupon}
                      onChange={e => this.setState({ coupon: e })}
                      couponLoading={couponLoading}
                      source="checkout"
                    />
                  </StyledOfferCouponWrapper>
                </StyledOfferDetailsAndCoupon>
              </>
              <CheckoutPriceBox />
            </StyledOfferBody>
            <Payment
              order={orderDetails}
              period={period ? periodMapper[period].chargedForEveryText : null}
              onPaymentComplete={onPaymentComplete}
              isPaymentDetailsRequired={requiredPaymentDetails}
              updatePriceBreakdown={updatePriceBreakdown}
              availablePaymentMethods={availablePaymentMethods}
            />
          </>
          )
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
    startTime: PropTypes.number,
    offerId: PropTypes.string
  }).isRequired,
  orderDetails: PropTypes.shape({
    country: PropTypes.string,
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
    requiredPaymentDetails: PropTypes.bool,
    taxRate: PropTypes.number
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
  availablePaymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      methodName: PropTypes.string.isRequired,
      paymentGateway: PropTypes.string.isRequired,
      default: PropTypes.bool
    })
  ),
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
  availablePaymentMethods: null,
  t: k => k
};

export { Offer as PureOffer };

export default withTranslation()(labeling()(Offer));
// export default Offer;
