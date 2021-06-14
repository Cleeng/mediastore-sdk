"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _CaptureForm = _interopRequireDefault(require("./CaptureForm"));

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
    it('should render initial state without passed props', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CaptureForm.default, null));
      expect(wrapper.props().settings).toStrictEqual([]);
      expect(wrapper.props().redirectUrl).toStrictEqual([]);
    });
    it('should render initial state with passed props', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CaptureForm.default, {
        settings: captureSettings,
        redirectUrl: redirectUrl
      }));
      expect(wrapper.props().settings).toStrictEqual(captureSettings);
      expect(wrapper.props().redirectUrl).toBe(redirectUrl);
    });
  });
});