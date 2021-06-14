"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonActions = require("@storybook/addon-actions");

require("styles/index.scss");

var _Input = require("components/Input");

var _storybookAddonMock = _interopRequireDefault(require("storybook-addon-mock"));

var _offerDetails = require("./__mocks__/offerDetails");

var _Offer = require("./Offer");

var OFFER_DETAILS_GROUP_ID = 'Offer Details';
(0, _react2.storiesOf)('Pages/Offer', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonMock.default).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      minHeight: '100%',
      backgroundColor: 'white',
      position: 'relative'
    }
  }, story());
}).add('Basic Offer', function () {
  return /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
    offerDetails: {
      offerTitle: (0, _addonKnobs.text)('title', _offerDetails.offerDetailsMock.title, OFFER_DETAILS_GROUP_ID),
      customerCurrencySymbol: (0, _addonKnobs.text)('customerCurrencySymbol', _offerDetails.offerDetailsMock.customerCurrencySymbol, OFFER_DETAILS_GROUP_ID),
      description: (0, _addonKnobs.text)('description', _offerDetails.offerDetailsMock.description, OFFER_DETAILS_GROUP_ID),
      trialAvailable: (0, _addonKnobs.boolean)('trialAvailable', false, OFFER_DETAILS_GROUP_ID),
      freePeriods: (0, _addonKnobs.number)('freePeriods', _offerDetails.offerDetailsMock.freePeriods, {}, OFFER_DETAILS_GROUP_ID),
      freeDays: (0, _addonKnobs.number)('freeDays', _offerDetails.offerDetailsMock.freeDays, {}, OFFER_DETAILS_GROUP_ID),
      period: (0, _addonKnobs.text)('period', _offerDetails.offerDetailsMock.period, OFFER_DETAILS_GROUP_ID)
    },
    orderDetails: {
      priceBreakdown: {
        offerPrice: (0, _addonKnobs.number)('price', _offerDetails.offerDetailsMock.price, {}, OFFER_DETAILS_GROUP_ID),
        discountAmount: (0, _addonKnobs.number)('discountAmount', _offerDetails.offerDetailsMock.discountAmount, {}, OFFER_DETAILS_GROUP_ID),
        taxValue: (0, _addonKnobs.number)('taxValue', _offerDetails.offerDetailsMock.taxValue, {}, OFFER_DETAILS_GROUP_ID),
        customerServiceFee: (0, _addonKnobs.number)('customerServiceFee', _offerDetails.offerDetailsMock.customerServiceFee, {}, OFFER_DETAILS_GROUP_ID)
      },
      discount: {
        applied: (0, _addonKnobs.boolean)('discount applied', false, OFFER_DETAILS_GROUP_ID)
      },
      totalPrice: (0, _addonKnobs.number)('totalPrice', _offerDetails.offerDetailsMock.totalPrice, {}, OFFER_DETAILS_GROUP_ID),
      requiredPaymentDetails: (0, _addonKnobs.boolean)('requiredPaymentDetails', _offerDetails.offerDetailsMock.requiredPaymentDetails, OFFER_DETAILS_GROUP_ID)
    },
    couponProps: {
      showMessage: false,
      message: '',
      messageType: _Input.MESSAGE_TYPE_SUCCESS,
      onSubmit: (0, _addonActions.action)('apply-coupon')
    },
    onPaymentComplete: (0, _addonActions.action)('onPaymentComplete'),
    updatePriceBreakdown: function updatePriceBreakdown() {}
  });
}, {
  mockData: [{
    url: "".concat(ENVIRONMENT_CONFIGURATION.API_URL, "/payment-methods"),
    method: 'GET',
    status: 200,
    response: {
      responseData: {
        paymentMethods: [{
          id: 881885683,
          methodName: 'card',
          logoUrl: ''
        }, {
          id: 386925084,
          methodName: 'paypal',
          logoUrl: ''
        }],
        message: 'Payment method settings for publisher 105664357',
        status: 200
      },
      errors: []
    }
  }]
});