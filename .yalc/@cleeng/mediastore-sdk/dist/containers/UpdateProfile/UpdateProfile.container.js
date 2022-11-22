"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.MyAccountContainer = void 0;
var _reactRedux = require("react-redux");
var _userProfile = require("../../redux/userProfile");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _UpdateProfile = _interopRequireDefault(require("./UpdateProfile.component"));
var mapStateToProps = function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError,
    innerPopup: state.innerPopup
  };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: function setCurrentUser(currentUser) {
      dispatch((0, _userProfile.setCurrentUser)(currentUser));
    },
    setUserCapture: function setUserCapture(capture) {
      dispatch((0, _userProfile.setUserCapture)(capture));
    },
    updateCaptureOption: function updateCaptureOption(payload) {
      dispatch((0, _userProfile.updateCaptureOption)(payload));
    },
    setConsents: function setConsents(consents) {
      dispatch((0, _userProfile.setConsents)(consents));
    },
    showInnerPopup: function showInnerPopup(payload) {
      dispatch((0, _innerPopupReducer.showInnerPopup)(payload));
    },
    hideInnerPopup: function hideInnerPopup() {
      dispatch((0, _innerPopupReducer.hideInnerPopup)());
    }
  };
};
exports.mapDispatchToProps = mapDispatchToProps;
var MyAccountContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_UpdateProfile.default);
exports.MyAccountContainer = MyAccountContainer;
var _default = MyAccountContainer;
exports.default = _default;