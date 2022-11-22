"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InnerPopupWrapperStyled = require("../../InnerPopupWrapper/InnerPopupWrapperStyled");
var _Button = _interopRequireDefault(require("../../Button"));
var _reactI18next = require("react-i18next");
var _UpdatePaymentDetailsPopupStyled = require("../UpdatePaymentDetailsPopupStyled");
var CheckmackIcon = function CheckmackIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    fill: "red"
  }, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M93.648 5.464h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762z"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M99.956 5.464h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762z"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M96.016 3.096a.761.761 0 0 1-.762-.762V.762A.761.761 0 0 1 96.016 0a.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762z"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M96.016 9.405a.761.761 0 0 1-.762-.762V7.07a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762z"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "m4.437 65.45-1.111-1.112a.762.762 0 0 1 0-1.078.762.762 0 0 1 1.077 0l1.112 1.112a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.078 0z"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "m8.898 69.91-1.112-1.112a.762.762 0 0 1 0-1.077.762.762 0 0 1 1.078 0l1.111 1.111a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.077 0z"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M7.784 65.45a.762.762 0 0 1 0-1.077l1.111-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078L8.861 65.45a.762.762 0 0 1-1.077 0z"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M3.323 69.91a.762.762 0 0 1 0-1.077l1.112-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078L4.4 69.911a.762.762 0 0 1-1.078 0z"
  }))))), /*#__PURE__*/_react.default.createElement("g", {
    stroke: "#838eaa",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    r: "3",
    cy: "8.838",
    cx: "9.471"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    r: "2.5",
    cy: "8.838",
    cx: "9.471"
  })), /*#__PURE__*/_react.default.createElement("g", {
    stroke: "#838eaa",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    r: "3",
    cy: "62.838",
    cx: "96.471"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    r: "2.5",
    cy: "62.838",
    cx: "96.471"
  }))))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#4eb7a1",
    d: "M71.684 20.127a1.733 1.733 0 0 0-2.451 0l-20.8 20.743-7.5-8.15a1.734 1.734 0 1 0-2.551 2.349l8.726 9.477a1.732 1.732 0 0 0 1.238.559h.037a1.735 1.735 0 0 0 1.224-.506l22.075-22.018a1.733 1.733 0 0 0 .002-2.454z"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#4eb7a1",
    d: "M71.266 35.104a1.734 1.734 0 0 0-1.733 1.734A19.533 19.533 0 1 1 50 17.305a1.734 1.734 0 1 0 0-3.467 23 23 0 1 0 23 23 1.734 1.734 0 0 0-1.734-1.734z"
  })))));
};
CheckmackIcon.defaultProps = {
  width: "100.718",
  height: "73.237",
  xmlns: "http://www.w3.org/2000/svg",
  color: "red"
};
var Success = function Success(_ref) {
  var hideInnerPopup = _ref.hideInnerPopup;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(CheckmackIcon, null)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Success')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Your payment details have been updated'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return hideInnerPopup();
    }
  }, t('Back to Payment Details'))));
};
Success.propTypes = {
  hideInnerPopup: _propTypes.default.func
};
Success.defaultProps = {
  hideInnerPopup: function hideInnerPopup() {}
};
var _default = Success;
exports.default = _default;