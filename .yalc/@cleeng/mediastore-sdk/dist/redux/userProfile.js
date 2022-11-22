"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCaptureOption = exports.setUserCapture = exports.setCurrentUser = exports.setConsentsError = exports.setConsents = exports.default = exports.UPDATE_CAPTURE_OPTION = exports.SET_USER_CAPTURE = exports.SET_CURRENT_USER = exports.SET_CONSENTS_ERROR = exports.SET_CONSENTS = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toolkit = require("@reduxjs/toolkit");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SET_CURRENT_USER = 'SET_CURRENT_USER';
exports.SET_CURRENT_USER = SET_CURRENT_USER;
var setCurrentUser = (0, _toolkit.createAction)(SET_CURRENT_USER);
exports.setCurrentUser = setCurrentUser;
var SET_USER_CAPTURE = 'SET_USER_CAPTURE';
exports.SET_USER_CAPTURE = SET_USER_CAPTURE;
var setUserCapture = (0, _toolkit.createAction)(SET_USER_CAPTURE);
exports.setUserCapture = setUserCapture;
var UPDATE_CAPTURE_OPTION = 'UPDATE_CAPTURE_OPTION';
exports.UPDATE_CAPTURE_OPTION = UPDATE_CAPTURE_OPTION;
var updateCaptureOption = (0, _toolkit.createAction)(UPDATE_CAPTURE_OPTION);
exports.updateCaptureOption = updateCaptureOption;
var SET_CONSENTS = 'SET_CONSENTS';
exports.SET_CONSENTS = SET_CONSENTS;
var setConsents = (0, _toolkit.createAction)(SET_CONSENTS);
exports.setConsents = setConsents;
var SET_CONSENTS_ERROR = 'SET_CONSENTS_ERROR';
exports.SET_CONSENTS_ERROR = SET_CONSENTS_ERROR;
var setConsentsError = (0, _toolkit.createAction)(SET_CONSENTS_ERROR);
exports.setConsentsError = setConsentsError;
var initialState = {
  user: null,
  capture: null,
  consents: [],
  consentsError: ''
};
var userProfileReducer = (0, _toolkit.createReducer)(initialState, {
  SET_CURRENT_USER: function SET_CURRENT_USER(state, action) {
    state.user = action.payload;
  },
  SET_USER_CAPTURE: function SET_USER_CAPTURE(state, action) {
    state.capture = action.payload;
  },
  UPDATE_CAPTURE_OPTION: function UPDATE_CAPTURE_OPTION(state, action) {
    var newState = _objectSpread(_objectSpread({}, state.capture), {}, {
      settings: state.capture.settings.map(function (setting) {
        if (setting.key === action.payload.key) {
          return _objectSpread(_objectSpread({}, setting), {}, {
            answer: action.payload.value
          });
        }
        return setting;
      })
    });
    state.capture = newState;
  },
  SET_CONSENTS: function SET_CONSENTS(state, action) {
    state.consents = action.payload;
  },
  SET_CONSENTS_ERROR: function SET_CONSENTS_ERROR(state, action) {
    state.consentsError = action.payload;
  }
});
var _default = userProfileReducer;
exports.default = _default;