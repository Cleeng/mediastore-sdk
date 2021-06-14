"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionCard = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _SubscriptionIcon = _interopRequireDefault(require("components/SubscriptionIcon"));

var _Price = _interopRequireDefault(require("components/Price"));

var _appConfigHelper = require("util/appConfigHelper");

var _blocked = require("assets/images/blocked.svg");

var _SkeletonWrapper = _interopRequireDefault(require("components/SkeletonWrapper"));

var _SubscriptionCardStyled = require("./SubscriptionCardStyled");

var SubscriptionCard = function SubscriptionCard(_ref) {
  var period = _ref.period,
      title = _ref.title,
      description = _ref.description,
      currency = _ref.currency,
      price = _ref.price,
      isTrialAvailable = _ref.isTrialAvailable,
      showInfoBox = _ref.showInfoBox,
      isSubscriptionOffer = _ref.isSubscriptionOffer,
      isDataLoaded = _ref.isDataLoaded,
      t = _ref.t;
  var isSubscription = (0, _appConfigHelper.getData)('CLEENG_OFFER_TYPE') === 'S' || isSubscriptionOffer;
  var mapCode = {
    TO_OFFER_COUNTRY_NOT_ALLOWED: {
      text: t("This plan is <strong>not currently available</strong> in your country or region"),
      icon: _blocked.ReactComponent
    },
    ALREADY_HAS_ACCESS: {
      text: t('It looks like you already have access to this offer'),
      icon: _blocked.ReactComponent
    },
    TO_FREE_OFFER_NOT_ALLOWED: {
      text: t('Switching from a paid to a free offer is not possible'),
      icon: _blocked.ReactComponent
    },
    SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
      text: t('You can`t upgrade your subscription if coupon was applied.'),
      icon: _blocked.ReactComponent
    }
  };
  var IconComponent = showInfoBox && mapCode[showInfoBox].icon ? mapCode[showInfoBox].icon : _react.default.Fragment;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 50,
    height: 50
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionIcon.default, {
    period: period
  })), /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.InnerWrapper, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 200,
    margin: "0 0 10px 10px"
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.TitleStyled, null, title)), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 300,
    margin: "0 0 10px 10px"
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.DescriptionStyled, {
    dangerouslySetInnerHTML: {
      __html: description
    }
  }))), /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.PriceWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    width: 80,
    height: 30
  }, isTrialAvailable && /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.TrialBadgeStyled, null, t('trial period')), /*#__PURE__*/_react.default.createElement(_Price.default, {
    currency: currency,
    price: price,
    period: isSubscription ? period : null
  })))), showInfoBox ? /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.SubBoxStyled, null, /*#__PURE__*/_react.default.createElement(IconComponent, null), /*#__PURE__*/_react.default.createElement(_SubscriptionCardStyled.BoxTextStyled, {
    dangerouslySetInnerHTML: {
      __html: mapCode[showInfoBox].text
    }
  })) : '');
};

exports.PureSubscriptionCard = SubscriptionCard;
SubscriptionCard.defaultProps = {
  period: '',
  title: '',
  description: '',
  currency: '',
  price: null,
  isTrialAvailable: false,
  showInfoBox: null,
  isSubscriptionOffer: false,
  isDataLoaded: true,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionCard));

exports.default = _default;