"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setData = exports.removeData = exports.default = exports.SET_DATA = exports.REMOVE_DATA = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

var SET_DATA = 'SET_DATA';
exports.SET_DATA = SET_DATA;
var setData = (0, _toolkit.createAction)(SET_DATA);
exports.setData = setData;
var REMOVE_DATA = 'REMOVE_DATA';
exports.REMOVE_DATA = REMOVE_DATA;
var removeData = (0, _toolkit.createAction)(REMOVE_DATA);
exports.removeData = removeData;
var initialState = {
  CLEENG_OFFER_ID: '',
  CLEENG_PUBLISHER_ID: '',
  CLEENG_AUTH_TOKEN: '',
  CLEENG_ORDER_ID: '',
  CLEENG_PAYMENT_METHOD_ID: '',
  CLEENG_CUSTOMER_EMAIL: '',
  CLEENG_HOSTED: '',
  CLEENG_HEADER_OFF: ''
};
var appConfig = (0, _toolkit.createReducer)(initialState, {
  SET_DATA: function SET_DATA(state, action) {
    state[action.payload.name] = action.payload.value;
  },
  REMOVE_DATA: function REMOVE_DATA(state, action) {
    state[action.payload.name] = '';
  }
});
var _default = appConfig;
exports.default = _default;