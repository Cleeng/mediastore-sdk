"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerWrapper = exports.PeriodStyled = exports.PriceStyled = exports.CurrencyStyled = exports.WrapperStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  line-height: 1rem;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: auto 0 0 5px;\n\n  font-size: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n  "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n\n  font-weight: ", ";\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-right: 2px;\n\n  font-size: ", ";\n  font-weight: ", ";\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    flex-wrap: nowrap;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n\n  align-items: center;\n\n  color: ", ";\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapperStyled = _styledComponents.default.h3(_templateObject(), _variables.MainColor, _BreakPoints.mediaFrom.small(_templateObject2()));

exports.WrapperStyled = WrapperStyled;

var CurrencyStyled = _styledComponents.default.span(_templateObject3(), _variables.TinyFont, _variables.MediumFontWeight, _BreakPoints.mediaFrom.small(_templateObject4(), _variables.BigFont));

exports.CurrencyStyled = CurrencyStyled;

var PriceStyled = _styledComponents.default.span(_templateObject5(), _variables.BigFont, _variables.MediumFontWeight, _BreakPoints.mediaFrom.small(_templateObject6(), _variables.LargeFont));

exports.PriceStyled = PriceStyled;

var PeriodStyled = _styledComponents.default.span(_templateObject7(), _variables.TinyFont);

exports.PeriodStyled = PeriodStyled;

var InnerWrapper = _styledComponents.default.div(_templateObject8());

exports.InnerWrapper = InnerWrapper;