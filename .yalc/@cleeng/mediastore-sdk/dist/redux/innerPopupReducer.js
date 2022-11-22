"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInnerPopup = exports.hideInnerPopup = exports.default = exports.SHOW_INNER_POPUP = exports.POPUP_TYPES = exports.HIDE_INNER_POPUP = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

var POPUP_TYPES = {
  editPassword: 'editPassword',
  paymentDetails: 'paymentDetails',
  updateSubscription: 'updateSubscription',
  switchPlan: 'switchPlan',
  cancelSwitch: 'cancelSwitch'
};
exports.POPUP_TYPES = POPUP_TYPES;
var SHOW_INNER_POPUP = 'SHOW_INNER_POPUP';
exports.SHOW_INNER_POPUP = SHOW_INNER_POPUP;
var showInnerPopup = (0, _toolkit.createAction)(SHOW_INNER_POPUP);
exports.showInnerPopup = showInnerPopup;
var HIDE_INNER_POPUP = 'HIDE_INNER_POPUP';
exports.HIDE_INNER_POPUP = HIDE_INNER_POPUP;
var hideInnerPopup = (0, _toolkit.createAction)(HIDE_INNER_POPUP);
exports.hideInnerPopup = hideInnerPopup;
var initialState = {
  isOpen: false,
  type: '',
  data: {}
};
var popupReducer = (0, _toolkit.createReducer)(initialState, {
  SHOW_INNER_POPUP: function SHOW_INNER_POPUP(state, action) {
    state.isOpen = true;
    state.type = action.payload.type;
    state.data = action.payload.data;
  },
  HIDE_INNER_POPUP: function HIDE_INNER_POPUP(state) {
    state.isOpen = false;
    state.type = '';
    state.data = {};
  }
});
var _default = popupReducer;
exports.default = _default;