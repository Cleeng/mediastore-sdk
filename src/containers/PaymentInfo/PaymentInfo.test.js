import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentInfo from 'containers/PaymentInfo';
import 'i18NextInit';
// eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

const pastDate = 16762771;

const store = (isOpen = false) => ({
  paymentDetails: {
    paymentDetails: [],
    activeOrBoundPaymentDetails: [],
    loading: false,
    error: []
  },
  paymentMethods: {
    selectedPaymentMethod: []
  },
  finalizeAddPaymentDetails: {
    loading: false
  },
  transactions: {
    transactions: [],
    error: [],
    showToggleButton: false,
    loading: false,
    isListExpanded: false
  },
  publisherConfig: {
    displayGracePeriodError: true,
    adyenConfiguration: null,
    t: k => k,
    paymentMethods: []
  },
  popupManager: {
    paymentDetails: {
      isOpen,
      isLoading: false
    }
  },
  plan: {
    currentPlan: [
      {
        status: 'active',
        expiresAt: pastDate
      }
    ]
  },
  offers: { pauseOffersIDs: [] }
});

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('../../containers/labeling', () =>
  jest.fn(() => jest.fn(Component => Component))
);

describe('PaymentInfo component', () => {
  test('should render PaymentMethod and Transactions component if paymentDetails is not open', async () => {
    const { getByText } = render(
      <Provider store={mockStore(store(false))}>
        <PaymentInfo />
      </Provider>
    );

    expect(getByText(/Current payment method/i)).toBeInTheDocument();
    expect(getByText(/Payment history/i)).toBeInTheDocument();
  });

  test('should render UpdatePaymentDetailsPopup component if paymentDetails is open', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(true))}>
        <PaymentInfo />
      </Provider>
    );

    expect(
      getByTestId('payment-info__update-payment-details-popup')
    ).toBeInTheDocument();
  });
});
