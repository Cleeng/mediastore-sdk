"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureFreeOffer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _submitPaymentWithoutDetails = _interopRequireDefault(require("api/Offer/submitPaymentWithoutDetails"));

var _appConfigHelper = require("util/appConfigHelper");

var _planHelper = require("util/planHelper");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _FreeOfferStyled = require("./FreeOfferStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FreeOffer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FreeOffer, _Component);

  var _super = (0, _createSuper2.default)(FreeOffer);

  function FreeOffer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FreeOffer);
    _this = _super.call(this, props);

    _this.generateDescriptionForFreeOffer = function (period, expiresAt, startTime) {
      var offerType = (0, _appConfigHelper.getData)('CLEENG_OFFER_TYPE');

      switch (offerType) {
        case 'S':
          {
            return "Free subscription";
          }

        case 'P':
          {
            if (!period) {
              return "Access until ".concat((0, _planHelper.dateFormat)(expiresAt, true));
            }

            return "".concat(_planHelper.periodMapper[period].accessText, " free pass");
          }

        case 'E':
          {
            return "Free event ".concat(startTime ? (0, _planHelper.dateFormat)(startTime, true) : '');
          }

        case 'R':
          {
            return "".concat(_planHelper.periodMapper[period].accessText, " free access");
          }

        case 'A':
          return 'Unlimited access';

        default:
          return '';
      }
    };

    _this.getAccessToFreeOffer = function () {
      var _this$props = _this.props,
          onPaymentComplete = _this$props.onPaymentComplete,
          t = _this$props.t;

      _this.setState({
        isLoading: true,
        error: ''
      });

      (0, _submitPaymentWithoutDetails.default)().then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          if (paymentReponse.errors[0].includes("Order doesn't have paymentMethodId")) {
            _this.setState({
              isLoading: false,
              error: t('Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer')
            });
          } else {
            _this.setState({
              isLoading: false,
              error: t('Oops, something went wrong! Please, reload the page and try again')
            });
          }
        } else {
          onPaymentComplete();
        }
      });
    };

    _this.state = {
      isLoading: false,
      error: ''
    };
    return _this;
  }

  (0, _createClass2.default)(FreeOffer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          icon = _this$props2.icon,
          period = _this$props2.period,
          expiresAt = _this$props2.expiresAt,
          startTime = _this$props2.startTime,
          title = _this$props2.title,
          t = _this$props2.t;
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      return /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.CardStyled, null, /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.SubscriptionIconStyled, {
        icon: icon
      }), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.TitleStyled, null, title), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.DescriptionStyled, null, this.generateDescriptionForFreeOffer(period, expiresAt, startTime)), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        width: "200px",
        onClickFn: this.getAccessToFreeOffer,
        disabled: isLoading
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Get Access')), error && /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.ErrorMessageStyled, null, error)), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.SubTextStyled, null, t('Free, no additional cost'))));
    }
  }]);
  return FreeOffer;
}(_react.Component);

exports.PureFreeOffer = FreeOffer;
FreeOffer.defaultProps = {
  icon: '',
  title: '',
  period: '',
  expiresAt: null,
  startTime: null,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(FreeOffer));

exports.default = _default;