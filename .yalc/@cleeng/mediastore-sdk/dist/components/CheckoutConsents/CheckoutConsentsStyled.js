"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckoutConsentsTitleStyled = exports.CheckoutConsentsSubTitleStyled = exports.CheckoutConsentsStyled = exports.CheckoutConsentsListStyled = exports.CheckoutConsentsError = exports.CheckoutConsentsContentStyled = exports.CheckoutConsentsCheckbox = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CheckoutConsentsStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__consents'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n  background: ", ";\n"])), colors.BackgroundColor);
exports.CheckoutConsentsStyled = CheckoutConsentsStyled;
var CheckoutConsentsContentStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__consents__wrapper'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 55%;\n  margin: 0 auto;\n  padding-top: 80px;\n  padding-bottom: 120px;\n\n  text-align: center;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  width: 80%;\n"]))));
exports.CheckoutConsentsContentStyled = CheckoutConsentsContentStyled;
var CheckoutConsentsTitleStyled = _styledComponents.default.h3.attrs(function () {
  return {
    className: 'msd__consents__title'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 16px;\n  font-size: 16px;\n  line-height: 22px;\n  text-align: center;\n  font-weight: 700;\n\n  color: ", ";\n"])), colors.FontColor);
exports.CheckoutConsentsTitleStyled = CheckoutConsentsTitleStyled;
var CheckoutConsentsSubTitleStyled = _styledComponents.default.h4.attrs(function () {
  return {
    className: 'msd__consents__subtitle'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 16px;\n  font-size: 13px;\n  line-height: 22px;\n  text-align: center;\n  font-weight: 700;\n\n  color: ", ";\n  filter: brightness(1.7);\n"])), colors.FontColor);
exports.CheckoutConsentsSubTitleStyled = CheckoutConsentsSubTitleStyled;
var CheckoutConsentsListStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__consents__list'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 36px;\n"])));
exports.CheckoutConsentsListStyled = CheckoutConsentsListStyled;
var CheckoutConsentsCheckbox = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)([""])));
exports.CheckoutConsentsCheckbox = CheckoutConsentsCheckbox;
var CheckoutConsentsError = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__consents__error'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n  margin-top: 8px;\n  content: '';\n  color: ", ";\n  transition: 0.2s ease-in-out;\n  font-size: 13px;\n  text-align: left;\n\n  ", "\n"])), colors.ErrorColor, function (props) {
  return props.center && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      text-align: center;\n    "])));
});
exports.CheckoutConsentsError = CheckoutConsentsError;