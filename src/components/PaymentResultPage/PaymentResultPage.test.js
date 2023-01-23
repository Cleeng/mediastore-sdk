// init
// should submit finalize initial payment on component mount

// error
// should load FailedPaymentPage when payment failed

// success
// should load ThankYouPage when payment succeed and onSuccess prop was not provided
// should execute onSuccess, when provided, and do NOT present ThankYouPage

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

describe('PaymentResultPage component', () => {
  test('renders Loader on mount', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <PaymentResultPage />
      </Provider>
    );

    getByTestId('paymentResultPage-loader');
  });
  test('should render ThankYou page when payment is finalized', async () => {
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

    getByTestId('thankyou-component');
  });
});
