import { screen } from '@testing-library/react';
import Consent from 'components/Consents';
import 'i18NextInit';
import { Consent as ConsentType } from 'types/components/Consents.types';
import renderWithProviders from 'util/testHelpers';
import { RootState } from 'appRedux/rootReducer';
import { initialState } from 'appRedux/publisherConfigSlice';

const store = (
  loading = false,
  error = '',
  publisherConsents: ConsentType[] = [],
  checked: boolean[] = []
): Partial<RootState> => ({
  publisherConsents: {
    publisherConsents,
    checked,
    loading,
    error
  },
  publisherConfig: { ...initialState, publisherId: '' }
});

const consentsProps = {
  onChangeFn: () => null
};

describe('Consents component', () => {
  test('should render GeneralErrorStyled when publisherId is not given (if loading = false)', async () => {
    renderWithProviders(<Consent {...consentsProps} />, {
      preloadedState: store(false, 'noPublisherId')
    });

    expect(screen.getByTestId('consents__general-error')).toBeInTheDocument();
  });
  test('should render GeneralErrorStyled when publisherId is not given (if loading = true)', async () => {
    renderWithProviders(<Consent {...consentsProps} />, {
      preloadedState: store(true, 'noPublisherId')
    });

    expect(screen.getByTestId('consents__general-error')).toBeInTheDocument();
  });
  test('should render Loader component', async () => {
    renderWithProviders(<Consent {...consentsProps} />, {
      preloadedState: store(true)
    });

    expect(screen.getByTestId('consents__loader')).toBeInTheDocument();
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

    renderWithProviders(<Consent {...consentsProps} />, {
      preloadedState: store(false, '', publisherConsents, checked)
    });

    expect(
      screen.getByRole('checkbox', { checked: false }).parentElement
    ).toHaveTextContent(publisherConsents[0].label);

    expect(
      screen.getByRole('checkbox', { checked: true }).parentElement
    ).toHaveTextContent(publisherConsents[1].label);
  });
});
