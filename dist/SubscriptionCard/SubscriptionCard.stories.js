"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _SubscriptionCard = require("./SubscriptionCard");

(0, _react2.storiesOf)('Common/SubscriptionCard', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 600,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_SubscriptionCard.PureSubscriptionCard, {
    period: ((0, _addonKnobs.select)('Period', ['week', 'month', '3months', '6months', 'year']), 'month'),
    title: (0, _addonKnobs.text)('Title', 'Weekly subscription to Company'),
    description: (0, _addonKnobs.text)('Description', 'Some description for this offer'),
    currency: (0, _addonKnobs.select)('Currency', ['$', '€', 'PLN']),
    price: (0, _addonKnobs.number)('Price', 20),
    isSubscriptionOffer: (0, _addonKnobs.boolean)('isSubscriptionOffer', true)
  });
});