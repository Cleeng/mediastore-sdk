"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _appConfigHelper = require("util/appConfigHelper");

var _storybookAddonMock = _interopRequireDefault(require("storybook-addon-mock"));

var _storybookReactRouter = _interopRequireDefault(require("storybook-react-router"));

var _Register = require("./Register");

require("styles/index.scss");

(0, _appConfigHelper.setData)('CLEENG_OFFER_ID', 'S144753252_UA');
(0, _appConfigHelper.setData)('CLEENG_PUBLISHER_ID', '933103327');
(0, _react2.storiesOf)('Pages/RegisterPage', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_storybookAddonMock.default).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 700,
      backgroundColor: 'white',
      position: 'relative'
    }
  }, story());
}).addDecorator((0, _storybookReactRouter.default)()).add('Basic Register', function () {
  return /*#__PURE__*/_react.default.createElement(_Register.PureRegister, {
    urlProps: {
      location: {
        search: '?offer=S144753252_UA&publisher=933103327'
      }
    }
  });
}, {
  mockData: [{
    url: "".concat(ENVIRONMENT_CONFIGURATION.API_URL, "/publishers/933103327/consents"),
    method: 'GET',
    status: 200,
    response: {
      responseData: {
        consents: [{
          broadcasterId: 0,
          name: 'terms',
          version: '1',
          value: 'https://cleeng.com/cleeng-user-agreement',
          label: 'I accept the Terms and Conditions of Cleeng.',
          required: true
        }]
      },
      errors: []
    }
  }]
});