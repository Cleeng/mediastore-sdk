"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.TitleStyled = exports.SubscriptionIconStyled = exports.SubTextStyled = exports.ErrorMessageStyled = exports.DescriptionStyled = exports.CardStyled = exports.ButtonWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _SubscriptionIcon = _interopRequireDefault(require("../SubscriptionIcon"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var WrapStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  padding: 50px 30px 86px 30px;\n"])));
exports.WrapStyled = WrapStyled;
var CardStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__checkout-card'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  max-width: 400px;\n\n  margin: auto;\n  padding: 40px 30px;\n\n  border: 1px solid ", ";\n  border-radius: 12px;\n  background: ", ";\n\n  text-align: center;\n  color: ", ";\n"])), _variables.LineColor, _variables.BackgroundColor, _variables.FontColor);
exports.CardStyled = CardStyled;
var TitleStyled = _styledComponents.default.h1.attrs(function () {
  return {
    className: 'msd__checkout-card__title'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 15px 0;\n\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: 1.2em;\n"])), _variables.BoldFont, _variables.LargeFont);
exports.TitleStyled = TitleStyled;
var DescriptionStyled = _styledComponents.default.h2.attrs(function () {
  return {
    className: 'msd__checkout-card__description'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 0 30px 0;\n\n  font-size: ", ";\n"])), _variables.MediumFont);
exports.DescriptionStyled = DescriptionStyled;
var SubTextStyled = _styledComponents.default.p.attrs(function () {
  return {
    className: 'msd__checkout-card__subtext'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 0 0;\n\n  font-size: ", ";\n  color: ", ";\n"])), _variables.SmallFont, _variables.MediumGrey);
exports.SubTextStyled = SubTextStyled;
var SubscriptionIconStyled = (0, _styledComponents.default)(_SubscriptionIcon.default).attrs(function () {
  return {
    className: 'msd__checkout-card__icon'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  flex: 0 0 75px;\n  min-width: 75px;\n\n  margin: 0;\n  padding: 23px 15px;\n\n  font-size: ", ";\n"])), _variables.LargeFont);
exports.SubscriptionIconStyled = SubscriptionIconStyled;
var ButtonWrapperStyled = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 200px;\n"])));
exports.ButtonWrapperStyled = ButtonWrapperStyled;
var ErrorMessageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__checkout-card__message--error'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 10px;\n  color: ", ";\n  font-size: 12px;\n  line-height: 1.3em;\n"])), _variables.ErrorColor);
exports.ErrorMessageStyled = ErrorMessageStyled;