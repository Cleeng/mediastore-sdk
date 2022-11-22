"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var HeadingStyled = _styledComponents.default.h2.attrs(function () {
  return {
    className: 'msd__section-header'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  padding-bottom: 25px;\n  font-size: ", ";\n  font-weight: ", ";\n  color: ", ";\n  text-transform: uppercase;\n  ", "\n  ", "\n"])), _variables.BigFont, _variables.BoldFont, _variables.FontColor, function (props) {
  return props.center && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      text-align: center;\n    "])));
}, function (props) {
  return props.marginTop && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      margin-top: ", ";\n    "])), props.marginTop);
});
var SectionHeader = function SectionHeader(_ref) {
  var children = _ref.children,
    center = _ref.center,
    marginTop = _ref.marginTop;
  return /*#__PURE__*/_react.default.createElement(HeadingStyled, {
    center: center,
    marginTop: marginTop
  }, children);
};
var _default = SectionHeader;
exports.default = _default;
SectionHeader.propTypes = {
  children: _propTypes.default.node,
  center: _propTypes.default.bool,
  marginTop: _propTypes.default.string
};
SectionHeader.defaultProps = {
  children: '',
  center: false,
  marginTop: null
};