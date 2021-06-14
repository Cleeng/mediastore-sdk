"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralErrorStyled = exports.InvisibleLegend = exports.ConsentsErrorStyled = exports.ConsentsWrapperStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("styles/variables");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 30px;\n  color: ", ";\n  font-size: 13px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  clip: rect(0 0 0 0);\n\n  height: 1px;\n  width: 1px;\n\n  margin: -1px;\n  padding: 0;\n\n  overflow: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n\n  color: ", ";\n\n  font-size: 13px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  padding-bottom: 10px;\n\n  font-weight: 300;\n\n  & button {\n    margin-top: 35px;\n  }\n  & a {\n    font-weight: 600;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ConsentsWrapperStyled = _styledComponents.default.div(_templateObject());

exports.ConsentsWrapperStyled = ConsentsWrapperStyled;

var ConsentsErrorStyled = _styledComponents.default.div(_templateObject2(), _variables.ErrorColor);

exports.ConsentsErrorStyled = ConsentsErrorStyled;

var InvisibleLegend = _styledComponents.default.legend(_templateObject3());

exports.InvisibleLegend = InvisibleLegend;

var GeneralErrorStyled = _styledComponents.default.p(_templateObject4(), _variables.ErrorColor);

exports.GeneralErrorStyled = GeneralErrorStyled;