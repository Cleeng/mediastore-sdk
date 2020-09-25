import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { PureTransactions as Transactions } from './Transactions';

const TRANSACTIONS = [
  {
    transactionId: 'T650862998',
    transactionDate: 1584361260,
    offerId: 'S568296139_ZW',
    offerType: 'subscription',
    offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice',
    offerPeriod: 'annual',
    publisherSiteName: null,
    transactionPriceExclTax: '18.0200',
    transactionCurrency: 'EUR',
    contentExternalId: '',
    contentType: '',
    shortUrl: '',
    campaignId: '0',
    campaignName: '',
    couponCode: null,
    discountType: '0',
    discountRate: '0.0000',
    discountValue: '0.0000',
    discountedOfferPrice: '20.0000',
    offerCurrency: 'USD',
    offerPriceExclTax: '20.0000',
    applicableTax: '4.1416',
    transactionPriceInclTax: '22.1616',
    publisherEarnings: '17.6583',
    publisherCurrency: 'USD',
    transactionPriceInPublisherCurrencyExclTax: '19.8696',
    appliedExchangeRateCustomer: '0.0250',
    customerId: '338816933',
    customerEmail: 'user@example.com',
    customerLocale: 'en_US',
    customerCountry: 'PL',
    customerIpCountry: 'PL',
    customerCurrency: 'EUR',
    privacy: 'only-important',
    paymentMethod: 'card',
    referalUrl: '',
    transactionExternalData: '883584361259577F',
    affiliatorId: '0',
    publisherId: null,
    distributorEarnings: null,
    totalEarnings: null,
    distributorCurrency: null,
    transactionPriceInDistributorCurrencyExclTax: null
  },
  {
    transactionId: 'T650862998',
    transactionDate: 1584361260,
    offerId: 'S568296139_ZW',
    offerType: 'subscription',
    offerTitle: 'Monthly subscription (recurring) to Test TV',
    offerPeriod: 'annual',
    publisherSiteName: null,
    transactionPriceExclTax: '18.0200',
    transactionCurrency: 'EUR',
    contentExternalId: '',
    contentType: '',
    shortUrl: '',
    campaignId: '0',
    campaignName: '',
    couponCode: null,
    discountType: '0',
    discountRate: '0.0000',
    discountValue: '0.0000',
    discountedOfferPrice: '20.0000',
    offerCurrency: 'USD',
    offerPriceExclTax: '20.0000',
    applicableTax: '4.1416',
    transactionPriceInclTax: '22.1616',
    publisherEarnings: '17.6583',
    publisherCurrency: 'USD',
    transactionPriceInPublisherCurrencyExclTax: '19.8696',
    appliedExchangeRateCustomer: '0.0250',
    customerId: '338816933',
    customerEmail: 'user@example.com',
    customerLocale: 'en_US',
    customerCountry: 'PL',
    customerIpCountry: 'PL',
    customerCurrency: 'EUR',
    privacy: 'only-important',
    paymentMethod: 'card',
    referalUrl: '',
    transactionExternalData: '883584361259577F',
    affiliatorId: '0',
    publisherId: null,
    distributorEarnings: null,
    totalEarnings: null,
    distributorCurrency: null,
    transactionPriceInDistributorCurrencyExclTax: null
  }
];
storiesOf('MyAccount/PaymentInfo/Transactions', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 700,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Transactions', () => (
    <Transactions
      transactions={TRANSACTIONS}
      transactionsLoading={boolean('loading')}
      isExpanded={boolean('isExpanded')}
      toggleTransactionsList={() => {}}
      isShowMoreButtonHidden={boolean('isShowMoreButtonHidden', true)}
    />
  ));
