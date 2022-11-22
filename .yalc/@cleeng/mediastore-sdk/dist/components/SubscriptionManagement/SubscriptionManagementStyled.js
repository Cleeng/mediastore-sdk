"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.SubscriptionManagementStyled = exports.SubscriptionActionsStyled = exports.SimpleButtonStyled = exports.ManageButtonWrapStyled = exports.FullWidthButtonStyled = exports.CouponWrapStyled = exports.ButtonTextStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _Button = _interopRequireDefault(require("../Button"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__manage-box__actions-wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n\n  border-top: 1px solid ", ";\n  margin-top: 17px;\n  padding-top: 17px;\n"])), _variables.IconsColor);
exports.WrapperStyled = WrapperStyled;
var SubscriptionManagementStyled = _styledComponents.default.section.attrs(function () {
  return {
    className: 'msd__manage-box'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  margin-top: 22px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n"])));
exports.SubscriptionManagementStyled = SubscriptionManagementStyled;
var ManageButtonWrapStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n\n  button {\n    padding-right: 38px;\n  }\n"])));
exports.ManageButtonWrapStyled = ManageButtonWrapStyled;
var SubscriptionActionsStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__manage-box__actions'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  max-height: 0px;\n  overflow: hidden;\n  transition: all 0.3s ease-in-out;\n\n  ", "\n\n  ", "\n"])), function (props) {
  return props.isOpened && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      max-height: 500px;\n    "])));
}, _BreakPoints.media.small(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    button{\n      font-size:11px;\n    }\n  "]))));
exports.SubscriptionActionsStyled = SubscriptionActionsStyled;
var ButtonTextStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__manage-box__button-text'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  line-height: 1.2;\n  &:after {\n    position: absolute;\n    right: -17px;\n    bottom: 0;\n    font-size: 11px;\n    transform: scaleY(0.8) rotate(0deg);\n    transition: all 0.3s ease-in-out;\n    content: '\u25BC';\n    ", "\n  }\n"])), function (props) {
  return props.isExpanded && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n        transform: scaleY(0.8) rotateX(180deg);\n      "])));
});
exports.ButtonTextStyled = ButtonTextStyled;
var SimpleButtonStyled = (0, _styledComponents.default)(_Button.default).attrs(function () {
  return {
    className: 'msd__manage-box__button'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  width: 48%;\n\n  text-transform: capitalize;\n  &:disabled:hover {\n    opacity: 0.9;\n  }\n  ", "\n"])), _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n      margin: 0;\n      width: unset;\n      max-width: unset;\n    "]))));
exports.SimpleButtonStyled = SimpleButtonStyled;
var FullWidthButtonStyled = (0, _styledComponents.default)(_Button.default)(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  ", "\n"])), _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n      width: unset;\n      max-width: unset;\n    "]))));
exports.FullWidthButtonStyled = FullWidthButtonStyled;
var CouponWrapStyled = _styledComponents.default.div(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n"])));
exports.CouponWrapStyled = CouponWrapStyled;