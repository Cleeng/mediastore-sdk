import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PaymentFinalizationPage from './PaymentFinalizationPage';

const store = {
  finalizeInitialPayment: {
    payment: {
      id: null,
      paymentMethod: null,
      currency: null,
    },
    error: null,
  },
};

const middleware = [];
const mockStore = configureStore(middleware);

describe('PaymentFinalizationPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <PaymentFinalizationPage />
      </Provider>,
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
                id: 123,
              },
            },
          })}
        >
          <PaymentFinalizationPage />
        </Provider>,
      );

      getByTestId('ThankYouPage-component');
    });
    test('execute onSuccess when passed and NOT render ThankYouPage', async () => {
      const mockFn = jest.fn();
      const { queryByTestId } = render(
        <Provider
          store={mockStore({
            ...store,
            finalizeInitialPayment: {
              payment: {
                id: 123,
              },
            },
          })}
        >
          <PaymentFinalizationPage onSuccess={mockFn} />
        </Provider>,
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
            error: 'Refused',
          },
        })}
      >
        <PaymentFinalizationPage />
      </Provider>,
    );

    getByTestId('FailedPaymentPage-component');
  });
});
