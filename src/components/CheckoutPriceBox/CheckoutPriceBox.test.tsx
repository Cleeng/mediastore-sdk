import { offerMock, orderMock } from 'mocks';
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

describe('<CheckoutPriceBox />', () => {
  it('should not display coupon note for unlimited coupon with yearly period', () => {
    const { getByTestId } = renderWithProviders(
      <CheckoutPriceBox {...defaultProps} />,
      {
        preloadedState: getPreloadedState()
      }
    );

    expect(getByTestId('coupon-notes')).toHaveTextContent('');
  });

  it('should display coupon note for NOT unlimited coupon with yearly period', () => {
    const { getByTestId } = renderWithProviders(
      <CheckoutPriceBox {...defaultProps} />,
      {
        preloadedState: getPreloadedState(false)
      }
    );

    const couponNote = getByTestId('coupon-notes');
    expect(couponNote).not.toHaveTextContent('');
  });

  it('should display Trial Discount when isTrial is true', () => {
    const { getByText } = renderWithProviders(
      <CheckoutPriceBox {...defaultProps} />,
      {
        preloadedState: getPreloadedState(false, true)
      }
    );

    expect(getByText('Trial Discount')).toBeInTheDocument();
  });

  it('should display Coupon Discount when isTrial is false', () => {
    const { getByText } = renderWithProviders(
      <CheckoutPriceBox {...defaultProps} />,
      {
        preloadedState: getPreloadedState(false)
      }
    );

    expect(getByText('Coupon Discount')).toBeInTheDocument();
  });
});
