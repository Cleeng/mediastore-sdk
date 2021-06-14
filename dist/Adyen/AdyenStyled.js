"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmButtonStyled = exports.AdyenStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 32px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 320px;\n  margin: 50px auto 0 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var AdyenStyled = _styledComponents.default.div(_templateObject());

exports.AdyenStyled = AdyenStyled;

var ConfirmButtonStyled = _styledComponents.default.div(_templateObject2());

exports.ConfirmButtonStyled = ConfirmButtonStyled;