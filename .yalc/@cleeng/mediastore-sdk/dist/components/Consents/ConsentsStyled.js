"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvisibleLegend = exports.GeneralErrorStyled = exports.FieldsetStyled = exports.ConsentsWrapperStyled = exports.ConsentsErrorStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var ConsentsWrapperStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n\n  padding: 10px;\n\n  font-weight: 300;\n\n  & button {\n    margin-top: 35px;\n  }\n  & a {\n    font-weight: 600;\n  }\n"])));
exports.ConsentsWrapperStyled = ConsentsWrapperStyled;
var ConsentsErrorStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__consents__error'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n\n  color: ", ";\n\n  font-size: 13px;\n"])), _variables.ErrorColor);
exports.ConsentsErrorStyled = ConsentsErrorStyled;
var InvisibleLegend = _styledComponents.default.legend(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  clip: rect(0 0 0 0);\n\n  height: 1px;\n  width: 1px;\n\n  margin: -1px;\n  padding: 0;\n\n  overflow: hidden;\n"])));
exports.InvisibleLegend = InvisibleLegend;
var GeneralErrorStyled = _styledComponents.default.p(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  margin-bottom: 30px;\n  color: ", ";\n  font-size: 13px;\n"])), _variables.ErrorColor);
exports.GeneralErrorStyled = GeneralErrorStyled;
var FieldsetStyled = _styledComponents.default.fieldset(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  border: none;\n"])));
exports.FieldsetStyled = FieldsetStyled;