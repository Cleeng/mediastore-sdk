"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormSuccessStyled = exports.FormErrorStyled = exports.SeparatorStyled = exports.SocialStyled = exports.FromStyled = exports.ContentWrapperStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  position: absolute;\n  top: 20px;\n  width: 100%;\n  font-size: 13px;\n  font-weight: 600;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 20px;\n  width: 100%;\n\n  color: ", ";\n\n  font-size: 13px;\n  font-weight: 600;\n\n  a {\n    color: ", ";\n    font-weight: 600;\n    text-decoration: underline;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 100%;\n\n  padding: 20px 0;\n\n  color: ", ";\n\n  text-align: center;\n  font-size: 13px;\n\n  overflow: hidden;\n\n  &::before,\n  &::after {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n\n    content: '';\n    height: 1px;\n    width: 40%;\n\n    background-color: ", ";\n  }\n  &::before {\n    right: 5%;\n\n    margin-left: -50%;\n  }\n  &::after {\n    left: 5%;\n    margin-right: -50%;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n    \n    margin-bottom: 20px;\n    \n    button{\n      width: 100%;\n\n      margin: 5px 0;\n    }\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-between;\n\n  width: 100%;\n  margin-top: 10px;\n\n  p {\n    margin-top: 20px;\n  }\n\n  button {\n    width: 48%;\n    margin: 10px 0 0 0;\n  }\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-top: 40px;\n  & input {\n    position: relative;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 80%;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 55%;\n  margin: 0 auto;\n  padding-bottom: 70px;\n\n  text-align: center;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ContentWrapperStyled = _styledComponents.default.main(_templateObject(), _BreakPoints.media.small(_templateObject2()));

exports.ContentWrapperStyled = ContentWrapperStyled;

var FromStyled = _styledComponents.default.form(_templateObject3());

exports.FromStyled = FromStyled;

var SocialStyled = _styledComponents.default.div(_templateObject4(), _BreakPoints.media.smallest(_templateObject5()));

exports.SocialStyled = SocialStyled;

var SeparatorStyled = _styledComponents.default.div(_templateObject6(), colors.MainColor, colors.MediumGrey);

exports.SeparatorStyled = SeparatorStyled;

var FormErrorStyled = _styledComponents.default.div(_templateObject7(), colors.ErrorColor, colors.ErrorColor);

exports.FormErrorStyled = FormErrorStyled;

var FormSuccessStyled = _styledComponents.default.h1(_templateObject8(), colors.ConfirmColor);

exports.FormSuccessStyled = FormSuccessStyled;