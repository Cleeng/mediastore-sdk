import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CheckoutPriceBox from './CheckoutPriceBox';

const getPreloadedState = (unlimited = true, trial = false) => ({
  order: {
    order: {
      priceBreakdown: {
        offerPrice: 999,
        discountAmount: 70,
        taxValue: '',
        customerServiceFee: '',
        paymentMethodFee: ''
      },
      discount: {
        applied: true,
        type: trial ? 'trial' : 'coupon',
        periods: unlimited ? 999 : 123
      }
    }
  },
  offer: {
    offer: { customerPriceInclTax: 123, period: 'test', trialAvailable: true }
  }
});

const defaultProps = {
  hideRedeemButton: false,
  isCheckout: true,
  onRedeemClick: () => null
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('<CheckoutPriceBox />', () => {
  it('should not display coupon note for unlimited coupon with yearly period', () => {
    render(
      <Provider store={mockStore(getPreloadedState())}>
        <CheckoutPriceBox {...defaultProps} />
      </Provider>
    );

    expect(screen.getByTestId('coupon-notes')).toHaveTextContent('');
  });

  it('should display coupon note for NOT unlimited coupon with yearly period', () => {
    render(
      <Provider store={mockStore(getPreloadedState(false))}>
        <CheckoutPriceBox {...defaultProps} />
      </Provider>
    );

    const couponNote = screen.getByTestId('coupon-notes');
    expect(couponNote).not.toHaveTextContent('');
  });

  it('should display Trial Discount when isTrial is true', () => {
    render(
      <Provider store={mockStore(getPreloadedState(false, true))}>
        <CheckoutPriceBox {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('Trial Discount')).toBeInTheDocument();
  });

  it('should display Coupon Discount when isTrial is false', () => {
    render(
      <Provider store={mockStore(getPreloadedState(false))}>
        <CheckoutPriceBox {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('Coupon Discount')).toBeInTheDocument();
  });
});
