import withPaymentFinalizationHandler from 'containers/withPaymentFinalizationHandler';
import renderWithProviders from 'util/testHelpers';
import { screen } from '@testing-library/react';

const TestComponent = () => <div data-testid='testComponent'>Test</div>;
const WrappedComponent = withPaymentFinalizationHandler(TestComponent);

const initialState = {
  finalizeInitialPayment: {
    error: null,
    shouldShowFinalizePaymentComponent: false,
    payment: {
      paymentMethod: null,
      currency: null
    }
  }
};

describe('withPaymentFinalizationHandler component', () => {
  test('by default should return wrapped component', async () => {
    renderWithProviders(<WrappedComponent />, {
      preloadedState: initialState
    });

    screen.getByTestId('testComponent');
  });

  test('return PaymentFinalizationPage if shouldShowFinalizePaymentComponent is set to true', async () => {
    renderWithProviders(<WrappedComponent />, {
      preloadedState: {
        finalizeInitialPayment: {
          ...initialState.finalizeInitialPayment,
          shouldShowFinalizePaymentComponent: true
        }
      }
    });

    screen.getByTestId('PaymentFinalizationPage-loader');
    expect(screen.queryByTestId('testComponent')).toBeNull();
  });
});
