"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OldPasswordStyled = exports.InnerWrapperStyled = exports.MyAccountButtonStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  letter-spacing: 2px;\n  font-weight: 700;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 28px;\n  button {\n    height: 40px;\n    border-radius: 20px;\n    font-weight: 700;\n    width: 100%;\n    padding: 0 10px;\n    font-size: 14px;\n    background-color: #4eb7a1;\n  }\n"]);

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

var MyAccountButtonStyled = _styledComponents.default.div(_templateObject2());

exports.MyAccountButtonStyled = MyAccountButtonStyled;

var InnerWrapperStyled = _styledComponents.default.div(_templateObject3());

exports.InnerWrapperStyled = InnerWrapperStyled;

var OldPasswordStyled = _styledComponents.default.span(_templateObject4());

exports.OldPasswordStyled = OldPasswordStyled;