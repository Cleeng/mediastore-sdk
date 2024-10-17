import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Payment } from 'appRedux/finalizePaymentSlice';
import PaymentFinalizationPage from './PaymentFinalizationPage';

type FinalizeInitialPayment = {
  payment?: Payment;
  error?: string | null;
};

type RootState = {
  finalizeInitialPayment: FinalizeInitialPayment;
};

const emptyStore: RootState = {
  finalizeInitialPayment: {
    payment: {
      currency: null,
      id: null,
      paymentMethod: null
    },
    error: null
  }
};

const filledStore: RootState = {
  finalizeInitialPayment: {
    payment: {
      currency: 'EUR',
      id: 123,
      paymentMethod: 'card'
    }
  }
};

const mockStore = (preloadedState: RootState) =>
  configureStore({
    reducer: () => preloadedState
  });

describe('PaymentFinalizationPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(emptyStore)}>
        <PaymentFinalizationPage />
      </Provider>
    );

    getByTestId('PaymentFinalizationPage-loader');
  });
  describe('successful payment finalization', () => {
    test('render ThankYou page when onSuccess was NOT passed', async () => {
      const { getByTestId } = render(
        <Provider store={mockStore(filledStore)}>
          <PaymentFinalizationPage />
        </Provider>
      );

      getByTestId('ThankYouPage-component');
    });
    test('execute onSuccess when passed and NOT render ThankYouPage', async () => {
      const mockFn = vi.fn();
      const { queryByTestId } = render(
        <Provider store={mockStore(filledStore)}>
          <PaymentFinalizationPage onSuccess={mockFn} />
        </Provider>
      );
      expect(queryByTestId('ThankYouPage-component')).toBeNull();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  test('render FailedPaymentPage page when there was a error', async () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore({
          ...filledStore,
          finalizeInitialPayment: {
            error: 'Refused'
          }
        })}
      >
        <PaymentFinalizationPage />
      </Provider>
    );

    getByTestId('FailedPaymentPage-component');
  });
});
