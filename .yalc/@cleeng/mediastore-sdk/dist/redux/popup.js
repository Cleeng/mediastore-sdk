"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPopup = exports.hidePopup = exports.default = exports.SHOW_POPUP = exports.HIDE_POPUP = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

var SHOW_POPUP = 'SHOW_POPUP';
exports.SHOW_POPUP = SHOW_POPUP;
var showPopup = (0, _toolkit.createAction)(SHOW_POPUP);
exports.showPopup = showPopup;
var HIDE_POPUP = 'HIDE_POPUP';
exports.HIDE_POPUP = HIDE_POPUP;
var hidePopup = (0, _toolkit.createAction)(HIDE_POPUP);
exports.hidePopup = hidePopup;
var initialState = {
  isPopupShown: false,
  popupType: '',
  consents: []
};
var popupReducer = (0, _toolkit.createReducer)(initialState, {
  SHOW_POPUP: function SHOW_POPUP(state, action) {
    state.isPopupShown = true;
    state.popupType = action.payload.type;
    state.consents = action.payload.consents;
  },
  HIDE_POPUP: function HIDE_POPUP(state) {
    state.isPopupShown = false;
  }
});
var _default = popupReducer;
exports.default = _default;