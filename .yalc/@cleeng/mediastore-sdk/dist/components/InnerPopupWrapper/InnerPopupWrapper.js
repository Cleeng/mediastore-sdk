"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _InnerPopupWrapperStyled = require("./InnerPopupWrapperStyled");
var InnerPopupWrapper = function InnerPopupWrapper(_ref) {
  var steps = _ref.steps,
    popupTitle = _ref.popupTitle,
    currentStep = _ref.currentStep,
    children = _ref.children,
    isError = _ref.isError;
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.CardStyled, null, isError ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    generalError: true,
    centered: true
  }) : /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.HeaderStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.DotsWrapperStyled, {
    currentStep: currentStep
  }, steps > 1 && Array.from({
    length: steps
  }, function (_, k) {
    return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.DotStyled, {
      key: k
    });
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.HeaderTitleStyled, null, popupTitle)), children));
};
InnerPopupWrapper.propTypes = {
  steps: _propTypes.default.number.isRequired,
  popupTitle: _propTypes.default.string,
  currentStep: _propTypes.default.number.isRequired,
  children: _propTypes.default.node.isRequired,
  isError: _propTypes.default.bool
};
InnerPopupWrapper.defaultProps = {
  popupTitle: '',
  isError: false
};
var _default = InnerPopupWrapper;
exports.default = _default;