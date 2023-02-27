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
  publisherConsents = [],
  labels = [],
  checked = []
) => ({
  publisherConsents: {
    publisherConsents,
    labels,
    checked,
    loading,
    error
  },
  publisherConfig: { publisherId: '' }
});

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Consents component', () => {
  test('should render GeneralErrorStyled when publisherId is not given (if loading = false)', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(false, 'noPublisherId'))}>
        <Consent />
      </Provider>
    );

    expect(getByTestId('consents__general-error')).toBeInTheDocument();
  });
  test('should render GeneralErrorStyled when publisherId is not given (if loading = true)', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(true, 'noPublisherId'))}>
        <Consent />
      </Provider>
    );

    expect(getByTestId('consents__general-error')).toBeInTheDocument();
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
    const publisherConsents = [
      { name: 'broadcaster_terms', version: '1', required: true },
      { name: 'broadcaster_marketing', version: '1', required: false }
    ];
    const labels = ['Label 1', 'Label 2'];
    const checked = [false, true];

    render(
      <Provider
        store={mockStore(store(false, '', publisherConsents, labels, checked))}
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
