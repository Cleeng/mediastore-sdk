"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionSwitches = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../labeling"));
var _propTypes = require("prop-types");
var _api = require("../../api");
var _SectionHeader = _interopRequireDefault(require("../../components/SectionHeader"));
var _SubscriptionSwitchesList = _interopRequireDefault(require("../../components/SubscriptionSwitchesList"));
var _SwitchPlanPopup = _interopRequireDefault(require("../../components/SwitchPlanPopup"));
var _MyAccountError = _interopRequireDefault(require("../../components/MyAccountError"));
var _SubscriptionSwitchesStyled = require("./SubscriptionSwitchesStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SubscriptionSwitches = function SubscriptionSwitches(_ref) {
  var offerId = _ref.offerId,
    planDetails = _ref.planDetails,
    updateList = _ref.updateList,
    innerPopup = _ref.innerPopup,
    hideInnerPopup = _ref.hideInnerPopup,
    setSwitchSettings = _ref.setSwitchSettings,
    showInnerPopup = _ref.showInnerPopup,
    setOfferToSwitch = _ref.setOfferToSwitch,
    toOfferId = _ref.toOfferId,
    onCancel = _ref.onCancel,
    onSwitchSuccess = _ref.onSwitchSuccess,
    onSwitchError = _ref.onSwitchError,
    t = _ref.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isLoadingChangePlan = _useState2[0],
    setIsLoadingChangePlan = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isErrorChangePlan = _useState4[0],
    setIsErrorChangePlan = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isSwitchInProgress = _useState6[0],
    setIsSwitchInProgress = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    switchSettingsError = _useState8[0],
    setSwitchSettingsError = _useState8[1];
  var fetchSwitchSettings = function fetchSwitchSettings() {
    (0, _api.getAvailableSwitches)(offerId).then(function (data) {
      var response = data.response,
        status = data.status;
      if (!response.errors.length) {
        setSwitchSettings({
          offerId: offerId,
          settings: response.responseData
        });
        if (toOfferId && response.responseData.available.length) {
          var toOfferData = response.responseData.available.find(function (item) {
            return item.toOfferId === toOfferId;
          });
          if (toOfferData) {
            showInnerPopup({
              type: 'switchPlan',
              data: {
                offerData: _objectSpread({}, toOfferData)
              }
            });
          } else {
            setSwitchSettingsError(true);
          }
        }
      } else if (status === 404) {
        setIsSwitchInProgress(true);
      } else {
        setIsErrorChangePlan(response.errors);
        setSwitchSettingsError(true);
      }
    }).catch(function () {
      setIsErrorChangePlan([t('Something went wrong..')]);
    }).finally(function () {
      setIsLoadingChangePlan(false);
    });
  };
  var fetchOffersData = function fetchOffersData() {
    (0, _api.getCustomerSubscriptions)().then(function (response) {
      if (!response.errors.length) {
        var customerSubscriptions = response.responseData.items;
        var subscriptionData = customerSubscriptions.find(function (item) {
          return item.offerId === offerId;
        });
        if (subscriptionData) {
          setOfferToSwitch(subscriptionData);
          fetchSwitchSettings();
        } else {
          setSwitchSettingsError(true);
        }
      }
    }).catch(function () {});
  };
  (0, _react.useEffect)(function () {
    if (innerPopup.isOpen) {
      hideInnerPopup();
      updateList();
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (offerId && !Object.keys(planDetails.offerToSwitch).length) {
      fetchOffersData();
    } else if (offerId && !Object.keys(planDetails.switchSettings).length) {
      fetchSwitchSettings();
    }
  }, [offerId]);
  if (switchSettingsError) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      generalError: true
    });
  }
  if (toOfferId) {
    return /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopup.default, {
      toOffer: innerPopup.data.offerData,
      fromOffer: planDetails.offerToSwitch,
      hideInnerPopup: hideInnerPopup,
      updateList: updateList,
      isPopupLoading: isLoadingChangePlan || !innerPopup.isOpen || innerPopup.type !== 'switchPlan',
      onCancel: onCancel,
      onSwitchSuccess: onSwitchSuccess,
      onSwitchError: onSwitchError,
      showInnerPopup: showInnerPopup
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesStyled.WrapStyled, null, innerPopup.isOpen && innerPopup.type === 'switchPlan' ? /*#__PURE__*/_react.default.createElement(_SwitchPlanPopup.default, {
    toOffer: innerPopup.data.offerData,
    fromOffer: planDetails.offerToSwitch,
    hideInnerPopup: hideInnerPopup,
    updateList: updateList,
    isPartOfCancellationFlow: innerPopup.data.isPartOfCancellationFlow,
    showInnerPopup: showInnerPopup,
    onSwitchError: onSwitchError
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, t('Change Plan')), /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.default, {
    switchSettings: planDetails.switchSettings[offerId],
    showInnerPopup: showInnerPopup,
    isOfferSelected: !!offerId,
    isLoading: isLoadingChangePlan || Object.keys(planDetails.switchSettings).length === 0 && !isSwitchInProgress,
    isSwitchInProgress: isSwitchInProgress,
    errors: isErrorChangePlan || []
  })));
};
exports.PureSubscriptionSwitches = SubscriptionSwitches;
SubscriptionSwitches.propTypes = {
  offerId: _propTypes.PropTypes.string.isRequired,
  planDetails: _propTypes.PropTypes.objectOf(_propTypes.PropTypes.any),
  innerPopup: _propTypes.PropTypes.objectOf(_propTypes.PropTypes.any),
  showInnerPopup: _propTypes.PropTypes.func.isRequired,
  hideInnerPopup: _propTypes.PropTypes.func.isRequired,
  setSwitchSettings: _propTypes.PropTypes.func.isRequired,
  updateList: _propTypes.PropTypes.func.isRequired,
  toOfferId: _propTypes.PropTypes.string,
  setOfferToSwitch: _propTypes.PropTypes.func,
  onCancel: _propTypes.PropTypes.func,
  onSwitchSuccess: _propTypes.PropTypes.func,
  onSwitchError: _propTypes.PropTypes.func,
  t: _propTypes.PropTypes.func
};
SubscriptionSwitches.defaultProps = {
  planDetails: {
    currentPlan: []
  },
  innerPopup: {},
  setOfferToSwitch: function setOfferToSwitch() {},
  onCancel: null,
  onSwitchSuccess: null,
  toOfferId: '',
  onSwitchError: null,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionSwitches));
exports.default = _default;