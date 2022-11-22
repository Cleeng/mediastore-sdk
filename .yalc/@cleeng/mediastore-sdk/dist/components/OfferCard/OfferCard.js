"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureOfferCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _SubscriptionIcon = _interopRequireDefault(require("../SubscriptionIcon"));
var _Price = _interopRequireDefault(require("../Price"));
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _planHelper = require("../../util/planHelper");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _OfferCardStyled = require("./OfferCardStyled");
var BlockedIcon = function BlockedIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".c", "{", "fill:#f8fafd", "}")), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(-421 -539)"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "18",
    height: "18",
    rx: "3",
    transform: "translate(421 539)",
    style: {
      fill: "#d3dbe6"
    }
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M7.717-13.6a.777.777 0 0 1-.781.773H1.708a.77.77 0 0 1-.781-.787l-.45-4.665a.763.763 0 0 1 .78-.762h6.13a.759.759 0 0 1 .781.736Zm-5.306-7.818a1.87 1.87 0 0 1 1.912-1.77 1.87 1.87 0 0 1 1.912 1.77v1.894H2.411Zm4.977 1.894h-.675v-1.894a2.353 2.353 0 0 0-2.39-2.248 2.353 2.353 0 0 0-2.39 2.248v1.894h-.676A1.255 1.255 0 0 0 0-18.26l.45 4.66a1.251 1.251 0 0 0 1.258 1.242h5.228a1.25 1.25 0 0 0 1.258-1.228l.452-4.706a1.234 1.234 0 0 0-1.258-1.237",
    transform: "translate(425.72 565.666)",
    style: {
      stroke: "#f7fafc",
      strokeWidth: ".2px",
      fill: "#f8fafd"
    }
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "c",
    d: "M430.578 551.557h-1.073l-.293-2.361a.809.809 0 0 1 .824-.791.8.8 0 0 1 .829.736Zm-.538-3.949a1.611 1.611 0 0 0-1.618 1.636l.336 2.754a.4.4 0 0 0 .4.351h1.773a.4.4 0 0 0 .4-.351l.336-2.81a1.6 1.6 0 0 0-1.623-1.58"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "c",
    d: "M427.968 546.649h-1.729l.469 6.2h2.776l-.759-6.387Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "c",
    d: "m428.63 546.389.165 2.01s-1.008.409.207 0 4.867-1.553 4.867-1.553l-1.157-.359-.764.089"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "c",
    d: "M433.655 546.752s.657 1.307-.168 4.877c-.4 1.368-.232 1.232-.232 1.232l-4.508-.145s.215-.722 2.028-.99a5.216 5.216 0 0 0 .465-2.46c0-.62-.175-.464-.542-.707s-1.7-.193-.923-.693a19.894 19.894 0 0 1 3.88-1.114Z"
  })));
};
BlockedIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18"
};
var EditBlockedIcon = function EditBlockedIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#d3dbe6", "}", ".b", "{", "fill:#f8fafd", "}")), /*#__PURE__*/_react.default.createElement("rect", {
    className: "a",
    width: "18",
    height: "18",
    rx: "3"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "b",
    d: "M12.779 3.324a1.8 1.8 0 0 1 1.441 2.883l-.721.721-1.091-1.093-1.429-1.43.721-.721a1.794 1.794 0 0 1 1.081-.36ZM3.77 11.612l-.721 3.243 3.243-.721 6.667-6.667-2.522-2.521Zm7.338-4.194-5.045 5.045-.621-.621 5.045-5.046.621.621Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "b",
    d: "m10.139 6.289 1.322 1.322-5.287 5.286-1.321-1.322z"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    className: "a",
    width: "7.476",
    height: "1.2",
    rx: ".6",
    transform: "rotate(45 -5.327 10.866)"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    className: "b",
    width: "14.448",
    height: "1.4",
    rx: ".7",
    transform: "rotate(45 -1.864 6.983)"
  }), /*#__PURE__*/_react.default.createElement("g", {
    style: {
      fill: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "m1 0 1 1.707H0Z",
    style: {
      stroke: "none"
    },
    transform: "rotate(-135 5.326 6.496)"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m1 0 1 1.707H0L1 0Z",
    style: {
      fill: "#d3dbe6",
      stroke: "none"
    },
    transform: "rotate(-135 5.326 6.496)"
  })), /*#__PURE__*/_react.default.createElement("path", {
    className: "b",
    d: "m3.977 13.316.797.797a2.387 2.387 0 0 1-.964.309.7.7 0 0 1-.547-.392Z"
  }));
};
EditBlockedIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18"
};
var DowngradeIcon = function DowngradeIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(-421 -279)"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "18",
    height: "18",
    rx: "3",
    transform: "translate(421 279)",
    fill: "#d3dbe6"
  }), /*#__PURE__*/_react.default.createElement("g", {
    fill: "#f8fafd"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M429.844 291.486a.24.24 0 0 0 .157.056h.007a.232.232 0 0 0 .172-.075l1.966-1.688a.175.175 0 0 0 0-.273.247.247 0 0 0-.315 0l-1.6 1.376v-6.23a.209.209 0 0 0-.223-.193.209.209 0 0 0-.223.193v6.242l-1.616-1.39a.248.248 0 0 0-.315 0 .175.175 0 0 0 0 .273Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M430.008 291.742h-.032a.436.436 0 0 1-.263-.1l-1.987-1.712a.382.382 0 0 1-.136-.287.382.382 0 0 1 .133-.288.442.442 0 0 1 .29-.106.439.439 0 0 1 .287.1l1.286 1.1v-5.797a.409.409 0 0 1 .423-.393.409.409 0 0 1 .423.393v5.795l1.27-1.095a.436.436 0 0 1 .287-.1.44.44 0 0 1 .29.107.382.382 0 0 1 .133.288.382.382 0 0 1-.135.287l-1.958 1.678a.435.435 0 0 1-.311.13Zm-.007-.409.022.006a.031.031 0 0 0 .01-.007l.017-.017 1.94-1.666a.043.043 0 0 0-.026.007l-1.933 1.66v-6.654a.075.075 0 0 0-.045 0v6.665l-1.947-1.675a.043.043 0 0 0-.027-.008l1.963 1.69h.008Z"
  }))), /*#__PURE__*/_react.default.createElement("path", {
    d: "M9 2h.007A.55.55 0 0 1 9 3.1.55.55 0 0 1 9 2Zm2.81.642a.548.548 0 0 1 .24.058h.007a.55.55 0 0 1-.482.989.55.55 0 0 1 .235-1.047Zm2.248 1.806a.549.549 0 0 1 .431.209.55.55 0 0 1-.864.681.55.55 0 0 1 .431-.892Zm1.24 2.6a.55.55 0 0 1 .536.429v.007a.55.55 0 1 1-1.074.237.551.551 0 0 1 .54-.671Zm-.02 2.885a.55.55 0 0 1 .536.674v.007a.55.55 0 1 1-1.071-.253.55.55 0 0 1 .535-.426ZM14 12.52a.55.55 0 0 1 .427.9.551.551 0 1 1-.852-.7.549.549 0 0 1 .425-.2Zm-2.269 1.775a.55.55 0 0 1 .234 1.048h-.005a.552.552 0 0 1-.466-1 .548.548 0 0 1 .237-.048Zm-2.823.6h.012A.553.553 0 0 1 8.906 16H8.9a.55.55 0 0 1 .008-1.1Zm-2.8-.683a.548.548 0 0 1 .246.059.55.55 0 0 1-.492.984h-.006a.55.55 0 0 1 .248-1.041Zm-2.224-1.833a.549.549 0 0 1 .436.215.55.55 0 0 1-.871.672.55.55 0 0 1 .435-.885Zm-1.2-2.62a.55.55 0 0 1 .538.439.55.55 0 0 1-1.077.225v-.003a.55.55 0 0 1 .539-.661Zm.06-2.884a.551.551 0 0 1 .534.684.55.55 0 0 1-1.069-.259v-.011a.55.55 0 0 1 .534-.414Zm1.311-2.566a.55.55 0 0 1 .421.9.55.55 0 0 1-.844-.705.549.549 0 0 1 .423-.195Zm2.298-1.743a.55.55 0 0 1 .226 1.052.55.55 0 0 1-.453-1h.005a.548.548 0 0 1 .222-.052Z",
    fill: "#f8fafd"
  })));
};
DowngradeIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18"
};
var UpgradeIcon = function UpgradeIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    transform: "rotate(180 219.5 148.5)"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "18",
    height: "18",
    rx: "3",
    transform: "translate(421 279)",
    fill: "#d3dbe6"
  }), /*#__PURE__*/_react.default.createElement("g", {
    fill: "#f8fafd"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M429.844 291.486a.24.24 0 0 0 .157.056h.007a.232.232 0 0 0 .172-.075l1.966-1.688a.175.175 0 0 0 0-.273.247.247 0 0 0-.315 0l-1.6 1.376v-6.23a.209.209 0 0 0-.223-.193.209.209 0 0 0-.223.193v6.242l-1.616-1.39a.248.248 0 0 0-.315 0 .175.175 0 0 0 0 .273Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M430.008 291.742h-.032a.436.436 0 0 1-.263-.1l-1.987-1.712a.382.382 0 0 1-.136-.287.382.382 0 0 1 .133-.288.442.442 0 0 1 .29-.106.439.439 0 0 1 .287.1l1.286 1.1v-5.797a.409.409 0 0 1 .423-.393.409.409 0 0 1 .423.393v5.795l1.27-1.095a.436.436 0 0 1 .287-.1.44.44 0 0 1 .29.107.382.382 0 0 1 .133.288.382.382 0 0 1-.135.287l-1.958 1.678a.435.435 0 0 1-.311.13Zm-.007-.409.022.006a.031.031 0 0 0 .01-.007l.017-.017 1.94-1.666a.043.043 0 0 0-.026.007l-1.933 1.66v-6.654a.075.075 0 0 0-.045 0v6.665l-1.947-1.675a.043.043 0 0 0-.027-.008l1.963 1.69h.008Z"
  }))), /*#__PURE__*/_react.default.createElement("path", {
    d: "M9 16h-.007A.55.55 0 0 1 9 14.9.55.55 0 0 1 9 16Zm-2.81-.642a.548.548 0 0 1-.24-.058h-.007a.55.55 0 0 1 .482-.989.55.55 0 0 1-.235 1.047Zm-2.248-1.806a.549.549 0 0 1-.431-.209.55.55 0 0 1 .864-.681.55.55 0 0 1-.431.892Zm-1.24-2.6a.55.55 0 0 1-.536-.429v-.007a.55.55 0 1 1 1.074-.237.551.551 0 0 1-.54.671Zm.02-2.885a.55.55 0 0 1-.536-.674v-.007a.55.55 0 1 1 1.071.253.55.55 0 0 1-.535.426ZM4 5.48a.55.55 0 0 1-.427-.9.551.551 0 1 1 .852.7.549.549 0 0 1-.425.2Zm2.269-1.775a.55.55 0 0 1-.234-1.048h.005a.552.552 0 0 1 .466 1 .548.548 0 0 1-.237.048Zm2.823-.6H9.08A.553.553 0 0 1 9.094 2H9.1a.55.55 0 0 1-.008 1.1Zm2.8.683a.548.548 0 0 1-.246-.059.55.55 0 0 1 .492-.984h.006a.55.55 0 0 1-.248 1.041Zm2.224 1.833a.549.549 0 0 1-.436-.215.55.55 0 0 1 .871-.672.55.55 0 0 1-.435.885Zm1.2 2.62a.55.55 0 0 1-.538-.439.55.55 0 0 1 1.077-.225v.003a.55.55 0 0 1-.539.661Zm-.06 2.884a.551.551 0 0 1-.534-.684.55.55 0 0 1 1.069.259v.011a.55.55 0 0 1-.534.414Zm-1.311 2.566a.55.55 0 0 1-.421-.9.55.55 0 0 1 .844.705.549.549 0 0 1-.423.195Zm-2.298 1.743a.55.55 0 0 1-.226-1.052.55.55 0 0 1 .453 1h-.005a.548.548 0 0 1-.222.052Z",
    fill: "#f8fafd"
  })));
};
UpgradeIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18"
};
var OfferCard = function OfferCard(_ref) {
  var period = _ref.period,
    offerType = _ref.offerType,
    title = _ref.title,
    description = _ref.description,
    currency = _ref.currency,
    price = _ref.price,
    isTrialAvailable = _ref.isTrialAvailable,
    showInfoBox = _ref.showInfoBox,
    isDataLoaded = _ref.isDataLoaded,
    paymentMethod = _ref.paymentMethod,
    isMyAccount = _ref.isMyAccount,
    pendingSwitchId = _ref.pendingSwitchId,
    expiresAt = _ref.expiresAt,
    showInnerPopup = _ref.showInnerPopup,
    offerId = _ref.offerId,
    t = _ref.t;
  var planDetailsState = (0, _reactRedux.useSelector)(function (state) {
    return state.planDetails;
  });
  var switchDetails = planDetailsState.switchDetails[pendingSwitchId];
  var getSwitchCopy = function getSwitchCopy() {
    if (switchDetails) {
      var subscriptionExpirationDate = (0, _planHelper.dateFormat)(planDetailsState.currentPlan.find(function (sub) {
        return sub.pendingSwitchId === pendingSwitchId;
      }).expiresAt);
      var switchTitle = switchDetails.title,
        fromOfferId = switchDetails.fromOfferId,
        toOfferId = switchDetails.toOfferId;
      var translatedTitle = t("offer-title-".concat(fromOfferId), title);
      var translatedSwitchTitle = t("offer-title-".concat(toOfferId), switchTitle);
      switch (switchDetails.algorithm) {
        case 'IMMEDIATE_WITHOUT_PRORATION':
          return t("Your switch is pending and should be completed within few minutes. You will be charged a new price starting {{subscriptionExpirationDate}}.{{translatedSwitchTitle}} renews automatically. You can cancel anytime.", {
            subscriptionExpirationDate: subscriptionExpirationDate,
            translatedSwitchTitle: translatedSwitchTitle
          });
        case 'IMMEDIATE_AND_CHARGE_WITH_REFUND':
        case 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION':
          return t("Your switch is pending and should be completed within few minutes. You will be charged a new price immediately and get access to {{translatedSwitchTitle}}. You can cancel anytime.", {
            translatedSwitchTitle: translatedSwitchTitle
          });
        case 'DEFERRED':
          return t("Your switch is pending. You will have access to {{translatedTitle}} until {{subscriptionExpirationDate}}. From that time you will be charged your new price and will have access to {{translatedSwitchTitle}}. You can cancel this at any time.", {
            translatedTitle: translatedTitle,
            subscriptionExpirationDate: subscriptionExpirationDate,
            translatedSwitchTitle: translatedSwitchTitle
          });
        default:
          return '';
      }
    } else return '';
  };
  var getSwitchIcon = function getSwitchIcon() {
    if (switchDetails) {
      switch (switchDetails.direction) {
        case 'downgrade':
          return DowngradeIcon;
        case 'upgrade':
          return UpgradeIcon;
        default:
          return null;
      }
    } else return null;
  };
  var mapCode = {
    TO_OFFER_COUNTRY_NOT_ALLOWED: {
      text: t("This plan is <strong>currently unavailable</strong> in your country or region"),
      icon: BlockedIcon
    },
    ALREADY_HAS_ACCESS: {
      text: t('It looks like you already have access to this offer'),
      icon: BlockedIcon
    },
    TO_FREE_OFFER_NOT_ALLOWED: {
      text: t('Switching from a paid to a free offer is not possible'),
      icon: BlockedIcon
    },
    SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
      text: t("You can't change your subscription if a coupon was applied. To change plan, please cancel your current subscription and purchase a new one."),
      icon: BlockedIcon
    },
    SWITCH_IN_PROGRESS: {
      text: t('Another switch is already in progress. Wait until the process finalization'),
      icon: BlockedIcon
    },
    INAPP_SUBSCRIPTION: {
      text: t("".concat(paymentMethod ? "Subscription purchased via ".concat(paymentMethod, ". ") : "", "Use an external service to edit the plan.")),
      icon: EditBlockedIcon
    },
    SWITCH: {
      text: getSwitchCopy(),
      icon: getSwitchIcon()
    }
  };
  var IconComponent = showInfoBox && mapCode[showInfoBox] && mapCode[showInfoBox].icon ? mapCode[showInfoBox].icon : _react.default.Fragment;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_OfferCardStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 50,
    height: 50
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionIcon.default, {
    period: period || offerType
  })), /*#__PURE__*/_react.default.createElement(_OfferCardStyled.InnerWrapper, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 200,
    margin: "0 0 10px 10px"
  }, /*#__PURE__*/_react.default.createElement(_OfferCardStyled.TitleStyled, null, t("offer-title-".concat(offerId), title))), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 300,
    margin: "0 0 10px 10px"
  }, /*#__PURE__*/_react.default.createElement(_OfferCardStyled.DescriptionStyled, {
    dangerouslySetInnerHTML: {
      __html: description
    }
  }))), /*#__PURE__*/_react.default.createElement(_OfferCardStyled.PriceWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 80,
    height: 30
  }, isTrialAvailable && /*#__PURE__*/_react.default.createElement(_OfferCardStyled.TrialBadgeStyled, null, t('trial period')), (isMyAccount && offerType === 'S' || !isMyAccount) && /*#__PURE__*/_react.default.createElement(_Price.default, {
    currency: currency,
    price: price,
    period: offerType === 'S' ? t("offer-price.period-".concat(period), period) : null
  })))), showInfoBox ? mapCode[showInfoBox] && mapCode[showInfoBox].text && /*#__PURE__*/_react.default.createElement(_OfferCardStyled.SubBoxStyled, null, /*#__PURE__*/_react.default.createElement(IconComponent, null), /*#__PURE__*/_react.default.createElement(_OfferCardStyled.SubBoxContentStyled, null, /*#__PURE__*/_react.default.createElement(_OfferCardStyled.BoxTextStyled, {
    dangerouslySetInnerHTML: {
      __html: mapCode[showInfoBox].text
    }
  }), showInfoBox === 'SWITCH' && switchDetails.algorithm === 'DEFERRED' && /*#__PURE__*/_react.default.createElement(_OfferCardStyled.SubBoxButtonStyled, {
    onClick: function onClick() {
      window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-button-clicked', {
        detail: {
          pendingSwitchId: pendingSwitchId,
          fromOfferId: switchDetails.fromOfferId,
          toOfferId: switchDetails.toOfferId
        }
      }));
      showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.cancelSwitch,
        data: {
          pendingSwitchId: pendingSwitchId,
          switchDirection: switchDetails.direction,
          switchOfferTitle: switchDetails.title,
          baseOfferTitle: title,
          baseOfferExpirationDate: expiresAt,
          baseOfferPrice: "".concat(currency).concat(price)
        }
      });
    }
  }, t('Cancel switch')))) : '');
};
exports.PureOfferCard = OfferCard;
OfferCard.propTypes = {
  period: _propTypes.default.string,
  offerType: _propTypes.default.string,
  title: _propTypes.default.string,
  description: _propTypes.default.string,
  currency: _propTypes.default.string,
  price: _propTypes.default.number,
  isTrialAvailable: _propTypes.default.bool,
  showInfoBox: _propTypes.default.string,
  isDataLoaded: _propTypes.default.bool,
  paymentMethod: _propTypes.default.string,
  t: _propTypes.default.func,
  isMyAccount: _propTypes.default.bool,
  pendingSwitchId: _propTypes.default.string,
  expiresAt: _propTypes.default.string,
  showInnerPopup: _propTypes.default.func,
  offerId: _propTypes.default.string
};
OfferCard.defaultProps = {
  period: '',
  offerType: '',
  title: '',
  description: '',
  currency: '',
  price: null,
  isTrialAvailable: false,
  showInfoBox: null,
  isDataLoaded: true,
  paymentMethod: '',
  t: function t(k) {
    return k;
  },
  isMyAccount: false,
  pendingSwitchId: null,
  expiresAt: '',
  showInnerPopup: function showInnerPopup() {},
  offerId: ''
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(OfferCard));
exports.default = _default;