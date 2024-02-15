import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import withPaymentFinalizationHandler from 'containers/withPaymentFinalizationHandler';

const TestComponent = () => <div data-testid="testComponent">Test</div>;
const WrappedComponent = withPaymentFinalizationHandler(TestComponent);

const store = {
  finalizeInitialPayment: {
    error: null,
    shouldShowFinalizePaymentComponent: false,
    payment: {
      paymentMethod: null,
      currency: null,
    },
  },
};

const middleware = [];
const mockStore = configureStore(middleware);

describe('withPaymentFinalizationHandler component', () => {
  test('by deafult should return wrapped component', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store)}>
        <WrappedComponent />
      </Provider>,
    );

    getByTestId('testComponent');
  });

  test('return PaymentFinalizationPage if shouldShowFinalizePaymentComponent is set to true', async () => {
    const { getByTestId, queryByTestId } = render(
      <Provider
        store={mockStore({
          finalizeInitialPayment: {
            ...store.finalizeInitialPayment,
            shouldShowFinalizePaymentComponent: true,
          },
        })}
      >
        <WrappedComponent />
      </Provider>,
    );

    getByTestId('PaymentFinalizationPage-loader');
    expect(queryByTestId('testComponent')).toBeNull();
  });
});
