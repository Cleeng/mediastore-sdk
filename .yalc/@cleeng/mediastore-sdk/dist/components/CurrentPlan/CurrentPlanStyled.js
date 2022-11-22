"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.SubscriptionStyled = exports.SubscriptionManageWrapStyled = exports.StatusMessageWrapStyled = exports.ButtonTextStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 20px;\n"])));
exports.WrapStyled = WrapStyled;
var SubscriptionStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account__subscription'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 12px;\n\n  padding: 20px 18px;\n\n  ", "\n  &:not(:last-child) {\n    margin-bottom: 20px;\n    padding-bottom: 20px;\n  }\n\n  position: relative;\n  z-index: 1;\n\n  &::after {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: -1px;\n    left: -1px;\n\n    content: '';\n    z-index: -1;\n\n    border-radius: 12px;\n    border: 1px solid ", ";\n    box-shadow: 0px 3px 20px #6767672c;\n\n    opacity: 0;\n    transition: opacity 0.2s ease-out;\n  }\n  ", "\n\n  ", "\n"])), _variables.CardColor, _variables.LineColor, function (props) {
  return props.onClick && props.cursorPointer && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      cursor: pointer;\n    "])));
}, _variables.ConfirmColor, function (props) {
  return props.isSelected && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      &::after {\n        opacity: 1;\n      }\n    "])));
}, function (props) {
  return props.hide && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      display: none;\n    "])));
});
exports.SubscriptionStyled = SubscriptionStyled;
var SubscriptionManageWrapStyled = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n"])));
exports.SubscriptionManageWrapStyled = SubscriptionManageWrapStyled;
var ButtonTextStyled = _styledComponents.default.span(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  margin-right: 17px;\n  font-family: inherit;\n  font-weight: inherit;\n\n  &:after {\n    position: absolute;\n    right: -17px;\n    bottom: 0;\n    font-size: 11px;\n    ", ";\n  }\n"])), function (props) {
  return props.isExpanded ? "content: '▲'" : "content: '▼'";
});
exports.ButtonTextStyled = ButtonTextStyled;
var StatusMessageWrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account__message'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 20px;\n"])));
exports.StatusMessageWrapStyled = StatusMessageWrapStyled;