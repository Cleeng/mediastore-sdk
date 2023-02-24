import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Consent from 'components/Consents';
import 'i18NextInit';

const store = (
  loading = false,
  error = '',
  definitions = [],
  labels = [],
  checked = []
) => ({
  consents: {
    definitions,
    labels,
    checked,
    loading,
    error
  },
  publisherConfig: { publisherId: '' }
});

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('PaymentInfo component', () => {
  test('should render GeneralErrorStyled (if loading = false)', async () => {
    const { getByText } = render(
      <Provider store={mockStore(store(false, 'noPublisherId'))}>
        <Consent />
      </Provider>
    );

    expect(
      getByText(
        /Unable to fetch terms & conditions. Publisher is not recognized/i
      )
    ).toBeInTheDocument();
  });
  test('should render GeneralErrorStyled (if loading = true)', async () => {
    const { getByText } = render(
      <Provider store={mockStore(store(true, 'noPublisherId'))}>
        <Consent />
      </Provider>
    );

    expect(
      getByText(
        /Unable to fetch terms & conditions. Publisher is not recognized/i
      )
    ).toBeInTheDocument();
  });
  test('should render Loader component', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(true))}>
        <Consent />
      </Provider>
    );

    expect(getByTestId('consents__loader')).toBeInTheDocument();
  });
  test('should render consents', async () => {
    const definitions = [
      { name: 'broadcaster_terms', version: '1', required: true },
      { name: 'broadcaster_marketing', version: '1', required: false }
    ];
    const labels = ['Label 1', 'Label 2'];
    const checked = [false, true];

    render(
      <Provider
        store={mockStore(store(false, '', definitions, labels, checked))}
      >
        <Consent />
      </Provider>
    );

    expect(screen.getByRole('checkbox', { checked: false })).toHaveTextContent(
      labels[0]
    );
    expect(screen.getByRole('checkbox', { checked: true })).toHaveTextContent(
      labels[1]
    );
  });
});
