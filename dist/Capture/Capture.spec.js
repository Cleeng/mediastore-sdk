"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Header = _interopRequireDefault(require("components/Header"));

var _Footer = _interopRequireDefault(require("components/Footer"));

var _Capture = _interopRequireDefault(require("./Capture"));

jest.mock('react-i18next', function () {
  return {
    useTranslation: function useTranslation() {
      return [function (key) {
        return key;
      }];
    }
  };
});
var captureSettings = [{
  key: 'email',
  enabled: true,
  required: true,
  answer: 'test@test.com'
}, {
  key: 'firstNameLastName',
  enabled: true,
  required: true,
  answer: {
    firstName: null,
    lastName: null
  }
}, {
  key: 'birthDate',
  enabled: true,
  required: true,
  answer: null
}, {
  key: 'companyName',
  enabled: false,
  required: false,
  answer: null
}, {
  key: 'phoneNumber',
  enabled: true,
  required: true,
  answer: null
}, {
  key: 'address',
  enabled: false,
  required: true,
  answer: {
    address: null,
    address2: null,
    city: null,
    state: null,
    postCode: null,
    country: null
  }
}, {
  key: 'custom_1',
  enabled: true,
  required: true,
  value: 'option_1;option_2;option_3',
  question: 'What is the best option?',
  answer: null
}];
var redirectUrl = ['/offer'];
describe('Capture', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Capture.default, {
        settings: captureSettings,
        redirectUrl: redirectUrl
      }));
      var header = wrapper.find(_Header.default);
      var footer = wrapper.find(_Footer.default);
      expect(wrapper.props().settings).toBe(captureSettings);
      expect(wrapper.props().redirectUrl).toBe(redirectUrl);
      expect(header).toHaveLength(1);
      expect(footer).toHaveLength(1);
    });
  });
});