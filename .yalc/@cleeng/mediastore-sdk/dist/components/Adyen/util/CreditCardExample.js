"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
/* istanbul ignore file */

var CreditCardExample = function CreditCardExample() {
  return /*#__PURE__*/_react.default.createElement("form", {
    style: {
      alignSelf: 'flex-end',
      margin: 40,
      background: 'lightblue',
      border: 'solid 1px black'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textAlign: 'center',
      padding: 10
    }
  }, "Test card data"), [{
    label: 'Card number',
    value: '4988 4388 4388 4305'
  }, {
    label: 'Expires',
    value: '03/30'
  }, {
    label: 'CVV',
    value: '737'
  }].map(function (_ref) {
    var label = _ref.label,
      value = _ref.value;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: label,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
      }
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: label
    }, label), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: label,
      onClick: function onClick(_ref2) {
        var target = _ref2.target;
        target.focus();
        target.select();
        document.execCommand('copy');
      },
      defaultValue: value,
      contentEditable: "false",
      style: {
        marginLeft: 20,
        border: 'none'
      }
    }));
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'right',
      padding: 10,
      cursor: 'pointer'
    }
  }, "(click to copy)"));
};
var _default = CreditCardExample;
exports.default = _default;