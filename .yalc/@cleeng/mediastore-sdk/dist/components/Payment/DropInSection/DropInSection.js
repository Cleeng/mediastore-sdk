"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DropInSectionStyled = require("./DropInSectionStyled");
var Chevron = function Chevron(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    fill: "none",
    stroke: "#a5a5a5",
    strokeWidth: "1.2"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "m5.079 8.388 4.922 4.921 4.921-4.921",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "10",
    stroke: "none"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "9.4"
  }))))));
};
Chevron.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20"
};
var DropInSection = function DropInSection(_ref) {
  var children = _ref.children,
    selectPaymentMethod = _ref.selectPaymentMethod,
    isSelected = _ref.isSelected,
    title = _ref.title,
    logo = _ref.logo,
    isCardAvailable = _ref.isCardAvailable;
  return /*#__PURE__*/_react.default.createElement(_DropInSectionStyled.WrapperStyled, {
    isSelected: isSelected,
    isCardAvailable: isCardAvailable,
    onClick: function onClick() {
      return selectPaymentMethod('paypal');
    }
  }, /*#__PURE__*/_react.default.createElement(_DropInSectionStyled.TextStyled, null, /*#__PURE__*/_react.default.createElement(_DropInSectionStyled.IconWrapperStyled, null, logo), /*#__PURE__*/_react.default.createElement(_DropInSectionStyled.TitleStyled, null, title), /*#__PURE__*/_react.default.createElement(_DropInSectionStyled.ChevronIconWrapperStyled, {
    isSelected: isSelected
  }, /*#__PURE__*/_react.default.createElement(Chevron, null))), isSelected && children);
};
DropInSection.propTypes = {
  selectPaymentMethod: _propTypes.default.func.isRequired,
  isSelected: _propTypes.default.bool.isRequired,
  title: _propTypes.default.string.isRequired,
  logo: _propTypes.default.node.isRequired,
  children: _propTypes.default.node.isRequired,
  isCardAvailable: _propTypes.default.bool.isRequired
};
var _default = DropInSection;
exports.default = _default;