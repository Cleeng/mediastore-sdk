import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'i18NextInit';
import CheckoutPriceBox from './CheckoutPriceBox';

const unlimitedDiscount = {
  applied: true,
  type: 'coupon',
  periods: 999
};

const notUnlimitedDiscount = {
  applied: true,
  type: 'coupon',
  periods: 123
};

const store = (unlimited = true) => ({
  order: {
    order: {
      priceBreakdown: {
        offerPrice: 999,
        discountAmount: 70,
        taxValue: '',
        customerServiceFee: '',
        paymentMethodFee: ''
      },
      discount: unlimited ? unlimitedDiscount : notUnlimitedDiscount
    }
  },
  offer: { offer: { customerPriceInclTax: 123, period: 'test' } }
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
});
