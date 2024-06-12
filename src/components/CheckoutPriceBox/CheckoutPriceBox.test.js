import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'i18NextInit';
import CheckoutPriceBox from './CheckoutPriceBox';

const store = (unlimited = true, trial = false) => ({
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

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('<CheckoutPriceBox />', () => {
  it('should not display coupon note for unlimited coupon with yearly period', () => {
    render(
      <Provider store={mockStore(store())}>
        <CheckoutPriceBox />
      </Provider>
    );

    const couponNote = screen.getByTestId('coupon-notes');
    expect(couponNote).toHaveTextContent('');
  });

  it('should display coupon note for NOT unlimited coupon with yearly period', () => {
    render(
      <Provider store={mockStore(store(false))}>
        <CheckoutPriceBox />
      </Provider>
    );

    const couponNote = screen.getByTestId('coupon-notes');
    expect(couponNote).not.toHaveTextContent('');
  });

  it('should display Trial Discount when isTrial is true', () => {
    render(
      <Provider store={mockStore(store(false, true))}>
        <CheckoutPriceBox />
      </Provider>
    );

    expect(screen.getByText('Trial Discount')).toBeInTheDocument();
  });

  it('should display Coupon Discount when isTrial is false', () => {
    render(
      <Provider store={mockStore(store(false))}>
        <CheckoutPriceBox />
      </Provider>
    );

    expect(screen.getByText('Coupon Discount')).toBeInTheDocument();
  });
});
