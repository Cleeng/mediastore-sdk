"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.TitleStyled = exports.TextStyled = exports.MailStyled = exports.InnerWrapperStyled = exports.HeaderTitleStyled = exports.HeaderStyled = exports.DotsWrapperStyled = exports.DotStyled = exports.ContentStyled = exports.CardStyled = exports.ButtonWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _Card = _interopRequireDefault(require("../Card"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CardStyled = (0, _styledComponents.default)(_Card.default)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  height: 100%;\n  min-height: 500px;\n  display: flex;\n  padding: 0;\n  margin: 0;\n  ", ";\n"])), _variables.LineColor, _BreakPoints.media.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    align-items: flex-start;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100vh;\n    overflow-y: scroll;\n  "]))));
exports.CardStyled = CardStyled;
var WrapperStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  padding: 30px 30px 90px;\n  height: 100%;\n"])));
exports.WrapperStyled = WrapperStyled;
var DotsWrapperStyled = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  ", "\n"])), function (props) {
  return props.currentStep && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      span:nth-child(-n + ", ") {\n        background: ", ";\n      }\n    "])), props.currentStep, _variables.MyAccountMenuActive);
});
exports.DotsWrapperStyled = DotsWrapperStyled;
var HeaderStyled = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  color: ", ";\n  ", "\n"])), _variables.FontColor, _BreakPoints.media.small(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n    margin: 30px 0 0 0;\n  "]))));
exports.HeaderStyled = HeaderStyled;
var DotStyled = _styledComponents.default.span(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: ", ";\n  margin-right: 10px;\n"])), _variables.LineColor);
exports.DotStyled = DotStyled;
var HeaderTitleStyled = _styledComponents.default.h1(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 14px;\n  margin: 0;\n"])));
exports.HeaderTitleStyled = HeaderTitleStyled;
var ContentStyled = _styledComponents.default.div(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  margin: auto;\n  width: 80%;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n  "]))));
exports.ContentStyled = ContentStyled;
var TitleStyled = _styledComponents.default.h1(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 30px;\n  color: ", ";\n  font-weight: 700;\n\n  ", "\n\n  ", "\n"])), _variables.FontColor, _BreakPoints.media.small(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 27px;\n  "]))), function (props) {
  return props.step === 2 && (0, _styledComponents.css)(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n      font-size: 20px;\n      ", "\n    "])), _BreakPoints.media.small(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n        font-size: 20px;\n      "]))));
});
exports.TitleStyled = TitleStyled;
var TextStyled = _styledComponents.default.p(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  opacity: 0.8;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 24px 0;\n\n  ", "\n"])), _variables.FontColor, function (props) {
  return props.step === 2 && (0, _styledComponents.css)(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.6;\n    "])));
});
exports.TextStyled = TextStyled;
var MailStyled = _styledComponents.default.span(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 700;\n"])));
exports.MailStyled = MailStyled;
var InnerWrapperStyled = _styledComponents.default.div(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"])));
exports.InnerWrapperStyled = InnerWrapperStyled;
var ButtonWrapperStyled = _styledComponents.default.div(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2.default)(["\n  button {\n    width: 40%;\n    margin: 0 5px;\n    font-weight: 700;\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n"])));
exports.ButtonWrapperStyled = ButtonWrapperStyled;