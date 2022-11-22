"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveLinkStyled = exports.PopupImageStyled = exports.PaymentMethodTitleStyled = exports.PaymentMethodTextStyled = exports.PaymentMethodStyled = exports.PaymentMethodIconStyled = exports.PaymentMethodDescStyled = exports.PPIconStyled = exports.ImageWrapper = exports.ErrorMessage = exports.DeleteIconStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
var PPIcon = function PPIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M9.438 22.019H6.655a.826.826 0 0 1-.839-1.058l.134-.6h1.856A1.431 1.431 0 0 0 9.135 19.3l.954-4.117a1.434 1.434 0 0 1 1.327-1.058h.791q5.1 0 7.926-2.1a6.529 6.529 0 0 0 2.833-5.5 5.266 5.266 0 0 0-.527-2.5c0-.014-.014-.028-.014-.041l.121.067a4.146 4.146 0 0 1 1.534 1.627 5.228 5.228 0 0 1 .536 2.5 6.513 6.513 0 0 1-2.837 5.5c-1.883 1.385-4.533 2.084-7.921 2.084h-.806a1.432 1.432 0 0 0-1.331 1.063l-.954 4.129A1.42 1.42 0 0 1 9.447 22l-.009.019zm-2.401-2.42H4.253a.827.827 0 0 1-.839-1.057L7.335 1.56A1.43 1.43 0 0 1 8.663.5h5.8a18.264 18.264 0 0 1 3.271.259 6.875 6.875 0 0 1 2.407.888 4.133 4.133 0 0 1 1.522 1.63 5.4 5.4 0 0 1 .524 2.508 6.474 6.474 0 0 1-2.84 5.486c-1.883 1.4-4.533 2.086-7.923 2.086h-.793a1.429 1.429 0 0 0-1.325 1.048l-.951 4.115a1.43 1.43 0 0 1-1.332 1.05l.014.03zm6.677-15.57h-.909a1.427 1.427 0 0 0-1.327 1.056l-.831 3.605a.824.824 0 0 0 .834 1.057h.687a5.857 5.857 0 0 0 3.5-.915 3.053 3.053 0 0 0 1.251-2.611 1.839 1.839 0 0 0-.807-1.65 4.349 4.349 0 0 0-2.408-.542h.017-.007z"
  })));
};
PPIcon.defaultProps = {
  width: "28",
  height: "22.519",
  xmlns: "http://www.w3.org/2000/svg"
};
var DeleteIcon = function DeleteIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M.982 15.712a1.97 1.97 0 0 0 1.964 1.964H10.8a1.97 1.97 0 0 0 1.964-1.964V3.928H.982ZM13.748.982h-3.437L9.329 0h-4.91l-.982.982H0v1.964h13.748Z",
    fill: "#cb4477"
  }));
};
DeleteIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "13.748",
  height: "17.676"
};
var PaymentMethodStyled = _styledComponents.default.button.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  max-width: 350px;\n  margin: auto auto 15px auto;\n  padding: 30px;\n\n  border: 1px solid ", ";\n  border-radius: 12px;\n  background: transparent;\n\n  color: ", ";\n  text-align: left;\n  cursor: pointer;\n  &:active {\n    border: 1px solid ", ";\n  }\n  &:hover {\n    border: 1px solid ", ";\n  }\n"])), _variables.LineColor, _variables.FontColor, _variables.LineColor, _variables.FontColor);
exports.PaymentMethodStyled = PaymentMethodStyled;
var PaymentMethodTextStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: 20px;\n"])));
exports.PaymentMethodTextStyled = PaymentMethodTextStyled;
var PaymentMethodTitleStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method-title'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 600;\n  margin-bottom: 10px;\n  font-size: 14px;\n  width: 100%;\n"])));
exports.PaymentMethodTitleStyled = PaymentMethodTitleStyled;
var PaymentMethodDescStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method-description'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 300;\n  font-size: 12px;\n"])));
exports.PaymentMethodDescStyled = PaymentMethodDescStyled;
var PaymentMethodIconStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method-icon'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  path {\n    fill: ", ";\n  }\n"])), _variables.FontColor);
exports.PaymentMethodIconStyled = PaymentMethodIconStyled;
var ImageWrapper = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method-img'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  margin: 0 auto 40px auto;\n"])));
exports.ImageWrapper = ImageWrapper;
var PPIconStyled = (0, _styledComponents.default)(function (props) {
  return /*#__PURE__*/_react.default.createElement(PPIcon, props);
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  margin-right: 10px;\n  filter: brightness(0) invert(1);\n"])));
exports.PPIconStyled = PPIconStyled;
var ErrorMessage = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__popup-content__erro'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  color: ", ";\n  margin: 10px 0;\n  text-align: center;\n"])), _variables.ErrorColor);
exports.ErrorMessage = ErrorMessage;
var RemoveLinkStyled = _styledComponents.default.a.attrs(function () {
  return {
    className: 'msd__popup-content__error-link'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-decoration: underline;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 15px;\n  &:hover {\n    text-decoration: underline;\n  }\n"])), _variables.ErrorColor);
exports.RemoveLinkStyled = RemoveLinkStyled;
var DeleteIconStyled = (0, _styledComponents.default)(function (props) {
  return /*#__PURE__*/_react.default.createElement(DeleteIcon, props);
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  margin-right: 10px;\n  font-size: 9px;\n"])));
exports.DeleteIconStyled = DeleteIconStyled;
var PopupImageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__payment-method-image'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  border-radius: 10px;\n  padding: 15px 25px;\n  max-width: 100px;\n  margin: auto auto 30px auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])), _variables.LineColor);
exports.PopupImageStyled = PopupImageStyled;