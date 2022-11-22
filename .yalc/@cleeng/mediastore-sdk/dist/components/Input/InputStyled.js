"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPasswordVisibility = exports.StyledButton = exports.LabelStyled = exports.InputRequiredStyled = exports.InputElementWrapperStyled = exports.InputElementStyled = exports.InputComponentStyled = exports.ErrorWrapper = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var Colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var InputComponentStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n\n  padding: 10px;\n  width: 100%;\n"])));
exports.InputComponentStyled = InputComponentStyled;
var LabelStyled = _styledComponents.default.label.attrs(function () {
  return {
    className: 'msd__input__label'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 17px;\n  left: 14px;\n\n  margin: 0;\n  padding: 0 3px;\n\n  color: ", ";\n  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;\n\n  ", "\n\n  &::after {\n    position: absolute;\n    content: '';\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 15px;\n\n    background: ", ";\n\n    z-index: -1;\n    opacity: 0;\n  }\n\n  ", "\n\n  ", "\n"])), Colors.FontColor, function (props) {
  return props.withIcon && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      left: 40px;\n    "])));
}, Colors.BackgroundColor, function (props) {
  return props.hasValue && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      transform: translate(0, -25px) scaleY(0.9);\n      &::after {\n        opacity: 1;\n      }\n    "])));
}, function (props) {
  return props.hasValue && props.withIcon && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      transform: translate(-26px, -25px) scaleY(0.9);\n    "])));
});
exports.LabelStyled = LabelStyled;
var InputElementWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__input__wrapper'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n\n  padding: 13px 0 14px;\n\n  background: transparent;\n  border: 1px solid ", ";\n  transition: 0.2s ease-in-out;\n\n  &:focus-within {\n    border-color: ", ";\n    ", " {\n      color: ", ";\n      transform: translate(0, -25px) scaleY(0.9);\n      &::after {\n        opacity: 1;\n      }\n    }\n  }\n\n  ", ";\n"])), Colors.MediumGrey, Colors.ConfirmColor, LabelStyled, Colors.ConfirmColor, function (props) {
  return props.icon && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n      &::before {\n        content: url(", ");\n      }\n    "])), props.icon);
});
exports.InputElementWrapperStyled = InputElementWrapperStyled;
var InputElementStyled = _styledComponents.default.input.attrs(function () {
  return {
    className: 'msd__input'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 1;\n  position: relative;\n  width: auto;\n\n  margin: 0 15px;\n\n  color: ", ";\n  background: transparent;\n  border: none;\n  outline: none;\n\n  font-size: 15px;\n  line-height: 1.3;\n\n  &:focus + label {\n    transform: translate(0, -25px) scaleY(0.9);\n    color: ", ";\n    ", "\n    &::after {\n      opacity: 1;\n    }\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n"])), Colors.FontColor, Colors.ConfirmColor, function (props) {
  return props.withIcon && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n        transform: translate(-26px, -25px) scaleY(0.9);\n      "])));
}, function (props) {
  return props.floatingLabels === false && (0, _styledComponents.css)(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n      & + label {\n        transform: translate(0, -25px) scaleY(0.9);\n        &::after {\n          opacity: 1;\n        }\n      }\n    "])));
}, _BreakPoints.media.small(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n    width: 100%;\n  "]))), function (props) {
  return props.type === 'date' && (0, _styledComponents.css)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n      text-transform: uppercase;\n      &::-webkit-inner-spin-button,\n      &::-webkit-calendar-picker-indicator {\n        display: none;\n        -webkit-appearance: none;\n      }\n      & + label {\n        transform: translate(-26px, -25px) scaleY(0.9);\n        &::after {\n          opacity: 1;\n        }\n      }\n    "])));
});
exports.InputElementStyled = InputElementStyled;
var ErrorWrapper = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__error'
  };
})(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n  margin-top: 8px;\n\n  content: '';\n  color: ", ";\n  transition: 0.2s ease-in-out;\n\n  ", "\n\n  font-size: 13px;\n  text-align: left;\n\n  ", "\n"])), Colors.ErrorColor, function (props) {
  return props.passwordStrength && (0, _styledComponents.css)(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n      color: ", ";\n    "])), Colors[props.passwordStrength]);
}, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n      position: relative;\n      margin: 5px 0 10px 0;\n      top: unset;\n    "])));
});
exports.ErrorWrapper = ErrorWrapper;
var StyledPasswordVisibility = _styledComponents.default.img.attrs(function () {
  return {
    className: 'msd__icon--password'
  };
})(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n  height: 20px;\n  width: 20px;\n  filter: ", ";\n"])), Colors.TextFieldBorderFilter);
exports.StyledPasswordVisibility = StyledPasswordVisibility;
var StyledButton = _styledComponents.default.button(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\n  background: transparent;\n  border: none;\n  border-radius: 50%;\n  display: flex;\n  padding: 0;\n  position: relative;\n  margin-right: 15px;\n  &::after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    transform: scale(1.5);\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.08);\n    z-index: 0;\n    content: '';\n    border-radius: 50%;\n    opacity: 0;\n    transition: opacity 0.3s ease;\n  }\n  &:hover::after,\n  &:focus::after {\n    opacity: 1;\n  }\n"])));
exports.StyledButton = StyledButton;
var InputRequiredStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__icon__required--error'
  };
})(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  position: absolute;\n  right: 16px;\n  height: 9px;\n  font-size: 12px;\n  line-height: 12px;\n  top: 50%;\n  color: ", ";\n  transform: translate(0, -50%);\n  z-index: 1;\n"])), Colors.ErrorColor);
exports.InputRequiredStyled = InputRequiredStyled;