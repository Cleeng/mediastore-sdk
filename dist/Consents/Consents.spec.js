"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _Checkbox = _interopRequireDefault(require("components/Checkbox"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _getConsents = _interopRequireDefault(require("api/Publisher/getConsents"));

var _Consents = _interopRequireDefault(require("./Consents"));

var _ConsentsStyled = require("./ConsentsStyled");

require("jest-styled-components");

var mockConsent = [{
  name: 'name',
  version: '1',
  required: false,
  label: '<a>Terms</a>'
}];
var mockConsentWithoutTag = [{
  name: 'name2',
  version: '2',
  required: false,
  label: 'No tags'
}];
var mockConsentDefinitions = [{
  name: 'name',
  version: '1',
  required: false
}];
var mockConsentsLabels = ['<a>Terms</a>'];
var mockConsentsLabelsAfterRegex = ['{{htmltag}}Terms{{endhtmltag}}'];
var mockConsentsLabelsAfterRegexWithoutTags = ['No tags'];
var mockPublisherId = '123456789';
jest.mock('api/Publisher/getConsents');
describe('<Consents/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Consents.default, null));
      var loader = wrapper.find(_Loader.default);
      expect(loader).toHaveLength(1);
    });
    it('should render consents after fetching', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Consents.default, null));
      wrapper.setState({
        consentLoaded: true,
        consentDefinitions: mockConsent,
        consentsLabels: mockConsentsLabels,
        checked: [false]
      });
      expect(wrapper.exists('Checkbox')).toBe(true);
      expect(wrapper.find(_Checkbox.default)).toHaveLength(1);
      expect(wrapper.find(_Checkbox.default).props().checked).toEqual(false);
      expect(wrapper.find(_Checkbox.default).props().required).toEqual(mockConsent[0].required);
      expect(wrapper.find(_Checkbox.default).props().children).toEqual(mockConsentsLabels[0]);
    });
    it('should render error', function () {
      var errorValue = 'error text';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Consents.default, {
        error: errorValue
      }));
      expect(wrapper.find(_ConsentsStyled.ConsentsErrorStyled).exists()).toBe(true);
      expect(wrapper.find(_ConsentsStyled.ConsentsErrorStyled).text()).toEqual(errorValue);
    });
  });
  describe('@lifecycle', function () {
    describe('constructor', function () {
      it('should set default state values', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Consents.default, null));
        expect(wrapper.state().consentDefinitions).toEqual([]);
        expect(wrapper.state().consentsLabels).toEqual([]);
        expect(wrapper.state().checked).toEqual([]);
        expect(wrapper.state().consentLoaded).toBe(false);
      });
    });
    describe('componentDidMount', function () {
      it('should get consents definitions and init values', function (done) {
        _getConsents.default.mockResolvedValue({
          responseData: {
            consents: mockConsent
          }
        }); // simulate publisherId setup with delay


        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Consents.default, {
          publisherId: ""
        }));
        wrapper.setProps({
          publisherId: mockPublisherId
        });
        wrapper.update();
        expect(_getConsents.default).toHaveBeenCalled();
        setImmediate(function () {
          expect(wrapper.state().consentDefinitions).toEqual(mockConsentDefinitions);
          expect(wrapper.state().consentLoaded).toBe(true);
          expect(wrapper.state().checked).toEqual([false]);
          expect(wrapper.state().consentsLabels).toEqual(mockConsentsLabelsAfterRegex);
          done();
        });
      });
      it('should translate consents without tags', function (done) {
        _getConsents.default.mockResolvedValue({
          responseData: {
            consents: mockConsentWithoutTag
          }
        });

        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Consents.default, {
          publisherId: ""
        }));
        wrapper.setProps({
          publisherId: mockPublisherId
        });
        wrapper.update();
        expect(_getConsents.default).toHaveBeenCalled();
        setImmediate(function () {
          expect(wrapper.state().consentLoaded).toBe(true);
          expect(wrapper.state().checked).toEqual([false]);
          expect(wrapper.state().consentsLabels).toEqual(mockConsentsLabelsAfterRegexWithoutTags);
          done();
        });
      });
      it('should catch error when fetch failed', function (done) {
        _getConsents.default.mockRejectedValue(new Error('Error'));

        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Consents.default, {
          publisherId: ""
        }));
        wrapper.setProps({
          publisherId: mockPublisherId
        });
        wrapper.update();
        expect(_getConsents.default).toHaveBeenCalled();
        setImmediate(function () {
          expect(wrapper.state().consentDefinitions).toEqual([]);
          expect(wrapper.state().consentLoaded).toBe(false);
          expect(wrapper.state().consentsLabels).toEqual([]);
          done();
        });
      });
    });
    describe('actions', function () {
      it('change consent state on click', function () {
        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Consents.default, null));
        wrapper.setState({
          consentLoaded: true,
          consentDefinitions: mockConsent,
          consentsLabels: mockConsentsLabels,
          checked: [false]
        });
        expect(wrapper.exists('Checkbox')).toBe(true);
        expect(wrapper.find(_Checkbox.default)).toHaveLength(1);
        expect(wrapper.state().checked[0]).toEqual(false);
        wrapper.find(_Checkbox.default).simulate('click');
        expect(wrapper.state().checked[0]).toEqual(true);
      });
    });
  });
});