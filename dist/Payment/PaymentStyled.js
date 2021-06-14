"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalTextStyled = exports.PayPalWrapperStyled = exports.MethodsWrapperStyled = exports.PaymentErrorStyled = exports.PaymentStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n    max-width: 400px;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 50%;\n  margin-bottom: 20px;\n  text-align: center;\n  line-height: 1.4em;\n  font-size: 13px;\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 180px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    button{\n      flex-basis: 100%;\n    }\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 10px;\n  font-size: 20px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  button {\n    flex-basis: 200px;\n    margin: 10px;\n\n    :not(:disabled):hover,\n    :active,\n    :focus {\n      background-color: ", ";\n    }\n  }\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  font-size: 15px;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 20px 35px 70px 35px;\n  width: 100%;\n  margin-top: 20px;\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PaymentStyled = _styledComponents.default.div(_templateObject(), colors.BackgroundColor, colors.LineColor, colors.LineColor);

exports.PaymentStyled = PaymentStyled;

var PaymentErrorStyled = _styledComponents.default.div(_templateObject2(), colors.ErrorColor);

exports.PaymentErrorStyled = PaymentErrorStyled;

var MethodsWrapperStyled = _styledComponents.default.div(_templateObject3(), colors.MediumGrey, _BreakPoints.media.smallest(_templateObject4()));

exports.MethodsWrapperStyled = MethodsWrapperStyled;

var PayPalWrapperStyled = _styledComponents.default.div(_templateObject5());

exports.PayPalWrapperStyled = PayPalWrapperStyled;

var PayPalTextStyled = _styledComponents.default.p(_templateObject6(), _BreakPoints.media.small(_templateObject7()));

exports.PayPalTextStyled = PayPalTextStyled;