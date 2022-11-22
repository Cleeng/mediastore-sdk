"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.PriceStyled = exports.PeriodStyled = exports.InnerWrapper = exports.CurrencyStyled = exports.AdditionalLabelStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var WrapperStyled = _styledComponents.default.h3.attrs(function () {
  return {
    className: 'msd__subscription-price'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n\n  align-items: center;\n\n  color: ", ";\n\n  ", "\n"])), _variables.FontColor, _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    flex-wrap: nowrap;\n  "]))));
exports.WrapperStyled = WrapperStyled;
var CurrencyStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__subscription-price__currency'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin-right: 2px;\n\n  font-size: ", ";\n  font-weight: ", ";\n\n  ", "\n"])), _variables.TinyFont, _variables.MediumFontWeight, _BreakPoints.mediaFrom.small(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n  "])), _variables.BigFont));
exports.CurrencyStyled = CurrencyStyled;
var PriceStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__subscription-price__amount'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n\n  font-weight: ", ";\n\n  ", "\n"])), _variables.BigFont, _variables.MediumFontWeight, _BreakPoints.mediaFrom.small(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n  "])), _variables.LargeFont));
exports.PriceStyled = PriceStyled;
var PeriodStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__subscription-price__period'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  margin: auto 0 auto 5px;\n\n  font-size: ", ";\n"])), _variables.TinyFont);
exports.PeriodStyled = PeriodStyled;
var InnerWrapper = _styledComponents.default.div(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  line-height: 1rem;\n"])));
exports.InnerWrapper = InnerWrapper;
var AdditionalLabelStyled = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__subscription-price__additional-label'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 10px;\n  line-height: 10px;\n  text-align: right;\n  color: inherit;\n  margin-top: 2px;\n"])));
exports.AdditionalLabelStyled = AdditionalLabelStyled;