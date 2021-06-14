"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MyAccountConsents = _interopRequireDefault(require("components/MyAccountConsents"));

var _getCustomerConsents = _interopRequireDefault(require("api/Customer/getCustomerConsents"));

var _submitConsents = _interopRequireDefault(require("api/Customer/submitConsents"));

var _Popup = require("./Popup");

require("jest-styled-components");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('api/Customer/submitConsents');
jest.mock('api/Customer/getCustomerConsents');
jest.mock('containers/labeling', function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
describe('<Popup/>', function () {
  var setConsentsMock = jest.fn();
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state on componentDidMount and not allow to press button if terms not accepted', function () {
      var consents = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: false,
        state: 'accepted',
        version: '1',
        needsUpdate: false,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '1',
        date: 1589366394
      }, {
        customerId: '338816933',
        name: 'broadcaster_terms',
        required: true,
        state: 'declined',
        version: '1',
        needsUpdate: true,
        label: 'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
        value: 'https://cleeng.com/privacy',
        newestVersion: '1',
        date: 1589777684
      }];
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Popup.PurePopup, {
        setConsents: setConsentsMock,
        consents: consents,
        popupType: "notCheckedTerms",
        hidePopup: jest.fn()
      }));
      expect(wrapper.state('updatedConsents')).toEqual(consents);
      expect(wrapper.state('allowSubmitConsents')).toBe(false);
    });
    it('should render initial state on componentDidMount and allow to press button if terms not accepted', function () {
      var consents = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: false,
        state: 'accepted',
        version: '1',
        needsUpdate: false,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '1',
        date: 1589366394
      }, {
        customerId: '338816933',
        name: 'broadcaster_terms',
        required: true,
        state: 'accpeted',
        version: '1',
        needsUpdate: true,
        label: 'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
        value: 'https://cleeng.com/privacy',
        newestVersion: '2',
        date: 1589777684
      }];
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Popup.PurePopup, {
        setConsents: setConsentsMock,
        consents: consents,
        popupType: "termsUpdateRequired",
        hidePopup: jest.fn()
      }));
      expect(wrapper.state('updatedConsents')).toEqual(consents);
      expect(wrapper.state('allowSubmitConsents')).toBe(true);
    });
  });
  describe('@actions', function () {
    it('should render next step on button click', function () {
      var consents = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: true,
        state: 'accepted',
        version: '1',
        needsUpdate: true,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '2',
        date: 1589366394
      }];
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Popup.PurePopup, {
        setConsents: setConsentsMock,
        consents: consents,
        popupType: "termsUpdateRequired",
        hidePopup: jest.fn()
      }));
      wrapper.find('button').simulate('click');
      expect(wrapper.state('step')).toBe(2);
    });
    it('should submit consents on button click', function (done) {
      var consents = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: true,
        state: 'declined',
        version: '1',
        needsUpdate: true,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '2',
        date: 1589366394
      }];
      var changedConsent = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: true,
        state: 'accepted',
        version: '1',
        needsUpdate: true,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '2',
        date: 1589366394
      }];

      _submitConsents.default.mockResolvedValue({
        responseData: {},
        errors: []
      });

      _getCustomerConsents.default.mockResolvedValue({
        responseData: {
          consents: changedConsent
        },
        errors: []
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Popup.PurePopup, {
        setConsents: setConsentsMock,
        consents: consents,
        popupType: "termsUpdateRequired",
        hidePopup: jest.fn()
      }));
      wrapper.find('button').simulate('click');
      expect(wrapper.state('step')).toBe(2);
      expect(wrapper.find(_MyAccountConsents.default).exists()).toBe(true);
      wrapper.find(_MyAccountConsents.default).props().saveConsents(changedConsent);
      expect(wrapper.state('updatedConsents')).toEqual(changedConsent);
      expect(wrapper.state('allowSubmitConsents')).toEqual(true);
      wrapper.find('button').simulate('click');
      setImmediate(function () {
        expect(_submitConsents.default).toHaveBeenCalledWith([], [], [{
          name: 'broadcaster_marketing',
          version: '2',
          state: 'accepted'
        }]);
        expect(_getCustomerConsents.default).toHaveBeenCalled();
        expect(setConsentsMock).toHaveBeenCalledWith(changedConsent);
        done();
      });
    });
  });
});