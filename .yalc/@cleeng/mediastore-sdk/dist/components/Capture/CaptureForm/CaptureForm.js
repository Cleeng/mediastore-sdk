"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _Input = _interopRequireDefault(require("../../Input"));
var _EmailInput = _interopRequireDefault(require("../../EmailInput"));
var _DateInput = _interopRequireDefault(require("../../DateInput"));
var _Select = _interopRequireDefault(require("../../Select/Select"));
var _Checkbox = _interopRequireDefault(require("../../Checkbox"));
var _Button = _interopRequireDefault(require("../../Button"));
var _Loader = _interopRequireDefault(require("../../Loader"));
var _api = require("../../../api");
var _validators = require("../../../util/validators");
var _useInput = _interopRequireDefault(require("./useInput"));
var _CaptureFormStyled = require("./CaptureFormStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CaptureForm = function CaptureForm(_ref) {
  var settings = _ref.settings,
    onSuccess = _ref.onSuccess;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    _useTranslation2 = (0, _slicedToArray2.default)(_useTranslation, 1),
    t = _useTranslation2[0];
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    processing = _useState2[0],
    setProcessing = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    customSettings = _useState4[0],
    setCustomSetting = _useState4[1];
  var firstName = (0, _useInput.default)('');
  var lastName = (0, _useInput.default)('');
  var email = (0, _useInput.default)('');
  var birthDate = (0, _useInput.default)('');
  var companyName = (0, _useInput.default)('');
  var phoneNumber = (0, _useInput.default)('');
  var address = (0, _useInput.default)('');
  var address2 = (0, _useInput.default)('');
  var city = (0, _useInput.default)('');
  var state = (0, _useInput.default)('');
  var postCode = (0, _useInput.default)('');
  var isError = false;
  var setIsError = function setIsError(v) {
    isError = v;
  };
  (0, _react.useEffect)(function () {
    for (var i = 0; i < settings.length; i += 1) {
      var item = settings[i];
      if (item.key === 'firstNameLastName' && item.answer) {
        firstName.setValue(item.answer.firstName);
        lastName.setValue(item.answer.lastName);
      }
      if (item.key === 'birthDate' && item.answer) birthDate.setValue(item.answer);
      if (item.key === 'companyName' && item.answer) companyName.setValue(item.answer);
      if (item.key === 'phoneNumber' && item.answer) phoneNumber.setValue(item.answer);
      if (item.key === 'address' && item.answer) {
        address.setValue(item.answer.address);
        address2.setValue(item.answer.address2);
        city.setValue(item.answer.city);
        state.setValue(item.answer.state);
        postCode.setValue(item.answer.postCode);
      }
    }
    var transformedSettings = settings.filter(function (item) {
      return item.key.startsWith('custom') && item.enabled;
    }).map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        value: item.answer ? item.answer : '',
        values: item.value ? item.value.split(';').map(function (i) {
          var value = i.trim();
          var label = value;
          return {
            value: value,
            label: label
          };
        }) : []
      });
    });
    setCustomSetting(transformedSettings);
  }, []);
  var getSettingByKey = function getSettingByKey(key) {
    return settings.find(function (setting) {
      return setting.key === key;
    });
  };
  var isRequired = function isRequired(key) {
    var setting = getSettingByKey(key);
    return setting === null || setting === void 0 ? void 0 : setting.required;
  };
  var isEnabled = function isEnabled(key) {
    var setting = getSettingByKey(key);
    return setting === null || setting === void 0 ? void 0 : setting.enabled;
  };
  var validateNames = function validateNames() {
    if (!firstName.value) firstName.setError(t('First Name is required'));
    if (!lastName.value) lastName.setError(t('Last Name is required'));
    if (!firstName.value || !lastName.value) setIsError(true);
  };
  var validateAddress = function validateAddress() {
    if (!isRequired('address')) return;
    if (!address.value || !city || !state || !postCode) {
      setIsError(true);
    }
    if (!address.value) address.setError(t('Address is required'));
    if (!city.value) city.setError(t('City is required'));
    if (!state.value) state.setError(t('State is required'));
    if (!postCode.value) postCode.setError(t('Post code is required'));
  };
  var validateEmail = function validateEmail() {
    var message = (0, _validators.validateEmailField)(email.value);
    if (message) {
      email.setError(t(message));
      setIsError(true);
    }
  };
  var validateCompany = function validateCompany() {
    if (!companyName.value) {
      companyName.setError(t('Company name is required'));
      setIsError(true);
    }
  };
  var validatePhone = function validatePhone() {
    if (!phoneNumber.value) {
      phoneNumber.setError(t('Phone number is required'));
      setIsError(true);
    }
  };
  var validateBirthDate = function validateBirthDate() {
    if (!birthDate.value) {
      birthDate.setError(t('Birth date is required'));
      setIsError(true);
    }
  };
  var validateCustomSettings = function validateCustomSettings() {
    var newArr = customSettings.map(function (item) {
      if (item.enabled && item.required && !item.value) {
        setIsError(true);
        return _objectSpread(_objectSpread({}, item), {}, {
          error: t('Answer on that question is required')
        });
      }
      return _objectSpread(_objectSpread({}, item), {}, {
        error: ''
      });
    });
    setCustomSetting(newArr);
  };
  var validateFields = function validateFields() {
    setIsError(false);
    if (isEnabled('firstNameLastName') && isRequired('firstNameLastName')) validateNames();
    if (isEnabled('address') && isRequired('address')) validateAddress();
    if (isEnabled('email') && isRequired('email')) validateEmail();
    if (isEnabled('companyName') && isRequired('companyName')) validateCompany();
    if (isEnabled('phoneNumber') && isRequired('phoneNumber')) validatePhone();
    if (isEnabled('birthDate') && isRequired('birthDate')) validateBirthDate();
    validateCustomSettings();
  };
  var handleCustomSetting = function handleCustomSetting(key, option) {
    var newArr = customSettings.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        value: item.key === key ? option.value : item.value
      });
    });
    setCustomSetting(newArr);
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    validateFields();
    if (!isError) {
      var customAnswers = customSettings.map(function (item) {
        return {
          questionId: item.key,
          question: item.question,
          value: item.value
        };
      });
      setProcessing(true);
      (0, _api.updateCaptureAnswers)({
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        address2: address.value,
        city: city.value,
        state: state.value,
        postCode: postCode.value,
        email: email.value,
        birthDate: birthDate.value,
        companyName: companyName.value,
        phoneNumber: phoneNumber.value,
        customAnswers: customAnswers
      }).then(function () {
        setProcessing(false);
        onSuccess();
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureFormStyled, {
    onSubmit: handleSubmit,
    noValidate: true
  }, isEnabled('firstNameLastName') && /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureRowStyled, null, /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('First Name'),
    value: firstName.value,
    error: firstName.error,
    onChange: function onChange(val) {
      return firstName.setValue(val);
    },
    onBlur: function onBlur() {
      return validateNames();
    },
    required: isRequired('firstNameLastName')
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('Last Name'),
    value: lastName.value,
    error: lastName.error,
    onChange: function onChange(val) {
      return lastName.setValue(val);
    },
    onBlur: function onBlur() {
      return validateNames();
    },
    required: isRequired('firstNameLastName')
  })), isEnabled('email') && /*#__PURE__*/_react.default.createElement(_EmailInput.default, {
    label: t('Confirm Email'),
    value: email.value,
    error: email.error,
    onChange: function onChange(val) {
      return email.setValue(val);
    },
    onBlur: function onBlur() {
      return validateEmail();
    },
    required: isRequired('email')
  }), isEnabled('birthDate') && /*#__PURE__*/_react.default.createElement(_DateInput.default, {
    label: t('Date of Birth'),
    value: birthDate.value,
    error: birthDate.error,
    onChange: function onChange(val) {
      return birthDate.setValue(val);
    },
    onBlur: function onBlur() {
      return validateBirthDate();
    },
    required: isRequired('birthDate')
  }), isEnabled('companyName') && /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('Company'),
    value: companyName.value,
    error: companyName.error,
    onChange: function onChange(val) {
      return companyName.setValue(val);
    },
    onBlur: function onBlur() {
      return validateCompany();
    },
    required: isRequired('companyName')
  }), isEnabled('phoneNumber') && /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('Mobile phone'),
    value: phoneNumber.value,
    error: phoneNumber.error,
    onChange: function onChange(val) {
      return phoneNumber.setValue(val);
    },
    onBlur: function onBlur() {
      return validatePhone();
    },
    required: isRequired('phoneNumber')
  }), isEnabled('address') && /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureGroupStyled, null, /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('Address line 1'),
    value: address.value,
    error: address.error,
    onChange: function onChange(val) {
      return address.setValue(val);
    },
    onBlur: function onBlur() {
      return validateAddress();
    },
    required: isRequired('address')
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('Address line 2'),
    value: address2.value,
    onChange: function onChange(val) {
      return address2.setValue(val);
    }
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('City'),
    value: city.value,
    error: city.error,
    onChange: function onChange(val) {
      return city.setValue(val);
    },
    onBlur: function onBlur() {
      return validateAddress();
    },
    required: isRequired('address')
  }), /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureRowStyled, null, /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('State/Region'),
    value: state.value,
    error: state.error,
    onChange: function onChange(val) {
      return state.setValue(val);
    },
    onBlur: function onBlur() {
      return validateAddress();
    },
    required: isRequired('address')
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: t('ZIP/Postal code'),
    value: postCode.value,
    error: postCode.error,
    onChange: function onChange(val) {
      return postCode.setValue(val);
    },
    onBlur: function onBlur() {
      return validateAddress();
    },
    required: isRequired('address')
  }))), customSettings.map(function (setting) {
    if (setting.values.length === 1 && isEnabled(setting.key)) return /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureBoxStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureQuestionStyled, {
      required: setting.required
    }, setting.question), /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: setting.key,
      onClickFn: function onClickFn() {
        return handleCustomSetting(setting.key, {
          value: setting.value ? '' : setting.values[0].value,
          label: setting.value ? '' : setting.values[0].value
        });
      },
      checked: setting.value === setting.values[0].value
    }, setting.values[0].value), /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureError, null, setting.error));
    if (setting.values.length === 2 && isEnabled(setting.key)) return /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureBoxStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureQuestionStyled, {
      required: setting.required
    }, setting.question), /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: "".concat(setting.key, "-01"),
      onClickFn: function onClickFn() {
        return handleCustomSetting(setting.key, {
          value: setting.values[0].value,
          label: setting.values[0].value
        });
      },
      isRadioButton: true,
      checked: setting.value === setting.values[0].value
    }, setting.values[0].value), /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: "".concat(setting.key, "-02"),
      onClickFn: function onClickFn() {
        return handleCustomSetting(setting.key, {
          value: setting.values[1].value,
          label: setting.values[1].value
        });
      },
      isRadioButton: true,
      checked: setting.value === setting.values[1].value
    }, setting.values[1].value), /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureError, null, setting.error));
    if (setting.values.length > 2 && isEnabled(setting.key)) return /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureBoxStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_Select.default, {
      label: setting.question,
      name: setting.key,
      value: setting.value ? {
        value: setting.value,
        label: setting.value
      } : null,
      values: setting.values,
      required: setting.required,
      onChange: handleCustomSetting
    }), /*#__PURE__*/_react.default.createElement(_CaptureFormStyled.CaptureError, null, setting.error));
    if (isEnabled(setting.key)) return /*#__PURE__*/_react.default.createElement(_Input.default, {
      key: setting.key,
      placeholder: setting.question,
      value: setting.value,
      error: setting.error,
      onChange: function onChange(val) {
        return handleCustomSetting(setting.key, {
          value: val
        });
      },
      onBlur: function onBlur() {
        return validateCustomSettings();
      },
      required: setting.required
    });
    return /*#__PURE__*/_react.default.createElement("div", null);
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    type: "submit",
    size: "big",
    theme: "confirm",
    margin: "10px 0"
  }, processing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t('Continue'))));
};
CaptureForm.propTypes = {
  settings: _propTypes.default.arrayOf(_propTypes.default.any),
  onSuccess: _propTypes.default.func
};
CaptureForm.defaultProps = {
  settings: [],
  onSuccess: function onSuccess() {}
};
var _default = CaptureForm;
exports.default = _default;