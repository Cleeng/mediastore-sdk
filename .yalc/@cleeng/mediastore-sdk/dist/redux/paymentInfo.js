"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransactionsToShow = exports.setTransactionsListAsFetched = exports.setTransactionsList = exports.setPublisherPaymentMethods = exports.setPaymentDetails = exports.hideShowMoreButton = exports.default = exports.SET_TRANSACTIONS_TO_SHOW = exports.SET_TRANSACTIONS_LIST_AS_FETCHED = exports.SET_TRANSACTIONS_LIST = exports.SET_PUBLISHER_PAYMENT_METHODS = exports.SET_PAYMENT_DETAILS = exports.HIDE_SHOW_MORE_BUTTON = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

var SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
exports.SET_PAYMENT_DETAILS = SET_PAYMENT_DETAILS;
var setPaymentDetails = (0, _toolkit.createAction)(SET_PAYMENT_DETAILS);
exports.setPaymentDetails = setPaymentDetails;
var SET_TRANSACTIONS_LIST = 'SET_TRANSACTIONS_LIST';
exports.SET_TRANSACTIONS_LIST = SET_TRANSACTIONS_LIST;
var setTransactionsList = (0, _toolkit.createAction)(SET_TRANSACTIONS_LIST);
exports.setTransactionsList = setTransactionsList;
var SET_TRANSACTIONS_TO_SHOW = 'SET_TRANSACTIONS_TO_SHOW';
exports.SET_TRANSACTIONS_TO_SHOW = SET_TRANSACTIONS_TO_SHOW;
var setTransactionsToShow = (0, _toolkit.createAction)(SET_TRANSACTIONS_TO_SHOW);
exports.setTransactionsToShow = setTransactionsToShow;
var SET_TRANSACTIONS_LIST_AS_FETCHED = 'SET_TRANSACTIONS_LIST_AS_FETCHED';
exports.SET_TRANSACTIONS_LIST_AS_FETCHED = SET_TRANSACTIONS_LIST_AS_FETCHED;
var setTransactionsListAsFetched = (0, _toolkit.createAction)(SET_TRANSACTIONS_LIST_AS_FETCHED);
exports.setTransactionsListAsFetched = setTransactionsListAsFetched;
var HIDE_SHOW_MORE_BUTTON = 'HIDE_SHOW_MORE_BUTTON';
exports.HIDE_SHOW_MORE_BUTTON = HIDE_SHOW_MORE_BUTTON;
var hideShowMoreButton = (0, _toolkit.createAction)(HIDE_SHOW_MORE_BUTTON);
exports.hideShowMoreButton = hideShowMoreButton;
var SET_PUBLISHER_PAYMENT_METHODS = 'SET_PUBLISHER_PAYMENT_METHODS';
exports.SET_PUBLISHER_PAYMENT_METHODS = SET_PUBLISHER_PAYMENT_METHODS;
var setPublisherPaymentMethods = (0, _toolkit.createAction)(SET_PUBLISHER_PAYMENT_METHODS);
exports.setPublisherPaymentMethods = setPublisherPaymentMethods;
var initialState = {
  paymentDetails: [],
  transactionsList: [],
  transactionsToShow: [],
  isTransactionListFetched: false,
  isShowMoreButtonHidden: false,
  activeOrBoundPaymentDetails: [],
  publisherPaymentMethods: null
};
var paymentMethodReducer = (0, _toolkit.createReducer)(initialState, {
  SET_PAYMENT_DETAILS: function SET_PAYMENT_DETAILS(state, action) {
    state.paymentDetails = action.payload;
    state.activeOrBoundPaymentDetails = action.payload.filter(function (item) {
      return item.active || item.bound;
    });
  },
  SET_TRANSACTIONS_LIST: function SET_TRANSACTIONS_LIST(state, action) {
    state.transactionsList = action.payload;
  },
  SET_TRANSACTIONS_TO_SHOW: function SET_TRANSACTIONS_TO_SHOW(state, action) {
    if (!action.payload) {
      state.transactionsToShow = (0, _toConsumableArray2.default)(state.transactionsList);
    } else {
      state.transactionsToShow = state.transactionsList.slice(0, action.payload);
    }
  },
  SET_TRANSACTIONS_LIST_AS_FETCHED: function SET_TRANSACTIONS_LIST_AS_FETCHED(state) {
    state.isTransactionListFetched = true;
  },
  HIDE_SHOW_MORE_BUTTON: function HIDE_SHOW_MORE_BUTTON(state) {
    state.isShowMoreButtonHidden = true;
  },
  SET_PUBLISHER_PAYMENT_METHODS: function SET_PUBLISHER_PAYMENT_METHODS(state, action) {
    state.publisherPaymentMethods = action.payload;
  }
});
var _default = paymentMethodReducer;
exports.default = _default;