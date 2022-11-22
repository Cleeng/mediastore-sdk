"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionSwitchesList = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _CurrentPlanStyled = require("../CurrentPlan/CurrentPlanStyled");
var _SubscriptionManagementStyled = require("../SubscriptionManagement/SubscriptionManagementStyled");
var _OfferCard = _interopRequireDefault(require("../OfferCard"));
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _CurrentPlan = require("../CurrentPlan/CurrentPlan");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _planHelper = require("../../util/planHelper");
var _helper = _interopRequireDefault(require("./helper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var selectPlanIcon = function selectPlanIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(-613.786 -616.883)"
  }, /*#__PURE__*/_react.default.createElement("g", {
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M636 630h41a3 3 0 0 1 3 3v38a3 3 0 0 1-3 3h-41a3 3 0 0 1-3-3v-38a3 3 0 0 1 3-3Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M636 632c-.551 0-1 .449-1 1v38c0 .551.449 1 1 1h41c.551 0 1-.449 1-1v-38c0-.551-.449-1-1-1h-41m0-2h41a3 3 0 0 1 3 3v38a3 3 0 0 1-3 3h-41a3 3 0 0 1-3-3v-38a3 3 0 0 1 3-3Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("path", {
    d: "m682.711 618.297 8.492 8.492a2 2 0 0 1 0 2.828l-4.243 4.243-11.32-11.32 4.243-4.243a2 2 0 0 1 2.828 0Z",
    fill: "#bcc3cd"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m643.724 666.06 3.776-15.09 11.314 11.313Z",
    fill: "#bcc3cd"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: "#f8fafd",
    d: "m672.741 621.667 15.093 15.093-25.47 25.47-15.092-15.094z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "m674.627 623.553 11.32 11.32-25.47 25.47-11.32-11.32z"
  }), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M695.648 642.626h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M701.956 642.626h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M698.016 640.258a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M698.016 646.567a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m615.437 668.612-1.111-1.112a.762.762 0 0 1 0-1.078.762.762 0 0 1 1.077 0l1.112 1.112a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.078 0Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m619.898 673.072-1.111-1.112a.762.762 0 0 1 0-1.078.762.762 0 0 1 1.077 0l1.112 1.112a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.078 0Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M618.785 668.612a.762.762 0 0 1 0-1.077l1.111-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078l-1.111 1.111a.762.762 0 0 1-1.078 0Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M614.324 673.072a.762.762 0 0 1 0-1.077l1.111-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078l-1.111 1.111a.762.762 0 0 1-1.078 0Z",
    fill: "#bcc3cd"
  })), /*#__PURE__*/_react.default.createElement("path", {
    d: "M626.471 619a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z",
    fill: "#bcc3cd"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "3",
    transform: "translate(688.471 681)",
    fill: "#bcc3cd"
  })));
};
selectPlanIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "88.932",
  height: "70.117"
};
var happyData = function happyData(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(1317.214 5987.838)"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "m-1243.988-5917.72-46.214-.058a.622.622 0 1 1 0-1.245l46.214.058a.623.623 0 0 1 0 1.245Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1226.352-5982.374h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1220.044-5982.374h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1223.984-5984.742a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1223.984-5978.433a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m-1315.562-5922.388-1.111-1.112a.762.762 0 0 1 0-1.078.762.762 0 0 1 1.077 0l1.112 1.112a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.078 0Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m-1311.101-5917.928-1.112-1.112a.762.762 0 0 1 0-1.077.762.762 0 0 1 1.078 0l1.111 1.111a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.077 0Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1312.215-5922.388a.762.762 0 0 1 0-1.077l1.111-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078l-1.111 1.111a.762.762 0 0 1-1.078 0Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1316.676-5917.927a.762.762 0 0 1 0-1.078l1.112-1.111a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.077l-1.112 1.112a.762.762 0 0 1-1.078 0Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1310.529-5981a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0-1a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1223.529-5927a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0-1a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1267.094-5917.556a.623.623 0 0 1-.623-.623v-6.434a.622.622 0 0 1 1.245 0v6.434a.622.622 0 0 1-.622.623Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1258.675-5953.538a.624.624 0 0 1 .59.424 4.417 4.417 0 0 0 8.37.008.623.623 0 1 1 1.179.4 5.662 5.662 0 0 1-10.729-.009.624.624 0 0 1 .591-.821Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1240.078-5943.25h-54.024a2.426 2.426 0 0 1-2.423-2.423v-11.074a2.425 2.425 0 0 1 2.423-2.423h54.024a2.425 2.425 0 0 1 2.423 2.423v11.074a2.426 2.426 0 0 1-2.423 2.423Zm-54.024-14.675a1.18 1.18 0 0 0-1.179 1.178v11.074a1.18 1.18 0 0 0 1.179 1.179h54.024a1.18 1.18 0 0 0 1.178-1.179v-11.074a1.18 1.18 0 0 0-1.178-1.178Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1290.069-5947.98a.842.842 0 0 1-.842-.842v-4.758a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1285.459-5947.98a.842.842 0 0 1-.842-.842v-4.758a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1281.158-5947.98a.842.842 0 0 1-.842-.842v-4.758a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1276.242-5947.98a.842.842 0 0 1-.841-.842v-4.758a.842.842 0 1 1 1.683 0v4.763a.842.842 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1240.078-5926.149h-54.024a2.426 2.426 0 0 1-2.423-2.423v-11.073a2.426 2.426 0 0 1 2.423-2.424h54.024a2.426 2.426 0 0 1 2.423 2.424v11.073a2.426 2.426 0 0 1-2.423 2.423Zm-54.024-14.676a1.181 1.181 0 0 0-1.179 1.18v11.073a1.18 1.18 0 0 0 1.179 1.178h54.024a1.179 1.179 0 0 0 1.178-1.178v-11.073a1.181 1.181 0 0 0-1.178-1.18Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1290.069-5930.882a.841.841 0 0 1-.842-.841v-4.759a.842.842 0 1 1 1.684 0v4.763a.841.841 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1285.459-5930.882a.841.841 0 0 1-.842-.841v-4.759a.842.842 0 1 1 1.684 0v4.763a.841.841 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1281.158-5930.882a.841.841 0 0 1-.842-.841v-4.759a.842.842 0 1 1 1.684 0v4.763a.841.841 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1276.242-5930.882a.841.841 0 0 1-.841-.841v-4.759a.842.842 0 1 1 1.683 0v4.763a.841.841 0 0 1-.842.837Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1240.078-5960.349h-54.024a2.426 2.426 0 0 1-2.423-2.423v-11.073a2.426 2.426 0 0 1 2.423-2.423h54.024a2.426 2.426 0 0 1 2.423 2.423v11.073a2.426 2.426 0 0 1-2.423 2.423Zm-54.024-14.675a1.18 1.18 0 0 0-1.179 1.179v11.073a1.18 1.18 0 0 0 1.179 1.179h54.024a1.18 1.18 0 0 0 1.178-1.179v-11.073a1.18 1.18 0 0 0-1.178-1.179Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1290.069-5965.051a.842.842 0 0 1-.842-.842v-4.763a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.842Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1285.459-5965.051a.842.842 0 0 1-.842-.842v-4.763a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.842Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1281.158-5965.051a.842.842 0 0 1-.842-.842v-4.763a.842.842 0 0 1 1.684 0v4.763a.842.842 0 0 1-.842.842Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1276.242-5965.051a.842.842 0 0 1-.841-.842v-4.763a.842.842 0 1 1 1.683 0v4.763a.842.842 0 0 1-.842.842Z",
    fill: "#838eaa"
  }), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(-1259.716 -5969.986)"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "1.712",
    cy: "1.712",
    r: "1.712",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(-1251.509 -5969.986)"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "1.712",
    cy: "1.712",
    r: "1.712",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "1.924",
    cy: "1.924",
    r: "1.924",
    transform: "translate(-1269.019 -5920.103)",
    fill: "#f2f5fc"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M-1267.094-5915.627a2.547 2.547 0 1 1 2.546-2.547 2.55 2.55 0 0 1-2.546 2.547Zm0-3.849a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.303Z",
    fill: "#838eaa"
  })));
};
happyData.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "97.932",
  height: "72.208"
};
var SubscriptionSwitchesList = function SubscriptionSwitchesList(_ref) {
  var switchSettings = _ref.switchSettings,
    showInnerPopup = _ref.showInnerPopup,
    isOfferSelected = _ref.isOfferSelected,
    isLoading = _ref.isLoading,
    errors = _ref.errors,
    isSwitchInProgress = _ref.isSwitchInProgress,
    fromOfferId = _ref.fromOfferId,
    t = _ref.t;
  var planDetailsState = (0, _reactRedux.useSelector)(function (state) {
    return state.planDetails;
  });
  var pendingSwtichesToOfferIdsArray = Object.keys(planDetailsState.switchDetails).map(function (item) {
    return planDetailsState.switchDetails[item].toOfferId;
  });
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlan.SkeletonCard, null);
  }
  if (errors.length) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      generalError: true
    });
  }
  if (!isOfferSelected) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: selectPlanIcon,
      title: t('Click on the plan that you would like to switch from'),
      margin: "0 auto"
    });
  }
  if (isSwitchInProgress) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: happyData,
      title: t('Subscription switch in progress!'),
      subtitle: t('Please try again in a few moments.'),
      margin: "0 auto"
    });
  }
  var areAvailable = !!(switchSettings.available && switchSettings.available.length && switchSettings.available.filter(function (item) {
    return !pendingSwtichesToOfferIdsArray.includes(item.toOfferId);
  }).length);
  var areUnAvailable = !!(switchSettings.unavailable && switchSettings.unavailable.length);
  var allSwitchesBlocked = switchSettings.unavailableReason;
  if (allSwitchesBlocked) {
    var error = _helper.default[allSwitchesBlocked.code] ? _helper.default[allSwitchesBlocked.code] : _helper.default.DEFAULT;
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: error.icon,
      title: error.title,
      subtitle: error.subtitle,
      margin: "0 auto",
      fullWidth: true
    });
  }
  if (!areAvailable && !areUnAvailable) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: selectPlanIcon,
      title: t("Looks like there aren't any options for switching from your current plan right now"),
      margin: "0 auto"
    });
  }
  var availableSorted = Array.isArray(switchSettings.available) ? (0, _toConsumableArray2.default)(switchSettings.available).sort(function (aOffer, bOffer) {
    return bOffer.price - aOffer.price;
  }) : [];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, areAvailable && availableSorted.map(function (subItem) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
      key: subItem.toOfferId,
      hide: pendingSwtichesToOfferIdsArray.find(function (item) {
        return item === subItem.toOfferId;
      })
    }, /*#__PURE__*/_react.default.createElement(_OfferCard.default, {
      period: _planHelper.periodMapper[subItem.period].chargedForEveryText,
      offerType: "S",
      title: subItem.title,
      currency: subItem.nextPaymentPriceCurrencySymbol,
      price: Math.round(subItem.nextPaymentPrice * 100) / 100,
      offerId: subItem.toOfferId
    }), /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SimpleButtonStyled, {
      onClickFn: function onClickFn() {
        window.dispatchEvent(new CustomEvent('MSSDK:switch-button-clicked', {
          detail: {
            fromOfferId: fromOfferId,
            toOfferId: subItem.toOfferId,
            switchDirection: subItem.switchDirection,
            algorithm: subItem.algorithm
          }
        }));
        showInnerPopup({
          type: _innerPopupReducer.POPUP_TYPES.switchPlan,
          data: {
            offerData: _objectSpread({}, subItem)
          }
        });
      }
    }, subItem.switchDirection)));
  }), areUnAvailable && switchSettings.unavailable.map(function (subItem) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
      key: subItem.toOfferId
    }, /*#__PURE__*/_react.default.createElement(_OfferCard.default, {
      period: _planHelper.periodMapper[subItem.period].chargedForEveryText,
      offerType: "S",
      title: subItem.title,
      currency: subItem.nextPaymentPriceCurrencySymbol,
      price: Math.round(subItem.nextPaymentPrice * 100) / 100,
      showInfoBox: subItem.reason.code,
      offerId: subItem.toOfferId
    }), /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SimpleButtonStyled, {
      disabled: true
    }, subItem.switchDirection)));
  }));
};
exports.PureSubscriptionSwitchesList = SubscriptionSwitchesList;
SubscriptionSwitchesList.propTypes = {
  switchSettings: _propTypes.default.objectOf(_propTypes.default.any),
  isOfferSelected: _propTypes.default.bool.isRequired,
  errors: _propTypes.default.arrayOf(_propTypes.default.string),
  showInnerPopup: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  fromOfferId: _propTypes.default.string,
  isSwitchInProgress: _propTypes.default.bool,
  t: _propTypes.default.func
};
SubscriptionSwitchesList.defaultProps = {
  switchSettings: {},
  showInnerPopup: function showInnerPopup() {},
  errors: [],
  isLoading: false,
  fromOfferId: '',
  isSwitchInProgress: false,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionSwitchesList));
exports.default = _default;