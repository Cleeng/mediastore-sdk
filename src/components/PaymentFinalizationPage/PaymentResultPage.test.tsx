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

const store: RootState = {
  finalizeInitialPayment: {
    payment: {
      currency: null,
      id: null,
      paymentMethod: null
    },
    error: null
  }
};

const mockStore = (preloadedState: RootState) =>
  configureStore({
    reducer: () => preloadedState
  });

describe('PaymentFinalizationPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <PaymentFinalizationPage />
      </Provider>
    );

    getByTestId('PaymentFinalizationPage-loader');
  });
  describe('successful payment finalization', () => {
    test('render ThankYou page when onSuccess was NOT passed', async () => {
      const { getByTestId } = render(
        <Provider
          store={mockStore({
            ...store,
            finalizeInitialPayment: {
              payment: {
                paymentMethod: 'card',
                currency: 'EUR',
                id: 123
              }
            }
          })}
        >
          <PaymentFinalizationPage />
        </Provider>
      );

      getByTestId('ThankYouPage-component');
    });
    test('execute onSuccess when passed and NOT render ThankYouPage', async () => {
      const mockFn = vi.fn();
      const { queryByTestId } = render(
        <Provider
          store={mockStore({
            ...store,
            finalizeInitialPayment: {
              payment: {
                paymentMethod: 'card',
                id: 123,
                currency: 'EUR'
              }
            }
          })}
        >
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
          ...store,
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
