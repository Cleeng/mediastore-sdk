"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureUpdateProfile = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../labeling"));
var _SectionHeader = _interopRequireDefault(require("../../components/SectionHeader"));
var _ProfileDetails = _interopRequireDefault(require("../../components/ProfileDetails"));
var _AddressDetails = _interopRequireDefault(require("../../components/AddressDetails"));
var _Password = _interopRequireDefault(require("../../components/Password"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _api = require("../../api");
var _MyAccountError = _interopRequireDefault(require("../../components/MyAccountError"));
var _MyAccountConsents = _interopRequireDefault(require("../../components/MyAccountConsents"));
var _EditPassword = _interopRequireDefault(require("../../components/EditPassword/EditPassword"));
var _AdditionalProfileInfo = _interopRequireDefault(require("../../components/AdditionalProfileInfo"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _UpdateProfileStyled = _interopRequireDefault(require("./UpdateProfileStyled"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var UpdateProfile = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(UpdateProfile, _Component);
  var _super = _createSuper(UpdateProfile);
  function UpdateProfile(props) {
    var _this;
    (0, _classCallCheck2.default)(this, UpdateProfile);
    _this = _super.call(this, props);
    _this.getObjectByKey = function (array, key) {
      return array.find(function (setting) {
        return setting.key === key;
      });
    };
    _this.state = {
      detailsError: [],
      isUserDetailsLoading: false,
      isCaptureLoading: false,
      isConsentLoading: false
    };
    return _this;
  }
  (0, _createClass2.default)(UpdateProfile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props = this.props,
        userProfile = _this$props.userProfile,
        setCurrentUser = _this$props.setCurrentUser,
        setUserCapture = _this$props.setUserCapture,
        t = _this$props.t;
      if (!userProfile.user) {
        this.setState({
          isUserDetailsLoading: true
        });
        (0, _api.getCustomer)().then(function (response) {
          if (response.errors.length) {
            _this2.setState({
              detailsError: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
          _this2.setState({
            isUserDetailsLoading: false
          });
        }).catch(function () {
          _this2.setState({
            detailsError: [t('Something went wrong..')],
            isUserDetailsLoading: false
          });
        });
      }
      if (!userProfile.capture) {
        this.setState({
          isCaptureLoading: true
        });
        (0, _api.getCaptureStatus)().then(function (response) {
          if (response.errors.length) {
            _this2.setState({
              detailsError: response.errors
            });
          } else {
            setUserCapture(response.responseData);
          }
          _this2.setState({
            isCaptureLoading: false
          });
        }).catch(function () {
          _this2.setState({
            detailsError: [t('Something went wrong..')],
            isCaptureLoading: false
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState = function () {};
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        detailsError = _this$state.detailsError,
        isUserDetailsLoading = _this$state.isUserDetailsLoading,
        isCaptureLoading = _this$state.isCaptureLoading,
        isConsentLoading = _this$state.isConsentLoading;
      var _this$props2 = this.props,
        _this$props2$userProf = _this$props2.userProfile,
        user = _this$props2$userProf.user,
        consents = _this$props2$userProf.consents,
        capture = _this$props2$userProf.capture,
        consentsError = _this$props2$userProf.consentsError,
        setConsents = _this$props2.setConsents,
        setCurrentUser = _this$props2.setCurrentUser,
        updateCaptureOption = _this$props2.updateCaptureOption,
        _showInnerPopup = _this$props2.showInnerPopup,
        hideInnerPopup = _this$props2.hideInnerPopup,
        innerPopup = _this$props2.innerPopup,
        t = _this$props2.t;
      var address = capture && capture.isCaptureEnabled ? capture.settings.filter(function (setting) {
        return setting.key === 'address';
      })[0] : null;
      var customSettings = capture && capture.isCaptureEnabled ? capture.settings.filter(function (setting) {
        return setting.key.startsWith('custom') && setting.enabled;
      }) : null;
      var birthDate = capture && capture.isCaptureEnabled ? this.getObjectByKey(capture.settings, 'birthDate') : null;
      var companyName = capture && capture.isCaptureEnabled ? this.getObjectByKey(capture.settings, 'companyName') : null;
      var phoneNumber = capture && capture.isCaptureEnabled ? this.getObjectByKey(capture.settings, 'phoneNumber') : null;
      return /*#__PURE__*/_react.default.createElement(_UpdateProfileStyled.default, null, innerPopup.isOpen && innerPopup.type === 'editPassword' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EditPassword.default, {
        hideInnerPopup: hideInnerPopup,
        customerEmail: user.email
      })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, t('Profile details')), detailsError.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        generalError: true
      }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ProfileDetails.default, {
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        isLoading: isUserDetailsLoading || isCaptureLoading,
        setCurrentUser: setCurrentUser,
        updateCaptureOption: updateCaptureOption,
        birthDate: birthDate,
        companyName: companyName,
        phoneNumber: phoneNumber
      }), address && address.enabled && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, t('Address details')), /*#__PURE__*/_react.default.createElement(_AddressDetails.default, {
        data: address,
        isLoading: isCaptureLoading,
        updateCaptureOption: updateCaptureOption
      })), /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
        marginTop: "25px"
      }, t('Password')), /*#__PURE__*/_react.default.createElement(_Password.default, {
        showInnerPopup: function showInnerPopup() {
          return _showInnerPopup({
            type: _innerPopupReducer.POPUP_TYPES.editPassword
          });
        }
      }), customSettings && customSettings.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, t('Additional Options')), /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfo.default, {
        data: customSettings,
        updateCaptureOption: updateCaptureOption
      }))), /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
        marginTop: "25px"
      }, ' ', t('Terms Details')), consentsError.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        generalError: true
      }) : /*#__PURE__*/_react.default.createElement(_MyAccountConsents.default, {
        consents: consents,
        isLoading: isConsentLoading,
        setConsents: setConsents
      })));
    }
  }]);
  return UpdateProfile;
}(_react.Component);
exports.PureUpdateProfile = UpdateProfile;
UpdateProfile.propTypes = {
  setCurrentUser: _propTypes.default.func.isRequired,
  setConsents: _propTypes.default.func.isRequired,
  setUserCapture: _propTypes.default.func.isRequired,
  updateCaptureOption: _propTypes.default.func.isRequired,
  consentsError: _propTypes.default.string,
  userProfile: _propTypes.default.shape({
    id: _propTypes.default.number,
    email: _propTypes.default.string,
    firstName: _propTypes.default.string,
    lastName: _propTypes.default.string,
    country: _propTypes.default.string,
    regDate: _propTypes.default.string,
    lastLoginDate: _propTypes.default.string,
    lastUserIp: _propTypes.default.string,
    externalId: _propTypes.default.string,
    externalData: _propTypes.default.shape()
  }),
  showInnerPopup: _propTypes.default.func.isRequired,
  hideInnerPopup: _propTypes.default.func.isRequired,
  innerPopup: _propTypes.default.shape({
    isOpen: _propTypes.default.bool,
    type: _propTypes.default.string,
    data: _propTypes.default.object
  }).isRequired,
  t: _propTypes.default.func
};
UpdateProfile.defaultProps = {
  userProfile: {
    user: null
  },
  consentsError: '',
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(UpdateProfile));
exports.default = _default;