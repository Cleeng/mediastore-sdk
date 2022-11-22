"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.MyAccountContainer = void 0;
var _reactRedux = require("react-redux");
var _userProfile = require("../../redux/userProfile");
var _planDetails = require("../../redux/planDetails");
var _paymentInfo = require("../../redux/paymentInfo");
var _popup = require("../../redux/popup");
var _MyAccount = _interopRequireDefault(require("./MyAccount.component"));
var mapStateToProps = function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    planDetails: state.planDetails,
    consents: state.consents,
    popup: state.popup
  };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: function setCurrentUser(currentUser) {
      dispatch((0, _userProfile.setCurrentUser)(currentUser));
    },
    setCurrentPlan: function setCurrentPlan(currentPlan) {
      dispatch((0, _planDetails.setCurrentPlan)(currentPlan));
    },
    setConsents: function setConsents(consents) {
      dispatch((0, _userProfile.setConsents)(consents));
    },
    setConsentsError: function setConsentsError(msg) {
      dispatch((0, _userProfile.setConsentsError)(msg));
    },
    showPopup: function showPopup(type, consents) {
      dispatch((0, _popup.showPopup)(type, consents));
    },
    hidePopup: function hidePopup() {
      dispatch((0, _popup.hidePopup)());
    },
    setPublisherPaymentMethods: function setPublisherPaymentMethods(paymentMethodIds) {
      dispatch((0, _paymentInfo.setPublisherPaymentMethods)(paymentMethodIds));
    }
  };
};
exports.mapDispatchToProps = mapDispatchToProps;
var MyAccountContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_MyAccount.default);
exports.MyAccountContainer = MyAccountContainer;
var _default = MyAccountContainer;
exports.default = _default;