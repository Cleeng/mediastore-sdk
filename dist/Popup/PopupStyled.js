"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerWrapperStyled = exports.HeaderTitleStyled = exports.DotStyled = exports.HeaderStyled = exports.DotsWrapperStyled = exports.InfoStyled = exports.ButtonStyled = exports.ImageStyled = exports.TextStyled = exports.TitleStyled = exports.ButtonWrapperStyled = exports.ContentStyled = exports.WrapperStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

var _Button = _interopRequireDefault(require("components/Button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 14px;\n  margin: 0;\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: ", ";\n  margin-right: 10px;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    margin: 30px 0 0 0;\n  "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 90%;\n  margin: 50px 0 0 0;\n  color: ", ";\n  ", "\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      span:nth-child(-n + ", ") {\n        background: ", ";\n      }\n    "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  ", "\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 13px;\n  margin-bottom: 25px;\n  display: block;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto;\n  &:disabled {\n    cursor: not-allowed;\n    background: ", ";\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 50px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.6;\n      text-align: left;\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  opacity: 0.8;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 20px 0;\n\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 27px;\n  "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 30px;\n  color: ", ";\n  font-weight: 700;\n\n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 80%;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 50%;\n  margin: 0 auto 100px auto;\n\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  margin: auto;\n  width: 50%;\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    min-height: 100vh;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 100%;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  line-height: normal;\n\n  ", "\n\n  opacity: 1;\n  animation: ", " 1 ease-in 0.4s;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t0% {\n\t\topacity: 0;\n    transform: scale(0.97);\n\t}\n  80%{\n    transform: scale(1);\n  }\n\t100% {\n\t\topacity: 1;\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var fadeInOpacity = (0, _styledComponents.keyframes)(_templateObject());

var WrapperStyled = _styledComponents.default.div(_templateObject2(), _BreakPoints.media.small(_templateObject3()), fadeInOpacity);

exports.WrapperStyled = WrapperStyled;

var ContentStyled = _styledComponents.default.div(_templateObject4(), _BreakPoints.media.small(_templateObject5()));

exports.ContentStyled = ContentStyled;

var ButtonWrapperStyled = _styledComponents.default.div(_templateObject6(), _BreakPoints.media.small(_templateObject7()));

exports.ButtonWrapperStyled = ButtonWrapperStyled;

var TitleStyled = _styledComponents.default.h1(_templateObject8(), _variables.MainColor, _BreakPoints.media.small(_templateObject9()));

exports.TitleStyled = TitleStyled;

var TextStyled = _styledComponents.default.p(_templateObject10(), _variables.MainColor, function (props) {
  return props.step === 2 && (0, _styledComponents.css)(_templateObject11());
});

exports.TextStyled = TextStyled;

var ImageStyled = _styledComponents.default.img(_templateObject12());

exports.ImageStyled = ImageStyled;
var ButtonStyled = (0, _styledComponents.default)(_Button.default)(_templateObject13(), _variables.LineColor);
exports.ButtonStyled = ButtonStyled;

var InfoStyled = _styledComponents.default.span(_templateObject14(), _variables.ErrorColor);

exports.InfoStyled = InfoStyled;

var DotsWrapperStyled = _styledComponents.default.div(_templateObject15(), function (props) {
  return props.currentStep && (0, _styledComponents.css)(_templateObject16(), props.currentStep, _variables.MainColor);
});

exports.DotsWrapperStyled = DotsWrapperStyled;

var HeaderStyled = _styledComponents.default.div(_templateObject17(), _variables.MainColor, _BreakPoints.media.small(_templateObject18()));

exports.HeaderStyled = HeaderStyled;

var DotStyled = _styledComponents.default.span(_templateObject19(), _variables.LineColor);

exports.DotStyled = DotStyled;

var HeaderTitleStyled = _styledComponents.default.h1(_templateObject20());

exports.HeaderTitleStyled = HeaderTitleStyled;

var InnerWrapperStyled = _styledComponents.default.div(_templateObject21());

exports.InnerWrapperStyled = InnerWrapperStyled;