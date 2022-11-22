"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = void 0;
var _reactRedux = require("react-redux");
var _planDetails = require("../../redux/planDetails");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _PlanDetails = _interopRequireDefault(require("./PlanDetails.component"));
var mapStateToProps = function mapStateToProps(state) {
  return {
    planDetails: state.planDetails,
    updateList: state.updateList,
    innerPopup: state.innerPopup
  };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlan: function setCurrentPlan(currentPlan) {
      dispatch((0, _planDetails.setCurrentPlan)(currentPlan));
    },
    updateList: function updateList() {
      dispatch((0, _planDetails.updateList)());
    },
    showInnerPopup: function showInnerPopup(payload) {
      dispatch((0, _innerPopupReducer.showInnerPopup)(payload));
    },
    hideInnerPopup: function hideInnerPopup() {
      dispatch((0, _innerPopupReducer.hideInnerPopup)());
    },
    setOfferToSwitch: function setOfferToSwitch(payload) {
      dispatch((0, _planDetails.setOfferToSwitch)(payload));
    },
    setSwitchSettings: function setSwitchSettings(payload) {
      dispatch((0, _planDetails.setSwitchSettings)(payload));
      dispatch((0, _planDetails.populateSwitchTitle)());
    },
    setSwitchDetails: function setSwitchDetails(payload) {
      dispatch((0, _planDetails.setSwitchDetails)(payload));
      dispatch((0, _planDetails.populateSwitchTitle)());
    }
  };
};
exports.mapDispatchToProps = mapDispatchToProps;
var PlanDetailsContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_PlanDetails.default);
var _default = PlanDetailsContainer;
exports.default = _default;