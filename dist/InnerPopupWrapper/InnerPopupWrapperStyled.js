"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonWrapperStyled = exports.MailStyled = exports.TextStyled = exports.TitleStyled = exports.ContentStyled = exports.HeaderTitleStyled = exports.DotStyled = exports.HeaderStyled = exports.DotsWrapperStyled = exports.WrapperStyled = exports.CardStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

var _Card = _interopRequireDefault(require("components/Card"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  margin-bottom: ", ";\n\n  button {\n    text-transform: capitalize;\n    width: 40%;\n    margin: 0 5px;\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 700;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  opacity: 0.8;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 24px 0;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        font-size: 20px;\n      "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      font-size: 20px;\n      ", "\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 27px;\n  "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 26px;\n  color: ", ";\n  font-weight: 600;\n  text-transform: capitalize;\n  line-height: 1.2;\n\n  ", "\n\n  ", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n  "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  margin: auto;\n  width: 80%;\n\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 14px;\n  margin: 0;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: ", ";\n  margin-right: 10px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    margin: 30px 0 0 0;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  color: ", ";\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      span:nth-child(-n + ", ") {\n        background: ", ";\n      }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n  height: 100%;\n  width: 100%;\n"]);

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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  height: 100%;\n  min-height: 500px;\n  display: flex;\n  padding: 0;\n  margin: 0;\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CardStyled = (0, _styledComponents.default)(_Card.default)(_templateObject(), _variables.LineColor, _BreakPoints.media.small(_templateObject2()));
exports.CardStyled = CardStyled;

var WrapperStyled = _styledComponents.default.div(_templateObject3());

exports.WrapperStyled = WrapperStyled;

var DotsWrapperStyled = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.currentStep && (0, _styledComponents.css)(_templateObject5(), props.currentStep, _variables.MainColor);
});

exports.DotsWrapperStyled = DotsWrapperStyled;

var HeaderStyled = _styledComponents.default.div(_templateObject6(), _variables.MainColor, _BreakPoints.media.small(_templateObject7()));

exports.HeaderStyled = HeaderStyled;

var DotStyled = _styledComponents.default.span(_templateObject8(), _variables.LineColor);

exports.DotStyled = DotStyled;

var HeaderTitleStyled = _styledComponents.default.h1(_templateObject9());
/* USE IT FOR CHILDREN */


exports.HeaderTitleStyled = HeaderTitleStyled;

var ContentStyled = _styledComponents.default.div(_templateObject10(), _BreakPoints.media.small(_templateObject11()));

exports.ContentStyled = ContentStyled;

var TitleStyled = _styledComponents.default.h1(_templateObject12(), _variables.MainColor, _BreakPoints.media.small(_templateObject13()), function (props) {
  return props.step === 2 && (0, _styledComponents.css)(_templateObject14(), _BreakPoints.media.small(_templateObject15()));
});

exports.TitleStyled = TitleStyled;

var TextStyled = _styledComponents.default.p(_templateObject16(), _variables.MainColor);

exports.TextStyled = TextStyled;

var MailStyled = _styledComponents.default.span(_templateObject17());

exports.MailStyled = MailStyled;

var ButtonWrapperStyled = _styledComponents.default.div(_templateObject18(), function (props) {
  return props.removeMargin ? '0' : '60px';
});

exports.ButtonWrapperStyled = ButtonWrapperStyled;