"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStyled = exports.RowStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("styles/variables");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-align: center;\n  margin: 5px 0 15px 0;\n  font-size: 12px;\n  position: relative;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n\n  &:first-child {\n    margin-right: 25px;\n  }\n\n  & > * {\n    width: 100%;\n    &:first-child {\n      margin-right: 25px;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject());

exports.WrapStyled = WrapStyled;

var RowStyled = _styledComponents.default.div(_templateObject2());

exports.RowStyled = RowStyled;

var MessageStyled = _styledComponents.default.div(_templateObject3(), _variables.ConfirmColor);

exports.MessageStyled = MessageStyled;