"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonTextStyled = exports.DateStyled = exports.IdStyled = exports.SubTitleStyled = exports.TitleStyled = exports.RightBoxStyled = exports.LeftBoxStyled = exports.TransactionListStyled = exports.InsideWrapperStyled = exports.InfoMessageStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        transform: scaleY(0.8) rotateX(180deg);\n      "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  line-height: 1.2;\n  &:after {\n    position: absolute;\n    right: -20px;\n    bottom: 0;\n    font-size: 11px;\n    transform: scaleY(0.8) rotate(0deg);\n    transition: all 0.3s ease-in-out;\n    content: '\u25BC';\n    ", "\n  }\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 6px;\n\n  color: ", ";\n\n  font-size: 12px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 6px;\n\n  color: ", ";\n\n  font-size: 12px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 15px;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-shrink: 0;\n  margin-left: 20px;\n  text-align: right;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 70%;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      height: ", "px;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 174px;\n  transition: all 0.3s ease-in-out;\n  overflow: hidden;\n\n  ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        &:first-child {\n          padding: 0 0 18px 0;\n        }\n\n        &:last-child {\n          padding: 18px 0 0 0;\n          border-bottom: none;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        padding: 0;\n        border-bottom: none;\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: no-wrap;\n\n  padding: 18px 0;\n  border-bottom: 1px solid ", ";\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 13px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    button{\n      width: 100%;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 20px;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject(), _BreakPoints.media.small(_templateObject2()));

exports.WrapStyled = WrapStyled;

var InfoMessageStyled = _styledComponents.default.div(_templateObject3(), _variables.MyAccountTextGray);

exports.InfoMessageStyled = InfoMessageStyled;

var InsideWrapperStyled = _styledComponents.default.div(_templateObject4(), _variables.LineColor, function (props) {
  return props.length === 1 && (0, _styledComponents.css)(_templateObject5()) || props.length !== 1 && (0, _styledComponents.css)(_templateObject6());
});

exports.InsideWrapperStyled = InsideWrapperStyled;

var TransactionListStyled = _styledComponents.default.div(_templateObject7(), function (props) {
  return props.length && (0, _styledComponents.css)(_templateObject8(), props.length * 70);
});

exports.TransactionListStyled = TransactionListStyled;

var LeftBoxStyled = _styledComponents.default.div(_templateObject9());

exports.LeftBoxStyled = LeftBoxStyled;

var RightBoxStyled = _styledComponents.default.div(_templateObject10());

exports.RightBoxStyled = RightBoxStyled;

var TitleStyled = _styledComponents.default.h3(_templateObject11(), _variables.MainColor);

exports.TitleStyled = TitleStyled;

var SubTitleStyled = _styledComponents.default.div(_templateObject12(), _variables.MainColor);

exports.SubTitleStyled = SubTitleStyled;

var IdStyled = _styledComponents.default.div(_templateObject13(), _variables.MainColor);

exports.IdStyled = IdStyled;

var DateStyled = _styledComponents.default.div(_templateObject14(), _variables.MainColor);

exports.DateStyled = DateStyled;

var ButtonTextStyled = _styledComponents.default.span(_templateObject15(), function (props) {
  return props.isExpanded && (0, _styledComponents.css)(_templateObject16());
});

exports.ButtonTextStyled = ButtonTextStyled;