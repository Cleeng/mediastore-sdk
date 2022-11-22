"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.HeaderStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2;
var WrapStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)([""])));
exports.WrapStyled = WrapStyled;
var HeaderStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 14px;\n  font-weight: 700;\n"])), _variables.FontColor);
exports.HeaderStyled = HeaderStyled;