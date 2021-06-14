"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorMessageStyled = exports.ButtonWrapperStyled = exports.SubscriptionIconStyled = exports.SubTextStyled = exports.DescriptionStyled = exports.TitleStyled = exports.CardStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SubscriptionIcon = _interopRequireDefault(require("components/SubscriptionIcon"));

var _variables = require("styles/variables");

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 10px;\n  color: ", ";\n  font-size: 12px;\n  line-height: 1.3em;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 200px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex: 0 0 75px;\n  min-width: 75px;\n\n  margin: 0;\n  padding: 23px 15px;\n\n  font-size: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 0 0;\n\n  font-size: ", ";\n  color: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 0 30px 0;\n\n  font-size: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 15px 0;\n\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: 1.2em;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  max-width: 400px;\n\n  margin: auto;\n  padding: 40px 30px;\n\n  border: 1px solid ", ";\n  border-radius: 12px;\n  background: ", ";\n\n  text-align: center;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 50px 30px 86px 30px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject());

exports.WrapStyled = WrapStyled;

var CardStyled = _styledComponents.default.div(_templateObject2(), _variables.LineColor, _variables.BackgroundColor, _variables.MainColor);

exports.CardStyled = CardStyled;

var TitleStyled = _styledComponents.default.h1(_templateObject3(), _variables.BoldFont, _variables.LargeFont);

exports.TitleStyled = TitleStyled;

var DescriptionStyled = _styledComponents.default.h2(_templateObject4(), _variables.MediumFont);

exports.DescriptionStyled = DescriptionStyled;

var SubTextStyled = _styledComponents.default.p(_templateObject5(), _variables.SmallFont, _variables.MediumGrey);

exports.SubTextStyled = SubTextStyled;
var SubscriptionIconStyled = (0, _styledComponents.default)(_SubscriptionIcon.default)(_templateObject6(), _variables.LargeFont);
exports.SubscriptionIconStyled = SubscriptionIconStyled;

var ButtonWrapperStyled = _styledComponents.default.div(_templateObject7());

exports.ButtonWrapperStyled = ButtonWrapperStyled;

var ErrorMessageStyled = _styledComponents.default.div(_templateObject8(), _variables.ErrorColor);

exports.ErrorMessageStyled = ErrorMessageStyled;