// probably renderWithProviders is broken:
// eslint-disable-next-line import/order
import ErrorStep from './ErrorStep';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'i18NextInit';
import renderWithProviders from 'util/testHelpers';
import { RootState } from 'appRedux/rootReducer';
import {
  PAYMENT_DETAILS_STEPS,
  initialState as popupManagerInitialState,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';

vi.mock('appRedux/popupSlice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('appRedux/popupSlice')>()),
  updatePaymentDetailsPopup: vi.fn(() => () => null)
}));

type StoreArgs = {
  popupManagerError?: string;
  finalizeAddPaymentDetailsError?: string;
};

const store = ({
  popupManagerError,
  finalizeAddPaymentDetailsError
}: StoreArgs): Partial<RootState> => ({
  popupManager: {
    ...popupManagerInitialState,
    paymentDetails: {
      isOpen: true,
      step: PAYMENT_DETAILS_STEPS.ERROR,
      isLoading: false,
      initPaymentMethod: null,
      errorMessage: popupManagerError
    }
  },
  finalizeAddPaymentDetails: {
    loading: false,
    paymentDetails: null,
    error: finalizeAddPaymentDetailsError ?? null
  }
});

describe('ErrorStep component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render ErrorStep component with default error message', () => {
    renderWithProviders(<ErrorStep />, {
      preloadedState: store({})
    });

    expect(screen.getByLabelText('Warning icon')).toBeVisible();
    expect(screen.getByText('Oops! Something went wrong.')).toBeVisible();
    expect(
      screen.getByText(
        'We weren’t able to update your payment details. Please try again using different payment method.'
      )
    ).toBeVisible();
  });

  test('should fire updatePaymentDetailsPopup function on button click', async () => {
    renderWithProviders(<ErrorStep />, {
      preloadedState: store({})
    });

    const user = userEvent.setup();
    const button = screen.getByRole('button', {
      name: 'Try again'
    });
    await user.click(button);

    expect(updatePaymentDetailsPopup).toHaveBeenCalledWith({
      step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE,
      isLoading: false
    });
  });

  test('should show popupManager error message when payment is refused', async () => {
    renderWithProviders(<ErrorStep />, {
      preloadedState: store({ popupManagerError: 'Refused' })
    });

    expect(
      screen.getByText(
        'We weren’t able to update your payment method. Please try again.'
      )
    ).toBeVisible();
  });

  test('should show popupManager error message when user has no active entitlement', async () => {
    renderWithProviders(<ErrorStep />, {
      preloadedState: store({ popupManagerError: 'No active entitlement' })
    });

    expect(
      screen.getByText(
        'We weren’t able to update your payment method because you don’t have an active plan.'
      )
    ).toBeVisible();
  });

  test('should show finalizeAddPaymentDetails default error message when payment is cancelled', async () => {
    renderWithProviders(<ErrorStep />, {
      preloadedState: store({
        finalizeAddPaymentDetailsError: 'Cancelled'
      })
    });

    expect(
      screen.getByText(
        'We weren’t able to update your payment details. Please try again using different payment method.'
      )
    ).toBeVisible();
  });
});
