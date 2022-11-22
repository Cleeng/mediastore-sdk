"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mediaFrom = exports.media = exports.breakPoints = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = require("styled-components");
var _templateObject, _templateObject2;
var breakPoints = {
  smallest: 480,
  small: 768,
  medium: 1024,
  avarage: 1200,
  big: 1280,
  bigger: 1440,
  largest: 1920
};
exports.breakPoints = breakPoints;
var media = Object.keys(breakPoints).reduce(function (acc, label) {
  acc[label] = function () {
    return (0, _styledComponents.css)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    @media only screen and (max-width: ", "px) {\n      ", "\n    }\n  "])), breakPoints[label], _styledComponents.css.apply(void 0, arguments));
  };
  return acc;
}, {});
exports.media = media;
var mediaFrom = Object.keys(breakPoints).reduce(function (acc, label) {
  acc[label] = function () {
    return (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    @media only screen and (min-width: ", "px) {\n      ", "\n    }\n  "])), breakPoints[label], _styledComponents.css.apply(void 0, arguments));
  };
  return acc;
}, {});
exports.mediaFrom = mediaFrom;