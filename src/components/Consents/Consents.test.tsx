import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Consent from 'components/Consents';
import 'i18NextInit';
import { Consent as ConsentType } from 'types/Consents.types';

const store = (
  loading = false,
  error = '',
  publisherConsents: ConsentType[] = [],
  checked: boolean[] = []
) => ({
  publisherConsents: {
    publisherConsents,
    checked,
    loading,
    error
  },
  publisherConfig: { publisherId: '' }
});

const consentsProps = {
  onChangeFn: () => null
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Consents component', () => {
  test('should render GeneralErrorStyled when publisherId is not given (if loading = false)', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(false, 'noPublisherId'))}>
        <Consent {...consentsProps} />
      </Provider>
    );

    expect(getByTestId('consents__general-error')).toBeInTheDocument();
  });
  test('should render GeneralErrorStyled when publisherId is not given (if loading = true)', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(true, 'noPublisherId'))}>
        <Consent {...consentsProps} />
      </Provider>
    );

    expect(getByTestId('consents__general-error')).toBeInTheDocument();
  });
  test('should render Loader component', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore(store(true))}>
        <Consent {...consentsProps} />
      </Provider>
    );

    expect(getByTestId('consents__loader')).toBeInTheDocument();
  });
  test('should render consents', async () => {
    const publisherConsents: ConsentType[] = [
      {
        name: 'broadcaster_terms',
        label: 'Label 1',
        version: '1',
        required: true,
        broadcasterId: 123,
        enabledByDefault: false,
        value: ''
      },
      {
        name: 'broadcaster_marketing',
        label: 'Label 2',
        version: '1',
        required: false,
        broadcasterId: 123,
        enabledByDefault: false,
        value: ''
      }
    ];
    const checked = [false, true];

    render(
      <Provider store={mockStore(store(false, '', publisherConsents, checked))}>
        <Consent {...consentsProps} />
      </Provider>
    );

    expect(screen.getByRole('checkbox', { checked: false })).toHaveTextContent(
      publisherConsents[0].label
    );
    expect(screen.getByRole('checkbox', { checked: true })).toHaveTextContent(
      publisherConsents[1].label
    );
  });
});
