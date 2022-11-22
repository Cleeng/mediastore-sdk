"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MethodNameStyled = exports.CardWrapStyled = exports.CardTypeStyled = exports.CardStyled = exports.CardNumberStyled = exports.CardExpirationStyled = exports.CardExpirationLabel = exports.CardExpirationDateStyled = exports.CardEditStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CardStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-card'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  height: 160px;\n\n  background-color: ", ";\n  border-radius: 20px;\n\n  overflow: hidden;\n\n  &:after {\n    position: absolute;\n    left: 30%;\n    bottom: -10px;\n    display: block;\n    content: '';\n\n    height: 400px;\n    width: 400px;\n\n    border-radius: 50%;\n    background-color: ", ";\n  }\n"])), _variables.MyAccountBlue, _variables.CardSecondaryColor);
exports.CardStyled = CardStyled;
var CardTypeStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-card__type'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  left: 16px;\n  top: 16px;\n  height: 35px;\n  z-index: 2;\n\n  svg {\n    height: 100%;\n    width: auto;\n  }\n"])));
exports.CardTypeStyled = CardTypeStyled;
var CardNumberStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-card__number'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 28px;\n  right: 16px;\n  color: ", ";\n  font-size: 12px;\n  z-index: 2;\n"])), _variables.White);
exports.CardNumberStyled = CardNumberStyled;
var CardExpirationStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-data__wrapper'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 20px;\n  left: 16px;\n  color: ", ";\n  font-size: 12px;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n"])), _variables.White);
exports.CardExpirationStyled = CardExpirationStyled;
var CardExpirationLabel = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-data__label'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 10px;\n  margin-bottom: 4px;\n  z-index: 2;\n"])), _variables.IconsColor);
exports.CardExpirationLabel = CardExpirationLabel;
var CardExpirationDateStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-data__value'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 12px;\n  z-index: 2;\n  max-width: 100px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"])), _variables.White);
exports.CardExpirationDateStyled = CardExpirationDateStyled;
var CardEditStyled = _styledComponents.default.button.attrs(function () {
  return {
    className: 'msd__payment-method__button'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 18px;\n  right: 16px;\n  color: ", ";\n  z-index: 2;\n\n  padding: 9px 14px;\n  background-color: ", ";\n  font-size: 11px;\n  font-weight: 600;\n  border-radius: 17px;\n  border: 0;\n  box-shadow: 0px 3px 50px #00000014;\n\n  &:hover {\n    cursor: pointer;\n  }\n"])), _variables.White, _variables.ConfirmColor);
exports.CardEditStyled = CardEditStyled;
var CardWrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-card__wrapper'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  width: 265px;\n  font-family: Arial, Helvetica, sans-serif;\n\n  ", "\n"])), function (props) {
  return props.type !== '' && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      ", " {\n        background-color: ", ";\n\n        &:after {\n          background-color: ", ";\n        }\n      }\n    "])), CardStyled, _variables.paymentMethodColors["".concat(props.type, "FontColor")], _variables.paymentMethodColors["".concat(props.type, "SecondaryColor")]);
});
exports.CardWrapStyled = CardWrapStyled;
var MethodNameStyled = _styledComponents.default.strong(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  text-transform: capitalize;\n"])));
exports.MethodNameStyled = MethodNameStyled;