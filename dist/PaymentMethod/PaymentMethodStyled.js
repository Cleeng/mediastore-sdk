"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoMessageStyled = exports.Message = exports.StyledLoaderContainer = exports.CardWrapStyled = exports.CardEditStyled = exports.CardExpirationDateStyled = exports.CardExpirationLabel = exports.CardExpirationStyled = exports.CardNumberStyled = exports.CardTypeStyled = exports.CardStyled = exports.PaymentDetailsStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 13px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 24px;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  color: ", ";\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 40px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      ", " {\n        background-color: ", ";\n\n        &:after {\n          background-color: ", ";\n        }\n      }\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 298px;\n  margin: auto;\n  font-family: Arial, Helvetica, sans-serif;\n\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 18px;\n  right: 16px;\n  color: ", ";\n  font-size: 12px;\n  z-index: 2;\n\n  padding: 9px 17px;\n  background-color: ", ";\n  font-size: 13px;\n  font-weight: 700;\n  border-radius: 12px;\n  border: 0;\n  box-shadow: 0px 3px 50px #00000014;\n\n  &:hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 13px;\n  z-index: 2;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 10px;\n  margin-bottom: 4px;\n  z-index: 2;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 18px;\n  left: 16px;\n  color: ", ";\n  font-size: 12px;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 28px;\n  right: 16px;\n  color: ", ";\n  font-size: 13px;\n  z-index: 2;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  left: 16px;\n  top: 28px;\n  height: 24px;\n  z-index: 2;\n\n  svg {\n    height: 100%;\n    width: auto;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  height: 0;\n  padding-top: 56.25%;\n\n  background-color: ", ";\n  border-radius: 20px;\n\n  overflow: hidden;\n\n  &:after {\n    position: absolute;\n    left: 30%;\n    bottom: -10px;\n    display: block;\n    content: '';\n\n    height: 400px;\n    width: 400px;\n\n    border-radius: 50%;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)([""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 30px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject());

exports.WrapStyled = WrapStyled;

var PaymentDetailsStyled = _styledComponents.default.div(_templateObject2());

exports.PaymentDetailsStyled = PaymentDetailsStyled;

var CardStyled = _styledComponents.default.div(_templateObject3(), _variables.MyAccountBlue, _variables.CardSecondaryColor);

exports.CardStyled = CardStyled;

var CardTypeStyled = _styledComponents.default.div(_templateObject4());

exports.CardTypeStyled = CardTypeStyled;

var CardNumberStyled = _styledComponents.default.div(_templateObject5(), _variables.White);

exports.CardNumberStyled = CardNumberStyled;

var CardExpirationStyled = _styledComponents.default.div(_templateObject6(), _variables.White);

exports.CardExpirationStyled = CardExpirationStyled;

var CardExpirationLabel = _styledComponents.default.div(_templateObject7(), _variables.MainColor);

exports.CardExpirationLabel = CardExpirationLabel;

var CardExpirationDateStyled = _styledComponents.default.div(_templateObject8(), _variables.White);

exports.CardExpirationDateStyled = CardExpirationDateStyled;

var CardEditStyled = _styledComponents.default.button(_templateObject9(), _variables.White, _variables.CardEditButtonBg);

exports.CardEditStyled = CardEditStyled;

var CardWrapStyled = _styledComponents.default.div(_templateObject10(), function (props) {
  return props.type === 'paypal' && (0, _styledComponents.css)(_templateObject11(), CardStyled, _variables.PaypalMainColor, _variables.PaypalSecondaryColor);
});

exports.CardWrapStyled = CardWrapStyled;

var StyledLoaderContainer = _styledComponents.default.div(_templateObject12());

exports.StyledLoaderContainer = StyledLoaderContainer;

var Message = _styledComponents.default.div(_templateObject13(), _variables.MyAccountTextGray);

exports.Message = Message;

var InfoMessageStyled = _styledComponents.default.div(_templateObject14(), _variables.MyAccountTextGray);

exports.InfoMessageStyled = InfoMessageStyled;