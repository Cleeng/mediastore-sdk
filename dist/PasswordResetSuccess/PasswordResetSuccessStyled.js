"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkmark = exports.Loader = exports.NoteStyled = exports.StyledLink = exports.StyledMessage = exports.StyledTitle = exports.PasswordResetSuccessPageStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var colors = _interopRequireWildcard(require("styles/variables"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  animation-duration: 800ms;\n  animation-timing-function: ease;\n  animation-name: ", ";\n  transform: scaleX(-1) rotate(135deg);\n  opacity: 1;\n  height: 3.5em;\n  width: 1.75em;\n  transform-origin: left top;\n  border-right: 3px solid #5cb85c;\n  border-top: 3px solid #5cb85c;\n  content: '';\n  left: 1.75em;\n  top: 3.5em;\n  position: absolute;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    0% {\n      height: 0;\n      width: 0;\n      opacity: 1;\n    }\n\n    20% {\n      height: 0;\n      width: 1.75em;\n      opacity: 1;\n    }\n\n    40% {\n      height: 3.5em;\n      width: 1.75em;\n      opacity: 1;\n    }\n\n    100% {\n      height: 3.5em;\n      width: 1.75em;\n      opacity: 1;\n    }\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-color: #5cb85c;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  border-radius: 50%;\n  width: 7em;\n  height: 7em;\n  transition: border 500ms ease-out;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 35px 35px 0;\n  padding-top: 20px;\n  border-top: 1px ", " solid;\n  font-size: 13px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-weight: bold;\n  &:hover {\n    text-decoration: underline;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 300;\n  & strong {\n    font-weight: bold;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 25px;\n  margin-top: 75px;\n  margin-bottom: 25px;\n  font-weight: 600;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 80%;\n  margin: 0 auto;\n  padding: 40px 0;\n  text-align: center;\n  line-height: 1.3em;\n  font-size: 15px;\n  color: ", ";\n\n  font-weight: bold;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PasswordResetSuccessPageStyled = _styledComponents.default.div(_templateObject(), colors.MainColor);

exports.PasswordResetSuccessPageStyled = PasswordResetSuccessPageStyled;

var StyledTitle = _styledComponents.default.div(_templateObject2());

exports.StyledTitle = StyledTitle;

var StyledMessage = _styledComponents.default.div(_templateObject3());

exports.StyledMessage = StyledMessage;

var StyledLink = _styledComponents.default.span(_templateObject4(), colors.MainColor);

exports.StyledLink = StyledLink;

var NoteStyled = _styledComponents.default.div(_templateObject5(), colors.MediumGrey);

exports.NoteStyled = NoteStyled;

var Loader = _styledComponents.default.div(_templateObject6());

exports.Loader = Loader;
var animateCheckmark = (0, _styledComponents.keyframes)(_templateObject7());

var Checkmark = _styledComponents.default.div(_templateObject8(), animateCheckmark);

exports.Checkmark = Checkmark;