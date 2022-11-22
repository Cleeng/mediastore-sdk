"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = void 0;
var _reactRedux = require("react-redux");
var _paymentInfo = require("../../redux/paymentInfo");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _PaymentInfo = _interopRequireDefault(require("./PaymentInfo.component"));
var mapStateToProps = function mapStateToProps(state) {
  return {
    paymentInfo: state.paymentInfo,
    innerPopup: state.innerPopup
  };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setPaymentDetails: function setPaymentDetails(newPaymentDetails) {
      dispatch((0, _paymentInfo.setPaymentDetails)(newPaymentDetails));
    },
    setTransactionsList: function setTransactionsList(newTransactionList) {
      dispatch((0, _paymentInfo.setTransactionsList)(newTransactionList));
    },
    setTransactionsToShow: function setTransactionsToShow(items) {
      dispatch((0, _paymentInfo.setTransactionsToShow)(items));
    },
    setTransactionsListAsFetched: function setTransactionsListAsFetched() {
      dispatch((0, _paymentInfo.setTransactionsListAsFetched)());
    },
    hideShowMoreButton: function hideShowMoreButton() {
      dispatch((0, _paymentInfo.hideShowMoreButton)());
    },
    showInnerPopup: function showInnerPopup(payload) {
      dispatch((0, _innerPopupReducer.showInnerPopup)(payload));
    },
    hideInnerPopup: function hideInnerPopup() {
      dispatch((0, _innerPopupReducer.hideInnerPopup)());
    },
    setPublisherPaymentMethods: function setPublisherPaymentMethods(payload) {
      dispatch((0, _paymentInfo.setPublisherPaymentMethods)(payload));
    }
  };
};
exports.mapDispatchToProps = mapDispatchToProps;
var PlanDetailsContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_PaymentInfo.default);
var _default = PlanDetailsContainer;
exports.default = _default;