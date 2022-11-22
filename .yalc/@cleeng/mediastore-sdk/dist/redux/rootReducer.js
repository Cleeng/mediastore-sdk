"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _paymentInfo = _interopRequireDefault(require("./paymentInfo"));
var _planDetails = _interopRequireDefault(require("./planDetails"));
var _userProfile = _interopRequireDefault(require("./userProfile"));
var _popup = _interopRequireDefault(require("./popup"));
var _appConfig = _interopRequireDefault(require("./appConfig"));
var _innerPopupReducer = _interopRequireDefault(require("./innerPopupReducer"));
var rootReducer = (0, _toolkit.combineReducers)({
  paymentInfo: _paymentInfo.default,
  planDetails: _planDetails.default,
  userProfile: _userProfile.default,
  popup: _popup.default,
  appConfig: _appConfig.default,
  innerPopup: _innerPopupReducer.default
});
var _default = function _default(state, action) {
  return rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
};
exports.default = _default;