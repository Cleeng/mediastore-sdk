"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

require("jest-styled-components");

var _SubscriptionManagement = require("./SubscriptionManagement");

var _SubscriptionManagementStyled = require("./SubscriptionManagementStyled");

/* eslint-disable react/jsx-props-no-spreading */
describe('<MessageBox/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.PureSubscriptionManagement, null));
      expect(wrapper.find(_SubscriptionManagementStyled.ManageButtonWrapStyled)).toHaveLength(1);
      expect(wrapper.find(_SubscriptionManagementStyled.SubscriptionActionsStyled)).toHaveLength(1);
    });
    it('should render children when isOpened prop is true', function () {
      // eslint-disable-next-line react/jsx-boolean-value
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.PureSubscriptionManagement, {
        isOpened: true
      }));
      expect(wrapper.find(_SubscriptionManagementStyled.SubscriptionActionsStyled)).toHaveLength(1);
    });
  });
});