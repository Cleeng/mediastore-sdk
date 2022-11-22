"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.TransactionListStyled = exports.TitleStyled = exports.SubTitleStyled = exports.RightBoxStyled = exports.LeftBoxStyled = exports.InsideWrapperStyled = exports.IdStyled = exports.DateStyled = exports.ButtonTextStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transactions__wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 20px;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    button{\n      width: 100%;\n    }\n  "]))));
exports.WrapStyled = WrapStyled;
var InsideWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transactions__item'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: no-wrap;\n\n  padding: 18px 0;\n  border-bottom: 1px solid ", ";\n\n  ", "\n"])), _variables.LineColor, function (props) {
  return props.length === 1 && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n        padding: 0;\n        border-bottom: none;\n      "]))) || props.length !== 1 && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n        &:first-child {\n          padding: 0 0 18px 0;\n        }\n\n        &:last-child {\n          padding: 18px 0 0 0;\n          border-bottom: none;\n        }\n      "])));
});
exports.InsideWrapperStyled = InsideWrapperStyled;
var TransactionListStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transactions__list'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  overflow: hidden;\n"])));
exports.TransactionListStyled = TransactionListStyled;
var LeftBoxStyled = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 70%;\n"])));
exports.LeftBoxStyled = LeftBoxStyled;
var RightBoxStyled = _styledComponents.default.div(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-shrink: 0;\n  margin-left: 20px;\n  text-align: right;\n"])));
exports.RightBoxStyled = RightBoxStyled;
var TitleStyled = _styledComponents.default.h3.attrs(function () {
  return {
    className: 'msd__transaction__title'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 15px;\n  margin: 0;\n"])), _variables.FontColor);
exports.TitleStyled = TitleStyled;
var SubTitleStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transaction__subtitle'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 6px;\n\n  color: ", ";\n\n  font-size: 12px;\n"])), _variables.FontColor);
exports.SubTitleStyled = SubTitleStyled;
var IdStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transaction__id'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n"])), _variables.FontColor);
exports.IdStyled = IdStyled;
var DateStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__transaction__date'
  };
})(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 6px;\n\n  color: ", ";\n\n  font-size: 12px;\n"])), _variables.FontColor);
exports.DateStyled = DateStyled;
var ButtonTextStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__transactions__button-text'
  };
})(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  line-height: 1.2;\n  &:after {\n    position: absolute;\n    right: -20px;\n    bottom: 0;\n    font-size: 11px;\n    transform: scaleY(0.8) rotate(0deg);\n    transition: all 0.3s ease-in-out;\n    content: '\u25BC';\n    ", "\n  }\n"])), function (props) {
  return props.isExpanded && (0, _styledComponents.css)(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n        transform: scaleY(0.8) rotateX(180deg);\n      "])));
});
exports.ButtonTextStyled = ButtonTextStyled;