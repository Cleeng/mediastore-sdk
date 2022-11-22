"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureUpdateSubscription = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Unsubscribe = _interopRequireDefault(require("./Unsubscribe"));
var _Resubscribe = _interopRequireDefault(require("./Resubscribe"));
var UpdateSubscription = function UpdateSubscription(_ref) {
  var action = _ref.action,
    offerDetails = _ref.offerDetails,
    hideInnerPopup = _ref.hideInnerPopup,
    showInnerPopup = _ref.showInnerPopup,
    updateList = _ref.updateList,
    customCancellationReasons = _ref.customCancellationReasons,
    skipAvailableDowngradesStep = _ref.skipAvailableDowngradesStep;
  if (action === 'unsubscribe') {
    return /*#__PURE__*/_react.default.createElement(_Unsubscribe.default, {
      offerDetails: offerDetails,
      hideInnerPopup: hideInnerPopup,
      updateList: updateList,
      customCancellationReasons: customCancellationReasons,
      skipAvailableDowngradesStep: skipAvailableDowngradesStep,
      showInnerPopup: showInnerPopup
    });
  }
  if (action === 'resubscribe') {
    return /*#__PURE__*/_react.default.createElement(_Resubscribe.default, {
      offerDetails: offerDetails,
      hideInnerPopup: hideInnerPopup,
      updateList: updateList
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};
exports.PureUpdateSubscription = UpdateSubscription;
UpdateSubscription.propTypes = {
  action: _propTypes.default.oneOf(['unsubscribe', 'resubscribe']).isRequired,
  offerDetails: _propTypes.default.objectOf(_propTypes.default.any).isRequired,
  hideInnerPopup: _propTypes.default.func.isRequired,
  showInnerPopup: _propTypes.default.func.isRequired,
  updateList: _propTypes.default.func.isRequired,
  customCancellationReasons: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    value: _propTypes.default.string.isRequired
  })),
  skipAvailableDowngradesStep: _propTypes.default.bool
};
UpdateSubscription.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(UpdateSubscription));
exports.default = _default;