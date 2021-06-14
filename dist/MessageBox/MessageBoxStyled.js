"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBoxMessageStyled = exports.MessageBoxIconWrapStyled = exports.MessageBoxStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("styles/variables");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: 13px;\n  font-size: 12px;\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  width: 18px;\n  height: 18px;\n  background-color: ", ";\n  border-radius: 3px;\n\n  svg {\n    height: 12px;\n    fill: #fff;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  padding: 19px 18px;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 7px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MessageBoxStyled = _styledComponents.default.div(_templateObject(), _variables.BackgroundColor, _variables.LineColor);

exports.MessageBoxStyled = MessageBoxStyled;

var MessageBoxIconWrapStyled = _styledComponents.default.div(_templateObject2(), _variables.ConfirmColor);

exports.MessageBoxIconWrapStyled = MessageBoxIconWrapStyled;

var MessageBoxMessageStyled = _styledComponents.default.div(_templateObject3(), _variables.ConfirmColor);

exports.MessageBoxMessageStyled = MessageBoxMessageStyled;