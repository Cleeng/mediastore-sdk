import withPaymentFinalizationHandler from 'containers/withPaymentFinalizationHandler';
import renderWithProviders from 'util/testHelpers';

const TestComponent = () => <div data-testid='testComponent'>Test</div>;
const WrappedComponent = withPaymentFinalizationHandler(TestComponent);

const initialState = {
  finalizeInitialPayment: {
    error: null,
    loading: false,
    shouldShowFinalizePaymentComponent: false,
    payment: {
      paymentMethod: null,
      id: null,
      currency: null
    }
  }
};

const wrappedComponentProps = {
  onSuccess: () => null
};

describe('withPaymentFinalizationHandler component', () => {
  test('by default should return wrapped component', async () => {
    const { getByTestId } = renderWithProviders(
      <WrappedComponent {...wrappedComponentProps} />,
      {
        preloadedState: initialState
      }
    );

    expect(getByTestId('testComponent')).toBeInTheDocument();
  });

  test('return PaymentFinalizationPage if shouldShowFinalizePaymentComponent is set to true', async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <WrappedComponent {...wrappedComponentProps} />,
      {
        preloadedState: {
          finalizeInitialPayment: {
            ...initialState.finalizeInitialPayment,
            shouldShowFinalizePaymentComponent: true
          }
        }
      }
    );

    expect(getByTestId('PaymentFinalizationPage-loader')).toBeInTheDocument();
    expect(queryByTestId('testComponent')).toBeNull();
  });
});
