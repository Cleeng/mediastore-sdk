"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _submitConsents = _interopRequireDefault(require("api/Customer/submitConsents"));

var _MyAccountConsentsStyled = require("./MyAccountConsentsStyled");

var _MyAccountConsents = require("./MyAccountConsents");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('api/Customer/submitConsents');
describe('<MyAccountConsents/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  var setConsentsMock = jest.fn();
  var consentsMock = [{
    customerId: '338816933',
    name: 'broadcaster_marketing',
    required: false,
    state: 'declined',
    version: '2',
    needsUpdate: false,
    label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
    value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
    newestVersion: '2',
    date: 1588942073
  }, {
    customerId: '338816933',
    name: 'broadcaster_terms',
    required: false,
    state: 'accepted',
    version: '3',
    needsUpdate: false,
    label: 'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
    value: 'https://cleeng.com/privacy',
    newestVersion: '3',
    date: 1588942073
  }];
  var defaultProps = {
    setConsents: setConsentsMock,
    consents: []
  };
  var propsWithConsents = {
    setConsents: setConsentsMock,
    consents: consentsMock
  };
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, defaultProps));
      wrapper.setProps({
        consents: consentsMock
      });
      wrapper.update();
      expect(wrapper.find(_MyAccountConsentsStyled.CheckboxStyled).exists()).toBe(true);
    });
  });
  describe('@action', function () {
    it('should change state on click Update Terms button', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, propsWithConsents));
      expect(wrapper.state('isSectionDisabled')).toBe(true);
      wrapper.find(_MyAccountConsentsStyled.ButtonStyled).first().simulate('click');
      expect(wrapper.state('isSectionDisabled')).toBe(false);
    });
    it('should change state on click Cancel button', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, propsWithConsents));
      wrapper.setState({
        isSectionDisabled: false
      });
      wrapper.find(_MyAccountConsentsStyled.ButtonStyled).first().simulate('click');
      expect(wrapper.state('isSectionDisabled')).toBe(true);
      expect(wrapper.state('updatedConsents')).toBe(consentsMock);
    });
    it('should submit consents on click Save button', function (done) {
      _submitConsents.default.mockResolvedValue({
        responseData: {},
        errors: []
      });

      var correctPayload = [{
        name: 'broadcaster_marketing',
        version: '2',
        state: 'declined'
      }, {
        name: 'broadcaster_terms',
        version: '3',
        state: 'accepted'
      }];
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, propsWithConsents));
      wrapper.setState({
        isSectionDisabled: false
      });
      wrapper.find(_MyAccountConsentsStyled.ButtonStyled).at(1).simulate('click');
      expect(wrapper.state('isSubmittingPending')).toBe(true);
      setImmediate(function () {
        expect(_submitConsents.default).toHaveBeenCalledWith([], [], correctPayload);
        expect(wrapper.state('isSectionDisabled')).toBe(true);
        expect(wrapper.state('isSubmittingPending')).toBe(false);
        done();
      });
    });
    it('should change state on click consent checkbox', function () {
      var correctState = [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: false,
        state: 'declined',
        version: '2',
        needsUpdate: false,
        label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
        newestVersion: '2',
        date: 1588942073
      }, {
        customerId: '338816933',
        name: 'broadcaster_terms',
        required: false,
        state: 'declined',
        version: '3',
        needsUpdate: false,
        label: 'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
        value: 'https://cleeng.com/privacy',
        newestVersion: '3',
        date: 1588942073
      }];
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, propsWithConsents));
      expect(wrapper.state('isSectionDisabled')).toBe(true);
      wrapper.setState({
        isSectionDisabled: false
      });
      wrapper.find(_MyAccountConsentsStyled.CheckboxStyled).at(1).simulate('click');
      expect(wrapper.state('updatedConsents')).toEqual(correctState);
    });
  });
});