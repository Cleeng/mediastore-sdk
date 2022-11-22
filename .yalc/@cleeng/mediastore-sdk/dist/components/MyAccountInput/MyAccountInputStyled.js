"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.InputElementStyled = exports.InputElementLabelStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-input__wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  margin-bottom: 12px;\n\n  ", ";\n"])), function (props) {
  return props.hideInput && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      display: none;\n    "])));
});
exports.WrapStyled = WrapStyled;
var InputElementLabelStyled = _styledComponents.default.label.attrs(function () {
  return {
    className: 'msd__account-input__label'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  margin-bottom: 12px;\n  color: ", ";\n  font-size: 13px;\n"])), _variables.FontColor);
exports.InputElementLabelStyled = InputElementLabelStyled;
var InputElementStyled = _styledComponents.default.input.attrs(function () {
  return {
    className: 'msd__account-input'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  padding: 10px 16px;\n\n  border: 1px solid ", ";\n  border-radius: 4px;\n  font-size: 13px;\n  line-height: 13px;\n\n  &:focus,\n  &:active {\n    border: 1px solid ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  ", "\n"])), _variables.LineColor, _variables.LineColor, _variables.BackgroundColor, _variables.FontColor, function (props) {
  return props.error && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      border: 1px solid ", ";\n    "])), _variables.ErrorColor);
});
exports.InputElementStyled = InputElementStyled;