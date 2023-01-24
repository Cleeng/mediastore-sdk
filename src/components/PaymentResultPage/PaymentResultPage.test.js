import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentResultPage from './PaymentResultPage';

const store = {
  finalizeInitialPayment: {
    payment: {
      id: null,
      paymentMethod: null,
      currency: null
    },
    error: null
  }
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('../../containers/labeling', () =>
  jest.fn(() => jest.fn(Component => Component))
);

describe('PaymentResultPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <PaymentResultPage />
      </Provider>
    );

    getByTestId('paymentResultPage-loader');
  });
  describe('successful payment finalization', () => {
    test('render ThankYou page when onSuccess was NOT passed', async () => {
      const { getByTestId } = render(
        <Provider
          store={mockStore({
            ...store,
            finalizeInitialPayment: {
              payment: {
                id: 123
              }
            }
          })}
        >
          <PaymentResultPage />
        </Provider>
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
                id: 123
              }
            }
          })}
        >
          <PaymentResultPage onSuccess={mockFn} />
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
        <PaymentResultPage />
      </Provider>
    );

    getByTestId('FailedPaymentPage-component');
  });
});
