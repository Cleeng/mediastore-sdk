"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _Transactions = require("./Transactions");

var TRANSACTIONS = [{
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
}, {
  transactionId: 'T650862988',
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
}];
(0, _react2.storiesOf)('MyAccount/PaymentInfo/Transactions', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 700,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Transactions', function () {
  return /*#__PURE__*/_react.default.createElement(_Transactions.PureTransactions, {
    transactions: TRANSACTIONS,
    transactionsLoading: (0, _addonKnobs.boolean)('loading'),
    isExpanded: (0, _addonKnobs.boolean)('isExpanded'),
    toggleTransactionsList: function toggleTransactionsList() {},
    isShowMoreButtonHidden: (0, _addonKnobs.boolean)('isShowMoreButtonHidden', true)
  });
});