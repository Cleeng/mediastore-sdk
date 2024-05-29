import PaymentInfo from 'containers/PaymentInfo';
import 'i18NextInit';
import { updatePaymentDetailsPopup } from 'appRedux/popupSlice';
import renderWithProviders from 'util/testHelpers';
import { setupStore } from 'appRedux/rootReducer';
import { vi, type Mock } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: null })
  })
) as Mock;

describe('PaymentInfo component', () => {
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
