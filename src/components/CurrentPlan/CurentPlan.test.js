import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CurrentPlan from './CurrentPlan';
import 'i18NextInit';

const store = {
  offers: {
    pauseOffersIDs: []
  },
  planDetails: {
    currentPlan: [],
    updateList: false,
    offerToSwitch: {},
    switchSettings: {},
    switchDetails: {}
  }
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('../../containers/labeling', () =>
  jest.fn(() => jest.fn(Component => Component))
);

const subscription = {
  subscriptionId: 123456789,
  offerId: 'MOCK_OFFER_ID',
  status: 'active',
  startedAt: 1675332884,
  nextPaymentPrice: 9999999,
  nextPaymentCurrency: 'EUR',
  nextPaymentAt: 1677492884,
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  externalPaymentId: 'MOCK_EXTERNAL_PAYMENT_ID',
  offerType: 'S',
  offerTitle: 'Test',
  period: 'month',
  totalPrice: 90
};

const props = {
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  showInnerPopup: () => {},
  setOfferToSwitch: () => {},
  updateList: () => {}
};

const expiresDates = {
  'ExpiresAt2038-01-01 00:00:00': 2145913200,
  'ExpiresNOTAt2038-01-01 00:00:00': 1677752084
};

describe('CurrentPlan component', () => {
  test('renders "infinite date" if Expires At 2038-01-01 00:00:00', () => {
    const { getByText } = render(
      <Provider store={mockStore(store)}>
        <CurrentPlan
          {...props}
          subscriptions={[
            {
              ...subscription,
              expiresAt: expiresDates['ExpiresAt2038-01-01 00:00:00']
            }
          ]}
        />
      </Provider>
    );

    expect(
      getByText('Renews automatically on the next season start')
    ).toBeInTheDocument();
  });

  test('does NOT render "infinite date" if Expires NOT At 2038-01-01 00:00:00', async () => {
    const { queryByText } = render(
      <Provider store={mockStore(store)}>
        <CurrentPlan
          {...props}
          subscriptions={[
            {
              ...subscription,
              expiresAt: expiresDates['ExpiresNOTAt2038-01-01 00:00:00']
            }
          ]}
        />
      </Provider>
    );

    expect(
      queryByText('Renews automatically on the next season start')
    ).not.toBeInTheDocument();
  });
});
