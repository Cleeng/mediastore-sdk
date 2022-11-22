"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.WarningMessageStyled = exports.TitleStyled = exports.TextStyled = exports.OfferCardWrapperStyled = exports.MailStyled = exports.HeaderTitleStyled = exports.HeaderStyled = exports.DowngradesWrapperStyled = exports.DotsWrapperStyled = exports.DotStyled = exports.ContentStyled = exports.CardStyled = exports.ButtonWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _Card = _interopRequireDefault(require("../Card"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CardStyled = (0, _styledComponents.default)(_Card.default)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  height: 100%;\n  min-height: 500px;\n  display: flex;\n  padding: 0;\n  margin: 0;\n  ", ";\n"])), _variables.LineColor, _BreakPoints.media.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    align-items: flex-start;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100vh;\n    overflow-y: scroll;\n  "]))));
exports.CardStyled = CardStyled;
var WrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n  width: 100%;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    height: 100%;\n    overflow: scroll;\n  "]))));
exports.WrapperStyled = WrapperStyled;
var DotsWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup__dots'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  ", "\n"])), function (props) {
  return props.currentStep && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      span:nth-child(-n + ", ") {\n        background: ", ";\n      }\n    "])), props.currentStep, _variables.ConfirmColor);
});
exports.DotsWrapperStyled = DotsWrapperStyled;
var HeaderStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup__header'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  color: ", ";\n  ", "\n"])), _variables.FontColor, _BreakPoints.media.small(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n    margin: 30px 0 0 0;\n  "]))));
exports.HeaderStyled = HeaderStyled;
var DotStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__popup__dot'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: ", ";\n  margin-right: 10px;\n"])), _variables.LineColor);
exports.DotStyled = DotStyled;
var HeaderTitleStyled = _styledComponents.default.h1.attrs(function () {
  return {
    className: 'msd__popup__title'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 14px;\n  margin: 0;\n"])));

/* USE IT FOR CHILDREN */
exports.HeaderTitleStyled = HeaderTitleStyled;
var ContentStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  margin: auto;\n  width: 80%;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n  "]))));
exports.ContentStyled = ContentStyled;
var TitleStyled = _styledComponents.default.h1.attrs(function () {
  return {
    className: 'msd__popup-content__title'
  };
})(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 26px;\n  color: ", ";\n  font-weight: 600;\n  text-transform: ", ";\n  line-height: 1.2;\n\n  ", "\n\n  ", "\n"])), _variables.FontColor, function (props) {
  return props.textTransform ? props.textTransform : 'none';
}, _BreakPoints.media.small(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 27px;\n  "]))), function (props) {
  return props.step === 2 && (0, _styledComponents.css)(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n      font-size: 20px;\n      ", "\n    "])), _BreakPoints.media.small(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n        font-size: 20px;\n      "]))));
});
exports.TitleStyled = TitleStyled;
var TextStyled = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__popup-content__text'
  };
})(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  opacity: 0.8;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 24px 0;\n"])), _variables.FontColor);
exports.TextStyled = TextStyled;
var MailStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__popup-content__mail'
  };
})(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 700;\n"])));
exports.MailStyled = MailStyled;
var ButtonWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__buttons'
  };
})(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  margin-bottom: ", ";\n\n  ", "\n\n  button {\n    text-transform: capitalize;\n    width: 40%;\n    margin: 0 5px;\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n"])), function (props) {
  return props.removeMargin ? '0' : '60px';
}, _BreakPoints.media.small(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2.default)(["\n    margin-bottom: 60px;\n  "]))));
exports.ButtonWrapperStyled = ButtonWrapperStyled;
var WarningMessageStyled = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__popup-content__warning'
  };
})(_templateObject21 || (_templateObject21 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  opacity: 0.8;\n  font-size: 11px;\n  margin: 15px 0 0 0;\n  text-align: center;\n"])), _variables.FontColor);
exports.WarningMessageStyled = WarningMessageStyled;
var DowngradesWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__downgrades-wrapper'
  };
})(_templateObject22 || (_templateObject22 = (0, _taggedTemplateLiteral2.default)([""])));
exports.DowngradesWrapperStyled = DowngradesWrapperStyled;
var OfferCardWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__popup-content__downgrade-wrapper'
  };
})(_templateObject23 || (_templateObject23 = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 12px;\n\n  padding: 15px;\n  max-width: 550px;\n\n  text-align: left;\n\n  ", "\n\n  margin: 10px auto 10px auto;\n  &:last-child {\n    margin: 10px auto 40px auto;\n  }\n  &:hover {\n    transition: 0.3s ease-in-out;\n    border: 1px solid #606376;\n  }\n  .msd__subscription-text__title {\n    font-size: 12px;\n  }\n  .msd__subscription-price__amount {\n    font-size: 15px;\n  }\n  .msd__subscription-price__period {\n    font-size: 11px;\n  }\n"])), _variables.CardColor, _variables.LineColor, function (props) {
  return props.onClick && (0, _styledComponents.css)(_templateObject24 || (_templateObject24 = (0, _taggedTemplateLiteral2.default)(["\n      cursor: pointer;\n    "])));
});
exports.OfferCardWrapperStyled = OfferCardWrapperStyled;