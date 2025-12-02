import PaymentInfo from 'containers/PaymentInfo';
import 'i18NextInit';
import { updatePaymentDetailsPopup } from 'appRedux/popupSlice';
import renderWithProviders from 'util/testHelpers';
import { setupStore } from 'appRedux/rootReducer';
import { type Mock } from 'vitest';

vi.mock('api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('api')>();
  return {
    ...actual,
    getPaymentDetails: vi.fn(() =>
      Promise.resolve({
        paymentDetails: []
      })
    )
  };
});

vi.mock('api/PaymentDetails/deletePaymentDetails', () => ({
  default: vi.fn(() => Promise.resolve({ success: true }))
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        responseData: {
          paymentDetails: []
        }
      })
  })
) as Mock;

describe('PaymentInfo component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render PaymentMethod and Transactions component if paymentDetails is not open', async () => {
    const { getByText } = renderWithProviders(<PaymentInfo />);

    expect(getByText(/Payment history/i)).toBeInTheDocument();
    expect(getByText(/Current payment method/i)).toBeInTheDocument();
  });

  test('should render UpdatePaymentDetailsPopup component if paymentDetails is open', async () => {
    const store = setupStore();
    store.dispatch(updatePaymentDetailsPopup({ isOpen: true }));
    const { getByTestId } = renderWithProviders(<PaymentInfo />, { store });

    expect(
      getByTestId('payment-info__update-payment-details-popup')
    ).toBeInTheDocument();
  });
});
