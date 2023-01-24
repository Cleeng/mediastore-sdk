import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentFinalizationHandler from 'containers/PaymentFinalizationHandler';

const TestComponent = () => <div data-testid="testComponent">Test</div>;
const WrappedComponent = PaymentFinalizationHandler(TestComponent);

const store = {
  finalizeInitialPayment: {
    error: null,
    shouldShowFinalizePaymentComponent: false,
    payment: {
      paymentMethod: null,
      currency: null
    }
  }
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('PaymentFinalizationHandler component', () => {
  test('by deafult should return wrapped component', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <WrappedComponent />
      </Provider>
    );

    getByTestId('testComponent');
  });

  test('return PaymentResultPage if shouldShowFinalizePaymentComponent is set to true', async () => {
    const { getByTestId, queryByTestId } = render(
      <Provider
        store={mockStore({
          finalizeInitialPayment: {
            ...store.finalizeInitialPayment,
            shouldShowFinalizePaymentComponent: true
          }
        })}
      >
        <WrappedComponent />
      </Provider>
    );

    getByTestId('paymentResultPage-loader');
    expect(queryByTestId('testComponent')).toBeNull();
  });
});
