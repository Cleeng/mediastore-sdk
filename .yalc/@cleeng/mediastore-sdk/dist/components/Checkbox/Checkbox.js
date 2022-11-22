"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CheckboxStyled = require("./CheckboxStyled");
var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
    onClickFn = _ref.onClickFn,
    error = _ref.error,
    checked = _ref.checked,
    required = _ref.required,
    isMyAccount = _ref.isMyAccount,
    className = _ref.className,
    disabled = _ref.disabled,
    isRadioButton = _ref.isRadioButton;
  return /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckboxStyled, {
    onClick: function onClick(e) {
      return onClickFn(e, disabled);
    },
    role: "checkbox",
    tabIndex: "-1",
    "aria-checked": checked,
    checked: checked,
    "aria-label": children,
    className: className,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckFrameStyled, {
    error: error && required && !checked,
    tabIndex: "0",
    onKeyDown: function onKeyDown(e) {
      return e.keyCode === 32 ? onClickFn() : null;
    },
    isMyAccount: isMyAccount,
    isRadioButton: isRadioButton,
    checked: checked
  }, checked && /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckMarkStyled, {
    "data-testid": "checkmark",
    isMyAccount: isMyAccount,
    isRadioButton: isRadioButton
  })), /*#__PURE__*/_react.default.createElement(_CheckboxStyled.ConsentDefinitionStyled, {
    dangerouslySetInnerHTML: {
      __html: "".concat(children).concat(required && isMyAccount ? '*' : '')
    },
    checked: checked
  }));
};
Checkbox.propTypes = {
  checked: _propTypes.default.bool,
  required: _propTypes.default.bool,
  onClickFn: _propTypes.default.func,
  error: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  isMyAccount: _propTypes.default.bool,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isRadioButton: _propTypes.default.bool
};
Checkbox.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: function onClickFn() {},
  children: '',
  isMyAccount: false,
  className: '',
  disabled: false,
  isRadioButton: false
};
var _default = Checkbox;
exports.default = _default;