import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GracePeriodError from './GracePeriodError';

const store = currentPlan => ({
  planDetails: {
    currentPlan
  }
});

const pastDate = 1676277169;
const futureDate = 99999999999999;

const mockStore = configureStore();

describe('GracePeriodError component', () => {
  test('renders warning with correct styles', async () => {
    const { getByText } = render(
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
        <GracePeriodError />
      </Provider>
    );

    expect(getByText('make sure to update')).toHaveStyle(
      'text-decoration: underline;'
    );
  });

  test('renders svg image', async () => {
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
        <GracePeriodError />
      </Provider>
    );
    getByTestId('alert-svg');
  });

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
        <GracePeriodError />
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
        <GracePeriodError />
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
        <GracePeriodError />
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
        <GracePeriodError />
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
        <GracePeriodError />
      </Provider>
    );

    expect(queryByTestId('grace-period-error')).toBeNull();
  });
});
