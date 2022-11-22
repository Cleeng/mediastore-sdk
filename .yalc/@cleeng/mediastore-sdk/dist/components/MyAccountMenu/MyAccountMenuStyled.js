"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.ItemsStyled = exports.ItemWrapStyled = exports.ItemStyled = exports.ItemLabelStyled = exports.ItemIconWrapStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.nav(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  padding: 10px 0;\n\n  ", "\n"])), _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    padding: 26px 0;\n  "]))));
exports.WrapStyled = WrapStyled;
var ItemsStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar__items'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n\n  ", "\n\n  ", "\n"])), _BreakPoints.mediaFrom.smallest(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    justify-content: flex-start;\n  "]))), _BreakPoints.mediaFrom.small(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n  "]))));
exports.ItemsStyled = ItemsStyled;
var ItemWrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar__item'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n\n  &.active {\n    opacity: 1;\n  }\n\n  ", "\n\n  ", "\n"])), function (props) {
  return !props.visibleOnDesktop && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n      ", "\n    "])), _BreakPoints.mediaFrom.small(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n        display: none;\n      "]))));
}, _BreakPoints.mediaFrom.smallest(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      margin-right: 16px;\n  "]))), _BreakPoints.mediaFrom.small(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n    margin-right: 0;\n  "]))));
exports.ItemWrapStyled = ItemWrapStyled;
var ItemIconWrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar__icon'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  display: none;\n  justify-content: center;\n  align-items: center;\n\n  path {\n    opacity: 0.4;\n    fill: ", ";\n  }\n\n  ", "\n"])), _variables.MyAccountTextGray, _BreakPoints.mediaFrom.small(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    border: 0;\n    height: 50px;\n  "]))));
exports.ItemIconWrapStyled = ItemIconWrapStyled;
var ItemLabelStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar__label'
  };
})(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  opacity: 0.4;\n  width: auto;\n  margin: auto;\n\n  color: ", ";\n  font-size: 13px;\n\n  font-weight: 700;\n  line-height: 21px;\n\n  transition: all 0.1s ease-in-out;\n\n  &:after {\n    display: block;\n    content: '';\n    border-bottom: 2px solid ", ";\n    transform: scaleX(0);\n    transition: transform 250ms ease-in-out;\n    transform-origin: 0% 50%;\n  }\n\n  ", "\n"])), _variables.FontColor, _variables.ConfirmColor, _BreakPoints.mediaFrom.small(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n    margin: auto auto auto 20px;\n   font-size: 15px;\n  "]))));
exports.ItemLabelStyled = ItemLabelStyled;
var ItemStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar__item'
  };
})(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 12px 0;\n  border-radius: 12px;\n\n  transition: opacity 0.1s;\n\n  &:hover {\n    cursor: pointer;\n    ", " {\n      &:after {\n        transform: scaleX(1);\n      }\n      opacity: 1;\n    }\n  }\n\n  ", "\n\n  ", "\n"])), ItemLabelStyled, function (props) {
  return props.isActive && (0, _styledComponents.css)(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n      ", " {\n        path {\n          opacity: 1;\n          fill: ", ";\n        }\n      }\n\n      ", " {\n        &:after {\n          transform: scaleX(1);\n        }\n        opacity: 1;\n      }\n    "])), ItemIconWrapStyled, _variables.ConfirmColor, ItemLabelStyled);
}, _BreakPoints.mediaFrom.small(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: row;\n    align-items: center;\n\n    padding: 0 26px 0 0;\n    margin-bottom: 16px;\n\n    border-radius: 8px;\n  "]))));
exports.ItemStyled = ItemStyled;