"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.FormStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _templateObject, _templateObject2;
var WrapStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n"])));
exports.WrapStyled = WrapStyled;
var FormStyled = _styledComponents.default.form.attrs(function () {
  return {
    className: 'msd__profile__form'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)([""])));
exports.FormStyled = FormStyled;