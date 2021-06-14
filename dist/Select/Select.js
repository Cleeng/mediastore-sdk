"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToSelectFormat = void 0;

var _react = _interopRequireDefault(require("react"));

var _SelectStyled = require("./SelectStyled");

var mapToSelectFormat = function mapToSelectFormat(array) {
  var newArray = array.map(function (item) {
    return {
      label: item,
      value: item
    };
  });
  return newArray;
};

exports.mapToSelectFormat = mapToSelectFormat;

var Select = function Select(_ref) {
  var name = _ref.name,
      values = _ref.values,
      value = _ref.value,
      onChange = _ref.onChange,
      label = _ref.label,
      required = _ref.required,
      disabled = _ref.disabled,
      isMyAccount = _ref.isMyAccount;

  var handleChange = function handleChange(option) {
    onChange(name, option);
  };

  return /*#__PURE__*/_react.default.createElement(_SelectStyled.SelectStyled, null, /*#__PURE__*/_react.default.createElement(_SelectStyled.ReactSelectStyled, {
    classNamePrefix: "react-select",
    placeholder: label,
    value: value,
    required: required,
    onChange: handleChange,
    options: values,
    name: name,
    isDisabled: disabled,
    isMyAccount: isMyAccount
  }));
};

Select.defaultProps = {
  values: [],
  label: '',
  required: false,
  name: '',
  value: {},
  onChange: function onChange() {},
  disabled: false,
  isMyAccount: false
};
var _default = Select;
exports.default = _default;