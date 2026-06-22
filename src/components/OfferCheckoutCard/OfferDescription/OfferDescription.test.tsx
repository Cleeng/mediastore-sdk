import { render, screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OfferDescription from './OfferDescription';

// Initialise i18n synchronously so {{date}} interpolation works in tests.
// Uses the same delimiter config as i18NextInit.js but with no backend.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: { en: { translations: {} } },
    defaultNS: 'translations',
    ns: ['translations'],
    interpolation: { escapeValue: false, prefix: '{{', suffix: '}}' },
    nsSeparator: false,
    keySeparator: false,
    initImmediate: false
  });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error redux-mock-store types mismatch
const mockStore = configureStore([thunk]);

// Minimal store shape required by OfferDescription (uses selectGift)
const storeWithGift = mockStore({
  gift: {
    gift: {},
    verifiedGift: { redeemMode: null, redeemRefusalReason: null },
    loading: false,
    error: null,
    isUpdateLoading: false,
    isVerifyLoading: false,
    isRedeemLoading: false
  }
});

// Default props shared across tests
const baseProps = {
  period: '',
  freeDays: 0,
  currencySymbol: '$',
  grossPrice: '9.99',
  taxCopy: 'Tax',
  freePeriods: 0,
  totalPrice: 9.99,
  offerPrice: 9.99,
  taxRate: 0,
  customerPriceInclTax: 9.99,
  discountedPeriods: 0,
  discountType: '',
  isTrialAvailable: false,
  startTime: 0,
  isRedeemGift: false
};

describe('OfferDescription – Pass offer (offerType P)', () => {
  /**
   * FIX VERIFICATION
   *
   * Pass offers with expirationPolicy "duration" return expiresAt as a small
   * number (< 1000) representing the number of days, NOT a unix timestamp.
   * e.g. expiresAt: 2 means "2 days access".
   *
   * Previously the component called dateFormat(2) → new Date(2000) → 01/01/1970.
   * Now: if expiresAt < 1000, we treat it as days and show "X days access".
   *
   * Offer IDs reported by TOD: P468664275, P282246290, P632584755
   */
  it('shows duration description when expiresAt < 1000 (number of days)', () => {
    render(
      <Provider store={storeWithGift}>
        <OfferDescription
          {...baseProps}
          offerType='P'
          period=''
          expiresAt={2} // v1 API returns 2 meaning "2 days"
        />
      </Provider>
    );

    expect(screen.getByText(/2 days access/i)).toBeInTheDocument();
    expect(screen.queryByText(/1970/)).not.toBeInTheDocument();
  });

  it('shows singular "day" for 1-day pass', () => {
    render(
      <Provider store={storeWithGift}>
        <OfferDescription
          {...baseProps}
          offerType='P'
          period=''
          expiresAt={1} // 1 day pass
        />
      </Provider>
    );

    expect(screen.getByText(/1 day access/i)).toBeInTheDocument();
  });

  it('shows "4 days access" for a 4-day pass', () => {
    render(
      <Provider store={storeWithGift}>
        <OfferDescription
          {...baseProps}
          offerType='P'
          period=''
          expiresAt={4} // API returns "4" for 4-day pass
        />
      </Provider>
    );

    expect(screen.getByText(/4 days access/i)).toBeInTheDocument();
  });

  it('falls back to "Access until <date>" for real timestamps (expiresAt >= 1000)', () => {
    const futureTimestamp = 1750000000;
    render(
      <Provider store={storeWithGift}>
        <OfferDescription
          {...baseProps}
          offerType='P'
          period=''
          expiresAt={futureTimestamp}
        />
      </Provider>
    );

    expect(screen.getByText(/access until/i)).toBeInTheDocument();
    expect(screen.queryByText(/1970/)).not.toBeInTheDocument();
  });

  it('renders a readable period label when period is set', () => {
    render(
      <Provider store={storeWithGift}>
        <OfferDescription
          {...baseProps}
          offerType='P'
          period='week'
          expiresAt={0}
        />
      </Provider>
    );

    expect(screen.getByText(/weekly season pass/i)).toBeInTheDocument();
  });
});
