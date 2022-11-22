"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStyled = exports.InputElementWrapperStyled = exports.InputElementStyled = exports.InputComponentStyled = exports.CloseButtonStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var Colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _InputConstants = require("../Input/InputConstants");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var InputComponentStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__coupon-input__wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n\n  max-width: 300px;\n\n  ", ";\n"])), function (props) {
  return props.fullWidth && props.isOpened && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      max-width: 100%;\n      width: 100%;\n    "])));
});
exports.InputComponentStyled = InputComponentStyled;
var MessageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__coupon-input__message'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  border-radius: 5px;\n\n  font-size: 12px;\n\n  opacity: ", ";\n  transition: opacity 250ms linear;\n"])), function (props) {
  return props.messageType === _InputConstants.MESSAGE_TYPE_SUCCESS ? Colors.ConfirmColor : Colors.ErrorColor;
}, function (props) {
  return props.showMessage ? 1 : 0;
});
exports.MessageStyled = MessageStyled;
var InputElementWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__coupon-input__wrapper--inner'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  margin-bottom: 8px;\n\n  border: 1px solid ", ";\n  border-radius: 30px;\n\n  background: white;\n  transition: 0.2s ease-in-out;\n"])), Colors.LineColor);
exports.InputElementWrapperStyled = InputElementWrapperStyled;
var InputElementStyled = _styledComponents.default.input.attrs(function () {
  return {
    className: 'msd__coupon-input__input'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 1;\n  position: relative;\n  width: 0px;\n\n  padding: 0;\n\n  border: none;\n  outline: none;\n\n  font-size: 15px;\n  line-height: 1.3;\n  ", "\n\n  ", "\n"])), function (props) {
  return props.isOpened && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      width: 198px;\n      max-width: 198px;\n      left: 37px;\n      padding-right: 25px;\n      ", "\n\n      ", "\n    "])), _BreakPoints.media.small(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n        width: 100%;\n        max-width: 100%;\n      "]))), props.fullWidth && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n          width: 100%;\n          max-width: 100%;\n        "]))));
}, function (props) {
  return props.readOnly && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.5;\n    "])));
});
exports.InputElementStyled = InputElementStyled;
var CloseButtonStyled = _styledComponents.default.button.attrs(function () {
  return {
    className: 'msd__coupon-input__close'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  height: 22px;\n  width: 22px;\n  top: 50%;\n  left: 7px;\n  transform: translate(0, -50%);\n  background-color: ", ";\n  opacity: 0;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n\n  svg {\n    transform: scale(0.3);\n    fill: ", ";\n  }\n\n  ", "\n"])), Colors.PrimaryColor, Colors.White, function (props) {
  return props.isInputOpened && (0, _styledComponents.css)(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 1;\n    "])));
});
exports.CloseButtonStyled = CloseButtonStyled;