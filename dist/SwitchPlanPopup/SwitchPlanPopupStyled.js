"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageStyled = exports.ArrowStyled = exports.ImageWrapper = exports.SubscriptionIconStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SubscriptionIcon = _interopRequireDefault(require("components/SubscriptionIcon"));

var _variables = require("styles/variables");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)([""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 13px;\n  height: 13px;\n\n  border-top: 2px solid ", ";\n  border-right: 2px solid ", ";\n\n  transform: translateX(-25%) rotate(45deg);\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  margin: 0 auto 40px auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex: 0 0 70px;\n  max-width: 70px;\n  height: 70px;\n\n  margin: 0 20px;\n  padding: 0;\n\n  line-height: 70px;\n  font-size: 30px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SubscriptionIconStyled = (0, _styledComponents.default)(_SubscriptionIcon.default)(_templateObject());
exports.SubscriptionIconStyled = SubscriptionIconStyled;

var ImageWrapper = _styledComponents.default.div(_templateObject2());

exports.ImageWrapper = ImageWrapper;

var ArrowStyled = _styledComponents.default.span(_templateObject3(), _variables.LineColor, _variables.LineColor);

exports.ArrowStyled = ArrowStyled;

var ImageStyled = _styledComponents.default.img(_templateObject4());

exports.ImageStyled = ImageStyled;