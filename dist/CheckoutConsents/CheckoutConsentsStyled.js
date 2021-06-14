"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckoutConsentsError = exports.CheckoutConsentsCheckbox = exports.CheckoutConsentsListStyled = exports.CheckoutConsentsSubTitleStyled = exports.CheckoutConsentsTitleStyled = exports.CheckoutConsentsContentStyled = exports.CheckoutConsentsStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      text-align: center;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n  margin-top: 8px;\n  content: '';\n  color: ", ";\n  transition: 0.2s ease-in-out;\n  font-size: 13px;\n  text-align: left;\n\n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)([""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 36px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 16px;\n  font-size: 13px;\n  line-height: 22px;\n  text-align: center;\n  font-weight: 700;\n\n  color: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 16px;\n  font-size: 16px;\n  line-height: 22px;\n  text-align: center;\n  font-weight: 700;\n\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 80%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 55%;\n  margin: 0 auto;\n  padding-top: 80px;\n  padding-bottom: 105px;\n\n  text-align: center;\n\n  ", "\n"]);

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

var CheckoutConsentsStyled = _styledComponents.default.div(_templateObject());

exports.CheckoutConsentsStyled = CheckoutConsentsStyled;

var CheckoutConsentsContentStyled = _styledComponents.default.div(_templateObject2(), _BreakPoints.media.small(_templateObject3()));

exports.CheckoutConsentsContentStyled = CheckoutConsentsContentStyled;

var CheckoutConsentsTitleStyled = _styledComponents.default.h3(_templateObject4(), colors.MainColor);

exports.CheckoutConsentsTitleStyled = CheckoutConsentsTitleStyled;

var CheckoutConsentsSubTitleStyled = _styledComponents.default.h4(_templateObject5(), colors.MediumGrey);

exports.CheckoutConsentsSubTitleStyled = CheckoutConsentsSubTitleStyled;

var CheckoutConsentsListStyled = _styledComponents.default.div(_templateObject6());

exports.CheckoutConsentsListStyled = CheckoutConsentsListStyled;

var CheckoutConsentsCheckbox = _styledComponents.default.div(_templateObject7());

exports.CheckoutConsentsCheckbox = CheckoutConsentsCheckbox;

var CheckoutConsentsError = _styledComponents.default.div(_templateObject8(), colors.ErrorColor, function (props) {
  return props.center && (0, _styledComponents.css)(_templateObject9());
});

exports.CheckoutConsentsError = CheckoutConsentsError;