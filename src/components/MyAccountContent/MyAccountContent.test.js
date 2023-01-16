import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyAccountContent from './MyAccountContent';
import '@testing-library/jest-dom';

const store = currentPlan => ({
  planDetails: {
    currentPlan
  }
});

const pastDate = 1676277169;
const futureDate = 99999999999999;

const mockStore = configureStore();

describe('MyAccountContent component', () => {
  test('renders error when status is active and expiresAt is in the past', () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore(
          store([
            {
              status: 'active',
              expiresAt: pastDate
            }
          ])
        )}
      >
        <MyAccountContent />
      </Provider>
    );
    getByTestId('grace-period-error');
  });

  test('renders error when at least one element has status active and expiresAt is in the past', () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore(
          store([
            {
              status: 'active',
              expiresAt: pastDate
            },
            {
              status: 'NOT active',
              expiresAt: futureDate
            },
            {
              status: 'NOT active',
              expiresAt: futureDate
            }
          ])
        )}
      >
        <MyAccountContent />
      </Provider>
    );
    getByTestId('grace-period-error');
  });

  test('does not render error when status is active and expiresAt is in the future ', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          store([
            {
              status: 'active',
              expiresAt: futureDate
            }
          ])
        )}
      >
        <MyAccountContent />
      </Provider>
    );

    expect(queryByTestId('grace-period-error')).toBeNull();
  });

  test('does not render error when status is NOT active and expiresAt is in the past', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          store([
            {
              status: 'NOT active',
              expiresAt: pastDate
            }
          ])
        )}
      >
        <MyAccountContent />
      </Provider>
    );

    expect(queryByTestId('grace-period-error')).toBeNull();
  });

  test('does not render error when status is NOT active and expiresAt is in the future ', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          store([
            {
              status: 'NOT active',
              expiresAt: futureDate
            }
          ])
        )}
      >
        <MyAccountContent />
      </Provider>
    );

    expect(queryByTestId('grace-period-error')).toBeNull();
  });
});
