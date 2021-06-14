"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureInnerPopupWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _InnerPopupWrapperStyled = require("./InnerPopupWrapperStyled");

var InnerPopupWrapper = function InnerPopupWrapper(_ref) {
  var steps = _ref.steps,
      popupTitle = _ref.popupTitle,
      currentStep = _ref.currentStep,
      children = _ref.children,
      isError = _ref.isError,
      t = _ref.t;
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
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.HeaderTitleStyled, null, t(popupTitle))), children));
};

exports.PureInnerPopupWrapper = InnerPopupWrapper;
InnerPopupWrapper.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(InnerPopupWrapper));

exports.default = _default;