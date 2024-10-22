import PaymentFinalizationPage from './PaymentFinalizationPage';
// why changing import order breaks the test?
// eslint-disable-next-line
import renderWithProviders from 'util/testHelpers';

const emptyStore = {
  finalizeInitialPayment: {
    loading: false,
    payment: {
      currency: null,
      paymentMethod: null,
      id: null
    },
    error: null,
    shouldShowFinalizePaymentComponent: false
  }
};

const filledStore = {
  finalizeInitialPayment: {
    loading: false,
    payment: {
      currency: 'EUR',
      id: 123,
      paymentMethod: 'card'
    },
    error: null,
    shouldShowFinalizePaymentComponent: false
  }
};

const errorStore = {
  finalizeInitialPayment: {
    ...filledStore.finalizeInitialPayment,
    error: 'Refused'
  }
};

describe('PaymentFinalizationPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = renderWithProviders(<PaymentFinalizationPage />, {
      preloadedState: emptyStore
    });

    expect(getByTestId('PaymentFinalizationPage-loader')).toBeInTheDocument();
  });

  describe('successful payment finalization', () => {
    test('render ThankYou page when onSuccess was NOT passed', async () => {
      const { getByTestId } = renderWithProviders(<PaymentFinalizationPage />, {
        preloadedState: filledStore
      });
      expect(getByTestId('ThankYouPage-component')).toBeInTheDocument();
    });

    test('execute onSuccess when passed and NOT render ThankYouPage', async () => {
      const mockFn = vi.fn();
      const { queryByTestId } = renderWithProviders(
        <PaymentFinalizationPage onSuccess={mockFn} />,
        { preloadedState: filledStore }
      );
      expect(queryByTestId('ThankYouPage-component')).toBeNull();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  test('render FailedPaymentPage page when there was a error', async () => {
    const { getByTestId } = renderWithProviders(<PaymentFinalizationPage />, {
      preloadedState: {
        ...errorStore
      }
    });

    expect(getByTestId('FailedPaymentPage-component')).toBeInTheDocument();
  });
});
