"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = void 0;
var _reactRedux = require("react-redux");
var _paymentInfo = require("../../redux/paymentInfo");
var _TransactionList = _interopRequireDefault(require("./TransactionList.component"));
var mapStateToProps = function mapStateToProps(state) {
  return {
    paymentInfo: state.paymentInfo
  };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
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
    }
  };
};
exports.mapDispatchToProps = mapDispatchToProps;
var PlanDetailsContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TransactionList.default);
var _default = PlanDetailsContainer;
exports.default = _default;