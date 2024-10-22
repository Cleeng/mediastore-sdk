import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import orderMock from 'mocks/orderMock';
import offerMock from 'mocks/offerMock';
import CheckoutPriceBox from './CheckoutPriceBox';
// why changing import order breaks the test?
// eslint-disable-next-line
import renderWithProviders from 'util/testHelpers';

const discountType = {
  coupon: 'coupon',
  trial: 'trial'
} as const;

const getPreloadedState = (unlimited = true, trial = false) => ({
  order: {
    ...orderMock,
    order: {
      ...orderMock.order,
      discount: {
        applied: true,
        type: trial ? discountType.trial : discountType.coupon,
        periods: unlimited ? 999 : 123
      }
    }
  },
  offer: offerMock
});

const defaultProps = {
  hideRedeemButton: false,
  isCheckout: true,
  onRedeemClick: () => null
};

const mockStore = (preloadedState: ReturnType<typeof getPreloadedState>) =>
  configureStore({ reducer: () => preloadedState });

describe('<CheckoutPriceBox />', () => {
  it('should not display coupon note for unlimited coupon with yearly period', () => {
    renderWithProviders(<CheckoutPriceBox {...defaultProps} />, {
      preloadedState: getPreloadedState()
    });

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
