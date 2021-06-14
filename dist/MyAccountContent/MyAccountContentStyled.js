"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    border-left: 1px solid ", ";\n    border-top: none;\n    padding: 35px;\n\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  display: flex;\n  flex-grow: 1;\n  min-height: 100%;\n\n  padding: 35px 26px;\n\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  border-left: none;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// eslint-disable-next-line import/prefer-default-export
var WrapStyled = _styledComponents.default.main(_templateObject(), _variables.BackgroundColor, _variables.LineColor, _BreakPoints.mediaFrom.small(_templateObject2(), _variables.LineColor));

exports.WrapStyled = WrapStyled;