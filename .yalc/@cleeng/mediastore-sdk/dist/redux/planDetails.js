"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateList = exports.setSwitchSettings = exports.setSwitchDetails = exports.setOfferToSwitch = exports.setCurrentPlan = exports.populateSwitchTitle = exports.default = exports.UPDATE_LIST = exports.SET_SWITCH_SETTINGS = exports.SET_SWITCH_DETAILS = exports.SET_OFFER_TO_SWITCH = exports.SET_CURRENT_PLAN = exports.POPULATE_SWITCH_TITLE = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toolkit = require("@reduxjs/toolkit");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SET_CURRENT_PLAN = 'SET_CURRENT_PLAN';
exports.SET_CURRENT_PLAN = SET_CURRENT_PLAN;
var setCurrentPlan = (0, _toolkit.createAction)(SET_CURRENT_PLAN);
exports.setCurrentPlan = setCurrentPlan;
var UPDATE_LIST = 'UPDATE_LIST';
exports.UPDATE_LIST = UPDATE_LIST;
var updateList = (0, _toolkit.createAction)(UPDATE_LIST);
exports.updateList = updateList;
var SET_OFFER_TO_SWITCH = 'SET_OFFER_TO_SWITCH';
exports.SET_OFFER_TO_SWITCH = SET_OFFER_TO_SWITCH;
var setOfferToSwitch = (0, _toolkit.createAction)(SET_OFFER_TO_SWITCH);
exports.setOfferToSwitch = setOfferToSwitch;
var SET_SWITCH_SETTINGS = 'SET_SWITCH_SETTINGS';
exports.SET_SWITCH_SETTINGS = SET_SWITCH_SETTINGS;
var setSwitchSettings = (0, _toolkit.createAction)(SET_SWITCH_SETTINGS);
exports.setSwitchSettings = setSwitchSettings;
var SET_SWITCH_DETAILS = 'SET_SWITCH_DETAILS';
exports.SET_SWITCH_DETAILS = SET_SWITCH_DETAILS;
var setSwitchDetails = (0, _toolkit.createAction)(SET_SWITCH_DETAILS);
exports.setSwitchDetails = setSwitchDetails;
var POPULATE_SWITCH_TITLE = 'POPULATE_SWITCH_TITLE';
exports.POPULATE_SWITCH_TITLE = POPULATE_SWITCH_TITLE;
var populateSwitchTitle = (0, _toolkit.createAction)(POPULATE_SWITCH_TITLE);
exports.populateSwitchTitle = populateSwitchTitle;
var initialState = {
  currentPlan: [],
  updateList: false,
  offerToSwitch: {},
  switchSettings: {},
  switchDetails: {}
};
var paymentDetailsReducer = (0, _toolkit.createReducer)(initialState, {
  SET_CURRENT_PLAN: function SET_CURRENT_PLAN(state, action) {
    state.currentPlan = action.payload;
  },
  UPDATE_LIST: function UPDATE_LIST(state) {
    state.updateList = !state.updateList;
  },
  SET_OFFER_TO_SWITCH: function SET_OFFER_TO_SWITCH(state, action) {
    state.offerToSwitch = action.payload;
  },
  SET_SWITCH_DETAILS: function SET_SWITCH_DETAILS(state, action) {
    var _action$payload = action.payload,
      details = _action$payload.details,
      type = _action$payload.type;
    if (type === 'delete') {
      delete state.switchDetails[details.pendingSwitchId];
    } else {
      state.switchDetails = Object.assign(state.switchDetails, details);
    }
  },
  SET_SWITCH_SETTINGS: function SET_SWITCH_SETTINGS(state, action) {
    state.switchSettings[action.payload.offerId] = action.payload.settings;
  },
  POPULATE_SWITCH_TITLE: function POPULATE_SWITCH_TITLE(state) {
    var switchesToFulfill = [];
    Object.keys(state.switchDetails).forEach(function (pendingSwitchId) {
      if (!state.switchDetails[pendingSwitchId].title) {
        switchesToFulfill.push(pendingSwitchId);
      }
    });
    if (switchesToFulfill.length && state.switchSettings) {
      switchesToFulfill.forEach(function (pendingSwitchId) {
        Object.keys(state.switchSettings).forEach(function (offerId) {
          var switchSettingsDetails = state.switchSettings[offerId].available.find(function (item) {
            return item.toOfferId === state.switchDetails[pendingSwitchId].toOfferId;
          });
          if (switchSettingsDetails) {
            var title = switchSettingsDetails.title;
            state.switchDetails[pendingSwitchId] = _objectSpread(_objectSpread({}, state.switchDetails[pendingSwitchId]), {}, {
              title: title
            });
          }
        });
      });
    }
  }
});
var _default = paymentDetailsReducer;
exports.default = _default;