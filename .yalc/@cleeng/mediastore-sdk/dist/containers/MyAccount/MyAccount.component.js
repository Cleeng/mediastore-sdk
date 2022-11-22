"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureMyAccount = exports.MY_ACCOUNT_PAGES = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../labeling"));
var _MyAccountMenu = _interopRequireDefault(require("../../components/MyAccountMenu"));
var _MyAccountUserInfo = _interopRequireDefault(require("../../components/MyAccountUserInfo"));
var _MyAccountContent = _interopRequireDefault(require("../../components/MyAccountContent"));
var _PlanDetails = _interopRequireDefault(require("../PlanDetails"));
var _PaymentInfo = _interopRequireDefault(require("../PaymentInfo"));
var _UpdateProfile = _interopRequireDefault(require("../UpdateProfile"));
var _Popup = _interopRequireDefault(require("../../components/Popup/Popup"));
var _Login = _interopRequireDefault(require("../../components/LoginPage/Login"));
var _api = require("../../api");
var _Footer = _interopRequireDefault(require("../../components/Footer"));
var _MyAccountError = _interopRequireDefault(require("../../components/MyAccountError/MyAccountError"));
var _deletePaymentDetails = _interopRequireDefault(require("../../api/PaymentDetails/deletePaymentDetails"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _paymentMethodHelper = require("../../util/paymentMethodHelper");
var _MyAccountStyled = require("./MyAccountStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var POPUP_TYPE = {
  notCheckedTerms: 'notCheckedTerms',
  complexUpdate: 'complexUpdate',
  termsUpdateRequired: 'termsUpdateRequired',
  consentsUpdateRequired: 'consentsUpdateRequired'
};
var MY_ACCOUNT_PAGES = {
  planDetails: 'planDetails',
  paymentInfo: 'paymentInfo',
  updateProfile: 'updateProfile'
};
exports.MY_ACCOUNT_PAGES = MY_ACCOUNT_PAGES;
var MyAccount = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccount, _Component);
  var _super = _createSuper(MyAccount);
  function MyAccount(props) {
    var _this;
    (0, _classCallCheck2.default)(this, MyAccount);
    _this = _super.call(this, props);
    _this.goToPage = function (pageName) {
      _this.setState({
        currentPage: pageName
      });
    };
    _this.renderMyAccountContent = function (currentPage) {
      var _this$props = _this.props,
        customCancellationReasons = _this$props.customCancellationReasons,
        skipAvailableDowngradesStep = _this$props.skipAvailableDowngradesStep;
      switch (currentPage) {
        case MY_ACCOUNT_PAGES.planDetails:
          return /*#__PURE__*/_react.default.createElement(_PlanDetails.default, {
            customCancellationReasons: customCancellationReasons,
            skipAvailableDowngradesStep: skipAvailableDowngradesStep
          });
        case MY_ACCOUNT_PAGES.paymentInfo:
          return /*#__PURE__*/_react.default.createElement(_PaymentInfo.default, null);
        case MY_ACCOUNT_PAGES.updateProfile:
          return /*#__PURE__*/_react.default.createElement(_UpdateProfile.default, null);
        default:
          return null;
      }
    };
    _this.state = {
      isLogged: false,
      currentPage: MY_ACCOUNT_PAGES.planDetails,
      errors: []
    };
    return _this;
  }
  (0, _createClass2.default)(MyAccount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props2 = this.props,
        planDetails = _this$props2.planDetails,
        userProfile = _this$props2.userProfile,
        setCurrentPlan = _this$props2.setCurrentPlan,
        setCurrentUser = _this$props2.setCurrentUser,
        setConsents = _this$props2.setConsents,
        setConsentsError = _this$props2.setConsentsError,
        setPublisherPaymentMethods = _this$props2.setPublisherPaymentMethods,
        availablePaymentMethodIds = _this$props2.availablePaymentMethodIds;
      document.title = 'My Account';
      if (_auth.default.isLogged()) {
        if (userProfile.consents.length === 0) {
          (0, _api.getCustomerConsents)().then(function (response) {
            if (!response.errors.length) {
              setConsents(response.responseData.consents);
              _this2.checkTerms();
            } else {
              setConsentsError(response.errors[0]);
            }
          }).catch(function () {
            return setConsentsError('Something went wrong..');
          });
        }
        if (planDetails.currentPlan.length === 0) {
          (0, _api.getCustomerOffers)().then(function (response) {
            if (response.errors.length) {
              _this2.setState({
                errors: response.errors
              });
            } else {
              setCurrentPlan(response.responseData.items);
            }
          });
        }
        if (!userProfile.user) {
          (0, _api.getCustomer)().then(function (response) {
            if (response.errors.length) {
              _this2.setState({
                errors: response.errors
              });
            } else {
              setCurrentUser(response.responseData);
            }
          });
        }
        if ((0, _paymentMethodHelper.areProvidedPaymentMethodIdsValid)(availablePaymentMethodIds)) {
          setPublisherPaymentMethods(availablePaymentMethodIds);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;
      var _this$props3 = this.props,
        consents = _this$props3.userProfile.consents,
        userProfile = _this$props3.userProfile,
        setCurrentUser = _this$props3.setCurrentUser,
        setConsents = _this$props3.setConsents,
        setConsentsError = _this$props3.setConsentsError;
      if (prevProps.userProfile.consents !== consents) {
        this.checkTerms();
      }
      if (_auth.default.isLogged()) {
        if (userProfile.consents.length === 0) {
          (0, _api.getCustomerConsents)().then(function (response) {
            if (!response.errors.length) {
              setConsents(response.responseData.consents);
              _this3.checkTerms();
            } else {
              setConsentsError(response.errors[0]);
            }
          }).catch(function () {
            return setConsentsError('Something went wrong..');
          });
        }
        if (!userProfile.user) {
          (0, _api.getCustomer)().then(function (response) {
            if (response.errors.length) {
              _this3.setState({
                errors: response.errors
              });
            } else {
              setCurrentUser(response.responseData);
            }
          });
        }

        // delete old payment details when paypal payment details were updated successfully
        var paymentDetailsToDelete = new URLSearchParams(window.location.search).get('deletepd');
        if (parseInt(paymentDetailsToDelete, 10)) {
          (0, _deletePaymentDetails.default)(paymentDetailsToDelete);
        }
      }
    }
  }, {
    key: "checkTerms",
    value: function checkTerms() {
      var consents = this.props.userProfile.consents;
      if (consents.length !== 0) {
        // Not checked required terms
        var notCheckedTerms = consents.filter(function (item) {
          return item.required && item.state === 'declined' && item.version === item.newestVersion;
        });
        if (notCheckedTerms.length) {
          this.renderPopup(true, POPUP_TYPE.notCheckedTerms, notCheckedTerms);
          return;
        }

        // New version of terms and consents
        var consentsUpdateRequired = consents.filter(function (item) {
          return !item.required && item.needsUpdate === true;
        });
        var termsUpdateRequired = consents.filter(function (item) {
          return item.required && item.version !== item.newestVersion;
        });
        if (termsUpdateRequired.length && consentsUpdateRequired.length) {
          this.renderPopup(true, POPUP_TYPE.complexUpdate, [].concat((0, _toConsumableArray2.default)(termsUpdateRequired), (0, _toConsumableArray2.default)(consentsUpdateRequired)));
        } else if (termsUpdateRequired.length) {
          this.renderPopup(true, POPUP_TYPE.termsUpdateRequired, termsUpdateRequired);
        } else if (consentsUpdateRequired.length) {
          this.renderPopup(true, POPUP_TYPE.consentsUpdateRequired, consentsUpdateRequired);
        } else {
          // hide popup after submitting
          this.renderPopup(false);
        }
      }
    }
  }, {
    key: "renderPopup",
    value: function renderPopup(isOpen) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var consents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var _this$props4 = this.props,
        showPopup = _this$props4.showPopup,
        hidePopup = _this$props4.hidePopup;
      if (isOpen) {
        showPopup({
          type: type,
          consents: consents
        });
      } else hidePopup();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props5 = this.props,
        currentPlan = _this$props5.planDetails.currentPlan,
        _this$props5$userProf = _this$props5.userProfile,
        user = _this$props5$userProf.user,
        consentsError = _this$props5$userProf.consentsError,
        setConsents = _this$props5.setConsents,
        _this$props5$popup = _this$props5.popup,
        isPopupShown = _this$props5$popup.isPopupShown,
        popupType = _this$props5$popup.popupType,
        consents = _this$props5$popup.consents,
        hidePopup = _this$props5.hidePopup,
        t = _this$props5.t;
      var currentPage = this.state.currentPage;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, consentsError ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        generalError: true,
        fullHeight: true
      }) : isPopupShown ? /*#__PURE__*/_react.default.createElement(_Popup.default, {
        setConsents: setConsents,
        popupType: popupType,
        consents: consents,
        customerEmail: user ? user.email : '',
        hidePopup: hidePopup
      }) : !_auth.default.isLogged() ? /*#__PURE__*/_react.default.createElement(_Login.default, {
        isMyAccount: true,
        onSuccess: function onSuccess() {
          return _this4.setState({
            isLogged: true
          });
        }
      }) : /*#__PURE__*/_react.default.createElement(_MyAccountStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountStyled.HeaderStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountUserInfo.default, {
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        subscription: currentPlan[0] ? t("offer-title-".concat(currentPlan[0].offerId), currentPlan[0].offerTitle) : '',
        isDataLoaded: !!user && !!currentPlan
      }), /*#__PURE__*/_react.default.createElement(_MyAccountMenu.default, {
        currentPage: currentPage,
        goToPage: this.goToPage
      }), /*#__PURE__*/_react.default.createElement(_Footer.default, {
        isCheckout: false,
        isTransparent: true
      })), /*#__PURE__*/_react.default.createElement(_MyAccountContent.default, null, this.renderMyAccountContent(currentPage))));
    }
  }]);
  return MyAccount;
}(_react.Component);
exports.PureMyAccount = MyAccount;
MyAccount.propTypes = {
  setCurrentPlan: _propTypes.default.func.isRequired,
  setCurrentUser: _propTypes.default.func.isRequired,
  setConsents: _propTypes.default.func.isRequired,
  setConsentsError: _propTypes.default.func.isRequired,
  setPublisherPaymentMethods: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.objectOf(_propTypes.default.any),
  planDetails: _propTypes.default.objectOf(_propTypes.default.any),
  popup: _propTypes.default.objectOf(_propTypes.default.any),
  showPopup: _propTypes.default.func.isRequired,
  hidePopup: _propTypes.default.func.isRequired,
  customCancellationReasons: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    value: _propTypes.default.string.isRequired
  })),
  skipAvailableDowngradesStep: _propTypes.default.bool,
  availablePaymentMethodIds: _propTypes.default.shape({
    adyen: _propTypes.default.number,
    paypal: _propTypes.default.number
  }),
  t: _propTypes.default.func
};
MyAccount.defaultProps = {
  userProfile: {
    user: null
  },
  planDetails: {
    currentPlan: []
  },
  popup: {
    isPopupShown: false
  },
  customCancellationReasons: null,
  availablePaymentMethodIds: null,
  t: function t(k) {
    return k;
  },
  skipAvailableDowngradesStep: false
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(MyAccount));
exports.default = _default;