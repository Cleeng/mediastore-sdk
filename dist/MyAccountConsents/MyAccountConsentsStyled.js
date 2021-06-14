"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessMessageStyled = exports.InfoStyled = exports.ButtonWrapperStyled = exports.CheckboxStyled = exports.ButtonStyled = exports.CardStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Checkbox = _interopRequireDefault(require("components/Checkbox"));

var _Card = _interopRequireDefault(require("components/Card"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-align: center;\n  margin: 5px 0 15px 0;\n  font-size: 12px;\n  position: relative;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 13px;\n  opacity: 0.6;\n  margin-top: 15px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      display: none;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      cursor: default;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: flex-start;\n  line-height: 1.3rem;\n\n  ", "\n\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      margin: 20px 0 0 5px;\n      width: unset;\n      max-width: unset;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 10px 0;\n  width: 48%;\n  min-width: 100px;\n\n  ", "\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      padding: 0 0 20px 0;\n      border: none;\n      background: transparent;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 0;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CardStyled = (0, _styledComponents.default)(_Card.default)(_templateObject(), function (props) {
  return props.showConsentsOnly && (0, _styledComponents.css)(_templateObject2());
});
exports.CardStyled = CardStyled;
var ButtonStyled = (0, _styledComponents.default)(_Button.default)(_templateObject3(), function (props) {
  return props.width && (0, _styledComponents.css)(_templateObject4(), props.width);
}, _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject5()));
exports.ButtonStyled = ButtonStyled;
var CheckboxStyled = (0, _styledComponents.default)(_Checkbox.default)(_templateObject6(), function (props) {
  return props.disabled && (0, _styledComponents.css)(_templateObject7());
}, function (props) {
  return props.hide && (0, _styledComponents.css)(_templateObject8());
});
exports.CheckboxStyled = CheckboxStyled;

var ButtonWrapperStyled = _styledComponents.default.div(_templateObject9());

exports.ButtonWrapperStyled = ButtonWrapperStyled;

var InfoStyled = _styledComponents.default.div(_templateObject10());

exports.InfoStyled = InfoStyled;

var SuccessMessageStyled = _styledComponents.default.h6(_templateObject11(), _variables.ConfirmColor);

exports.SuccessMessageStyled = SuccessMessageStyled;