"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxTextStyled = exports.SubBoxStyled = exports.TrialBadgeStyled = exports.PriceWrapperStyled = exports.DescriptionStyled = exports.TitleStyled = exports.InnerWrapper = exports.WrapperStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n  color: ", ";\n  margin: 0 0 0 10px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  margin: 15px 0;\n  padding: 12px;\n  border: 1px solid ", ";\n  background: ", ";\n  border-radius: 4px;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 80px;\n  padding: 4px 8px;\n  margin-bottom: 4px;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  font-size: 9px;\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  margin: auto 0 auto auto;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n  font-weight: ", ";\n  line-height: 17px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: ", ";\n    line-height: 19px;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto 3px 0;\n\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: 15px;\n\n  ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    max-width: none;\n    margin-right: 20px;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 50%;\n  color: ", ";\n  margin-right: 15px;\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapperStyled = _styledComponents.default.section(_templateObject());

exports.WrapperStyled = WrapperStyled;

var InnerWrapper = _styledComponents.default.div(_templateObject2(), _variables.MainColor, _BreakPoints.mediaFrom.small(_templateObject3()));

exports.InnerWrapper = InnerWrapper;

var TitleStyled = _styledComponents.default.h1(_templateObject4(), _variables.BoldFont, _variables.SmallFont, _BreakPoints.mediaFrom.small(_templateObject5(), _variables.MediumFont));

exports.TitleStyled = TitleStyled;

var DescriptionStyled = _styledComponents.default.h2(_templateObject6(), _variables.TinyFont, _variables.MediumFontWeight);

exports.DescriptionStyled = DescriptionStyled;

var PriceWrapperStyled = _styledComponents.default.div(_templateObject7());

exports.PriceWrapperStyled = PriceWrapperStyled;

var TrialBadgeStyled = _styledComponents.default.div(_templateObject8(), _variables.White, _variables.MainColor, _variables.LineColor, _variables.MicroFont, _variables.MediumFontWeight);

exports.TrialBadgeStyled = TrialBadgeStyled;

var SubBoxStyled = _styledComponents.default.div(_templateObject9(), _variables.LineColor, _variables.BackgroundColor);

exports.SubBoxStyled = SubBoxStyled;

var BoxTextStyled = _styledComponents.default.p(_templateObject10(), _variables.TinyFont, _variables.MainColor);

exports.BoxTextStyled = BoxTextStyled;