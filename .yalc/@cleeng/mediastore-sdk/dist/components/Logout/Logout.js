"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureLogout = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Button = _interopRequireDefault(require("../Button"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var Logout = function Logout(_ref) {
  var t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClickFn: function onClickFn() {
      return _auth.default.logout();
    },
    theme: "navLink"
  }, t('Back to login'));
};
exports.PureLogout = Logout;
Logout.propTypes = {
  t: _propTypes.default.func
};
Logout.defaultProps = {
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Logout));
exports.default = _default;