import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { CustomerOffer as CurrentPlan } from 'api/Customer/types';
import currentPlanMock from 'util/planDetailsMock';
import GracePeriodError from './GracePeriodError';

const getPreloadedState = (
  currentPlan: CurrentPlan[],
  displayGracePeriodError = true
) => ({
  plan: {
    currentPlan: {
      data: currentPlan
    }
  },
  publisherConfig: {
    displayGracePeriodError
  }
});

const pastDate = 16762771;
const futureDate = 99999999999999;

const mockStore = (preloadedState: ReturnType<typeof getPreloadedState>) =>
  configureStore({ reducer: () => preloadedState });

describe('GracePeriodError component', () => {
  test('renders warning with correct styles', async () => {
    const { getByText } = render(
      <Provider
        store={mockStore(
          getPreloadedState([
            {
              ...currentPlanMock,
              status: 'active',
              expiresAt: pastDate
            }
          ])
        )}
      >
        <GracePeriodError />
      </Provider>
    );

    expect(getByText('update it')).toHaveStyle('text-decoration: underline;');
  });

  test('renders svg image', async () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore(
          getPreloadedState([
            {
              ...currentPlanMock,
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
          getPreloadedState([
            {
              ...currentPlanMock,
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
          getPreloadedState([
            {
              ...currentPlanMock,
              status: 'active',
              expiresAt: pastDate
            },
            {
              ...currentPlanMock,
              status: 'cancelled',
              expiresAt: futureDate
            },
            {
              ...currentPlanMock,
              status: 'cancelled',
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
          getPreloadedState([
            {
              ...currentPlanMock,
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

  test('does not render error when status is cancelled and expiresAt is in the past', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          getPreloadedState([
            {
              ...currentPlanMock,
              status: 'cancelled',
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

  test('does not render error when status is cancelled and expiresAt is in the future ', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          getPreloadedState([
            {
              ...currentPlanMock,
              status: 'cancelled',
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

  test('render error when displayGracePeriodError is provided - set to true', () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore(
          getPreloadedState(
            [
              {
                ...currentPlanMock,
                status: 'active',
                expiresAt: pastDate
              }
            ],
            true
          )
        )}
      >
        <GracePeriodError />
      </Provider>
    );
    getByTestId('grace-period-error');
  });

  test('does not render error when displayGracePeriodError is NOT provided', () => {
    const { queryByTestId } = render(
      <Provider
        store={mockStore(
          getPreloadedState(
            [
              {
                ...currentPlanMock,
                status: 'active',
                expiresAt: pastDate
              }
            ],
            false
          )
        )}
      >
        <GracePeriodError />
      </Provider>
    );
    expect(queryByTestId('grace-period-error')).toBeNull();
  });
});
