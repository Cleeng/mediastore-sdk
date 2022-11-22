"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.TrialBadgeStyled = exports.TitleStyled = exports.SubBoxStyled = exports.SubBoxContentStyled = exports.SubBoxButtonStyled = exports.PriceWrapperStyled = exports.InnerWrapper = exports.DescriptionStyled = exports.BoxTextStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var WrapperStyled = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  width: 100%;\n"])));
exports.WrapperStyled = WrapperStyled;
var InnerWrapper = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__subscription-text__wrapper'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 50%;\n  color: ", ";\n  margin-right: 15px;\n\n  ", "\n"])), _variables.FontColor, _BreakPoints.mediaFrom.small(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    max-width: none;\n    margin-right: 20px;\n  "]))));
exports.InnerWrapper = InnerWrapper;
var TitleStyled = _styledComponents.default.h1.attrs(function () {
  return {
    className: 'msd__subscription-text__title'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto 3px 0;\n\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: 15px;\n\n  ", ";\n"])), _variables.BoldFont, _variables.SmallFont, _BreakPoints.mediaFrom.small(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n    line-height: 19px;\n  "])), _variables.MediumFont));
exports.TitleStyled = TitleStyled;
var DescriptionStyled = _styledComponents.default.h2.attrs(function () {
  return {
    className: 'msd__subscription-text__description'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n  font-weight: ", ";\n  line-height: 17px;\n"])), _variables.TinyFont, _variables.MediumFontWeight);
exports.DescriptionStyled = DescriptionStyled;
var PriceWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__subscription-price__wrapper'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  margin: auto 0 auto auto;\n"])));
exports.PriceWrapperStyled = PriceWrapperStyled;
var TrialBadgeStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__subscription-price__badge'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  width: 80px;\n  padding: 4px 8px;\n  margin-bottom: 4px;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  font-size: 9px;\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n"])), _variables.White, _variables.FontColor, _variables.LineColor, _variables.MicroFont, _variables.MediumFontWeight);
exports.TrialBadgeStyled = TrialBadgeStyled;
var SubBoxStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__subscription-subcard'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: flex-start;\n  margin: 15px 0;\n  padding: 12px;\n  border: 1px solid ", ";\n  background: ", ";\n  border-radius: 4px;\n  svg {\n    min-width: 18px;\n  }\n"])), _variables.LineColor, _variables.BackgroundColor);
exports.SubBoxStyled = SubBoxStyled;
var BoxTextStyled = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__subscription-subcard__title'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n  color: ", ";\n  margin: 0 0 0 10px;\n  line-height: initial;\n"])), _variables.TinyFont, _variables.FontColor);
exports.BoxTextStyled = BoxTextStyled;
var SubBoxContentStyled = _styledComponents.default.div(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)([""])));
exports.SubBoxContentStyled = SubBoxContentStyled;
var SubBoxButtonStyled = _styledComponents.default.button(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 0;\n  margin: 8px 0 0 10px;\n  background-color: transparent;\n  color: ", ";\n  border: none;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n"])), _variables.ConfirmColor);
exports.SubBoxButtonStyled = SubBoxButtonStyled;