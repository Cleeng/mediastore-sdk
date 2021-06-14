"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrongStyled = exports.Loader = exports.StyledItem = exports.ReasonsWrapper = exports.WrapperStyled = exports.SurveyCard = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

var _Card = _interopRequireDefault(require("components/Card"));

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  text-transform: uppercase;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-color: #5cb85c;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  border-radius: 50%;\n  width: 7em;\n  height: 7em;\n  transition: border 500ms ease-out;\n  margin-bottom: 20px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 0 20px 0;\n  color: ", ";\n\n  font-size: 13px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 30px 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 30px 10px;\n  margin: auto;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    align-items: flex-start;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100vh;\n    overflow-y: scroll;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  height: 100%;\n  min-height: 500px;\n  display: flex;\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SurveyCard = (0, _styledComponents.default)(_Card.default)(_templateObject(), _variables.LineColor, _BreakPoints.media.small(_templateObject2()));
exports.SurveyCard = SurveyCard;

var WrapperStyled = _styledComponents.default.div(_templateObject3());

exports.WrapperStyled = WrapperStyled;

var ReasonsWrapper = _styledComponents.default.ul(_templateObject4());

exports.ReasonsWrapper = ReasonsWrapper;

var StyledItem = _styledComponents.default.li(_templateObject5(), _variables.MainColor);

exports.StyledItem = StyledItem;

var Loader = _styledComponents.default.div(_templateObject6());

exports.Loader = Loader;

var StrongStyled = _styledComponents.default.strong(_templateObject7());

exports.StrongStyled = StrongStyled;