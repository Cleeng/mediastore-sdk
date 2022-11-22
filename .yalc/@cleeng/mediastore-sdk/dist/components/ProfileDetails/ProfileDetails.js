"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureProfileDetails = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Card = _interopRequireDefault(require("../Card"));
var _MyAccountInput = _interopRequireDefault(require("../MyAccountInput"));
var _MyAccountConsentsStyled = require("../MyAccountConsents/MyAccountConsentsStyled");
var _validators = require("../../util/validators");
var _updateCustomer = _interopRequireDefault(require("../../api/Customer/updateCustomer"));
var _updateCaptureAnswers = _interopRequireDefault(require("../../api/Customer/updateCaptureAnswers"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _ProfileDetailsStyled = require("./ProfileDetailsStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var InputsData = [{
  id: 'firstName',
  label: 'First Name',
  onBlur: 'areNamesValid',
  type: 'text'
}, {
  id: 'lastName',
  label: 'Last Name',
  onBlur: 'areNamesValid',
  type: 'text'
}, {
  id: 'email',
  label: 'E-mail',
  onBlur: 'areEmailAndPasswordValid',
  type: 'email'
}, {
  id: 'confirmationPassword',
  label: 'Confirmation password',
  onBlur: 'areEmailAndPasswordValid',
  type: 'password'
}, {
  id: 'birthDate',
  label: 'Birth Date',
  onBlur: '',
  type: 'date'
}, {
  id: 'phoneNumber',
  label: 'Phone Number',
  onBlur: 'isPhoneNumberValid',
  type: 'tel'
}, {
  id: 'companyName',
  label: 'Company Name',
  onBlur: 'isCompanyNameValid',
  type: 'text'
}];
var ProfileDetails = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ProfileDetails, _Component);
  var _super = _createSuper(ProfileDetails);
  function ProfileDetails(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ProfileDetails);
    _this = _super.call(this, props);
    _this.updateProfile = function (e) {
      e.preventDefault();
      var updated = _this.state.updated;
      var _this$props = _this.props,
        email = _this$props.email,
        setCurrentUser = _this$props.setCurrentUser,
        updateCaptureOption = _this$props.updateCaptureOption,
        t = _this$props.t;
      var shouldLogOut = updated.email !== email;
      if (_this.areNamesValid() && _this.areEmailAndPasswordValid()) {
        _this.setState({
          isSubmittingPending: true
        });
        (0, _updateCustomer.default)({
          firstName: updated.firstName,
          lastName: updated.lastName,
          email: updated.email !== email ? updated.email : '',
          confirmationPassword: updated.email !== email ? updated.confirmationPassword : ''
        }).then(function (response) {
          _this.setState({
            isSubmittingPending: false
          });
          if (response.errors.length) {
            var errorMsg = response.errors[0];
            var isEmailError = errorMsg.includes('mail');
            var isPasswordError = errorMsg.includes('confirmationPassword');
            _this.setState({
              errors: {
                confirmationPassword: isPasswordError ? t('Incorect password') : '',
                email: isEmailError ? errorMsg : ''
              },
              successMessage: false
            });
          } else {
            setCurrentUser(response.responseData);
            _this.setState({
              isSectionDisabled: true,
              successMessage: true
            });
            if (shouldLogOut) {
              _auth.default.logout();
            }
          }
        });
      }
      if (_this.isPhoneNumberValid() && _this.isCompanyNameValid()) {
        _this.setState({
          isSubmittingPending: true
        });
        (0, _updateCaptureAnswers.default)({
          birthDate: updated.birthDate,
          companyName: updated.companyName,
          phoneNumber: updated.phoneNumber
        }).then(function () {
          updateCaptureOption({
            key: 'birthDate',
            value: updated.birthDate
          });
          updateCaptureOption({
            key: 'companyName',
            value: updated.companyName
          });
          updateCaptureOption({
            key: 'phoneNumber',
            value: updated.phoneNumber
          });
          _this.setState({
            isSubmittingPending: false,
            isSectionDisabled: true,
            successMessage: true
          });
        });
      }
    };
    _this.areNamesValid = function () {
      var updated = _this.state.updated;
      var t = _this.props.t;
      if (updated.firstName.length > 50 || updated.lastName.length > 50) {
        _this.setState({
          errors: {
            firstName: updated.firstName.length > 50 ? t('First name can have max 50 characters') : '',
            lastName: updated.lastName.length > 50 ? t('Last name can have max 50 characters') : ''
          }
        });
        return false;
      }
      _this.setState({
        errors: {
          firstName: '',
          lastName: ''
        }
      });
      return true;
    };
    _this.areEmailAndPasswordValid = function () {
      var updated = _this.state.updated;
      var _this$props2 = _this.props,
        email = _this$props2.email,
        t = _this$props2.t;
      if (updated.email === email) {
        _this.setState({
          errors: {
            email: ''
          }
        });
        return true;
      }
      var isEmailValid = !(0, _validators.validateEmailField)(updated.email).length;
      var isPasswordValid = !!updated.confirmationPassword;
      if (!isEmailValid || !isPasswordValid) {
        _this.setState({
          errors: {
            email: (0, _validators.validateEmailField)(updated.email),
            confirmationPassword: updated.confirmationPassword ? '' : t('Please confirm your password to proceed with changing your email address.')
          }
        });
        return false;
      }
      _this.setState({
        errors: {
          email: '',
          confirmationPassword: ''
        }
      });
      return true;
    };
    _this.isPhoneNumberValid = function () {
      var updated = _this.state.updated;
      var t = _this.props.t;
      var regexp = /^[0-9()+-\s]+$/;
      if (updated.phoneNumber && !regexp.test(updated.phoneNumber)) {
        _this.setState({
          errors: {
            phoneNumber: t('This is not a valid phone number')
          }
        });
        return false;
      }
      _this.setState({
        errors: {
          phoneNumber: ''
        }
      });
      return true;
    };
    _this.isCompanyNameValid = function () {
      var updated = _this.state.updated;
      var t = _this.props.t;
      if (updated.companyName && updated.companyName.length > 50) {
        _this.setState({
          errors: {
            companyName: updated.companyName.length > 50 ? t('Company name can have max 50 characters') : ''
          }
        });
        return false;
      }
      _this.setState({
        errors: {
          companyName: ''
        }
      });
      return true;
    };
    _this.handleInputChange = function (fieldName, inputValue) {
      _this.setState(function (prevState) {
        return {
          updated: _objectSpread(_objectSpread({}, prevState.updated), {}, (0, _defineProperty2.default)({}, fieldName, inputValue))
        };
      });
    };
    _this.state = {
      updated: {
        firstName: '',
        lastName: '',
        email: '',
        confirmationPassword: '',
        birthDate: '',
        phoneNumber: '',
        companyName: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        confirmationPassword: '',
        birthDate: '',
        phoneNumber: '',
        companyName: ''
      },
      isSectionDisabled: true,
      isSubmittingPending: false,
      successMessage: false
    };
    return _this;
  }
  (0, _createClass2.default)(ProfileDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
        firstName = _this$props3.firstName,
        lastName = _this$props3.lastName,
        email = _this$props3.email,
        birthDate = _this$props3.birthDate,
        phoneNumber = _this$props3.phoneNumber,
        companyName = _this$props3.companyName;
      var updated = this.state.updated;
      this.setState({
        updated: _objectSpread(_objectSpread({}, updated), {}, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          birthDate: birthDate ? birthDate.answer : '',
          phoneNumber: phoneNumber ? phoneNumber.answer : '',
          companyName: companyName ? companyName.answer : ''
        })
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$state = this.state,
        updated = _this$state.updated,
        isSectionDisabled = _this$state.isSectionDisabled;
      var _this$props4 = this.props,
        firstName = _this$props4.firstName,
        lastName = _this$props4.lastName,
        email = _this$props4.email,
        birthDate = _this$props4.birthDate,
        phoneNumber = _this$props4.phoneNumber,
        companyName = _this$props4.companyName;
      if (isSectionDisabled && (firstName !== updated.firstName || lastName !== updated.lastName || email !== updated.email || birthDate && birthDate.answer !== updated.birthDate || phoneNumber && phoneNumber.answer !== updated.phoneNumber || companyName && companyName.answer !== updated.companyName)) {
        this.setState({
          updated: _objectSpread(_objectSpread({}, updated), {}, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            confirmationPassword: '',
            birthDate: birthDate ? birthDate.answer : '',
            phoneNumber: phoneNumber ? phoneNumber.answer : '',
            companyName: companyName ? companyName.answer : ''
          })
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props5 = this.props,
        firstName = _this$props5.firstName,
        lastName = _this$props5.lastName,
        email = _this$props5.email,
        isLoading = _this$props5.isLoading,
        t = _this$props5.t;
      var _this$state2 = this.state,
        updated = _this$state2.updated,
        isSectionDisabled = _this$state2.isSectionDisabled,
        isSubmittingPending = _this$state2.isSubmittingPending,
        errors = _this$state2.errors,
        successMessage = _this$state2.successMessage;
      return /*#__PURE__*/_react.default.createElement(_ProfileDetailsStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
        withBorder: true
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _toConsumableArray2.default)(Array(3)).map(function (i, k) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          _react.default.createElement(_react.default.Fragment, {
            key: "skeleton-item-".concat(k)
          }, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
            width: 100,
            margin: "0 0 12px 0"
          }), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
            height: 40,
            margin: "0 0 28px 0"
          }))
        );
      }), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
        height: 40,
        width: 140,
        margin: "40px 0 0 auto"
      })) : /*#__PURE__*/_react.default.createElement(_ProfileDetailsStyled.FormStyled, {
        onSubmit: this.updateProfile
      }, successMessage && /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.SuccessMessageStyled, null, t('Your profile details have been changed successfully')), InputsData.map(function (input) {
        var _this2$props$input$id;
        var shouldBeHidden = (0, _typeof2.default)(_this2.props[input.id]) === 'object' && !((_this2$props$input$id = _this2.props[input.id]) !== null && _this2$props$input$id !== void 0 && _this2$props$input$id.enabled);
        return !shouldBeHidden ? /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
          key: input.id,
          id: input.id,
          value: updated[input.id],
          label: t(input.label),
          onChange: function onChange(e) {
            return _this2.handleInputChange(input.id, e.target.value);
          },
          disabled: isSectionDisabled,
          error: errors[input.id],
          onBlur: _this2[input.onBlur],
          type: input.type,
          name: input.id,
          hideInput: input.id === 'confirmationPassword' && updated.email === email,
          autoComplete: input.id === 'confirmationPassword' ? 'new-password' : 'off'
        }) : null;
      }), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonWrapperStyled, null, isSectionDisabled ? /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        onClickFn: function onClickFn() {
          return _this2.setState({
            isSectionDisabled: false
          });
        },
        width: "100%"
      }, t('Edit Profile')) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        theme: "simple",
        onClickFn: function onClickFn() {
          return _this2.setState({
            isSectionDisabled: true,
            updated: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              confirmationPassword: ''
            },
            errors: {
              firstName: '',
              lastName: '',
              email: '',
              confirmationPassword: ''
            }
          });
        }
      }, t('Cancel')), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        onClickFn: this.updateProfile,
        disabled: isSubmittingPending,
        type: "submit",
        theme: "confirm"
      }, isSubmittingPending && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t('Save')))))));
    }
  }]);
  return ProfileDetails;
}(_react.Component);
exports.PureProfileDetails = ProfileDetails;
ProfileDetails.propTypes = {
  firstName: _propTypes.default.string,
  lastName: _propTypes.default.string,
  email: _propTypes.default.string,
  birthDate: _propTypes.default.objectOf(_propTypes.default.any),
  phoneNumber: _propTypes.default.objectOf(_propTypes.default.any),
  companyName: _propTypes.default.objectOf(_propTypes.default.any),
  isLoading: _propTypes.default.bool,
  setCurrentUser: _propTypes.default.func,
  updateCaptureOption: _propTypes.default.func,
  t: _propTypes.default.func
};
ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: null,
  phoneNumber: null,
  companyName: null,
  isLoading: false,
  setCurrentUser: function setCurrentUser() {},
  updateCaptureOption: function updateCaptureOption() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(ProfileDetails));
exports.default = _default;