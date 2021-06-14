"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsStyled = exports.TextStyled = exports.MailStyled = exports.NameStyled = exports.PhotoStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

var _icon_myaccount = _interopRequireDefault(require("./img/icon_myaccount.svg"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 100%;\n    max-width: unset;\n    align-items: center;\n  \n    margin-left: 0;\n  "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      ", " {\n        background-color: ", ";\n        width: 100%;\n        border-radius: 10px;\n\n        min-height: 24px;\n      }\n      ", " {\n        background-color: ", ";\n        width: 100%;\n        border-radius: 5px;\n      }\n      ", " {\n        width: 100%;\n      }\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  justify-content: center;\n\n  max-width: calc(100% - 78px);\n  margin-left: 14px;\n\n  color: ", ";\n\n  ", "\n\n  ", "\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 5px 16px;\n  background-color: #f0f0ff;\n  border-radius: 14px;\n  border: 1px solid #d7d7f5;\n  color: #7172c9;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  font-weight: ", ";\n  min-height: 19px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    margin-bottom: 14px;\n  "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      font-size: 14px;\n      font-weight: 700;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 100%;\n\n  margin-bottom: 6px;\n\n  color: ", ";\n\n  font-size: ", ";\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1.2;\n\n  ", "\n\n  ", "\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 26px;\n    line-height: 29px;\n    margin-bottom: 10px;\n    text-align: center;\n  "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 100%;\n\n  margin-bottom: 6px;\n\n  font-size: 20px;\n  line-height: 24px;\n  font-weight: 700;\n  color: ", ";\n  text-overflow: ellipsis;\n  overflow: hidden;\n\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 84px;\n    height: 84px;\n    margin-bottom: 20px;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n\n  border-radius: 50%;\n  background-image: url(", ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 1px solid ", ";\n    padding-bottom: 26px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n\n  padding-bottom: 10px;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.header(_templateObject(), _BreakPoints.mediaFrom.small(_templateObject2(), _variables.LineColor));

exports.WrapStyled = WrapStyled;

var PhotoStyled = _styledComponents.default.div(_templateObject3(), _icon_myaccount.default, _BreakPoints.mediaFrom.small(_templateObject4()));

exports.PhotoStyled = PhotoStyled;

var NameStyled = _styledComponents.default.div(_templateObject5(), _variables.MainColor, _BreakPoints.mediaFrom.small(_templateObject6()));

exports.NameStyled = NameStyled;

var MailStyled = _styledComponents.default.div(_templateObject7(), _variables.MainColor, _variables.SmallFont, function (props) {
  return props.bigger && (0, _styledComponents.css)(_templateObject8());
}, _BreakPoints.mediaFrom.small(_templateObject9()));

exports.MailStyled = MailStyled;

var TextStyled = _styledComponents.default.div(_templateObject10(), _variables.MediumFontWeight);

exports.TextStyled = TextStyled;

var DetailsStyled = _styledComponents.default.div(_templateObject11(), _variables.MainColor, function (props) {
  return props.isEmpty && (0, _styledComponents.css)(_templateObject12(), NameStyled, _variables.MyAccountTextLightGray, MailStyled, _variables.MyAccountTextLightGray, TextStyled);
}, _BreakPoints.mediaFrom.small(_templateObject13()));

exports.DetailsStyled = DetailsStyled;