"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _Button = _interopRequireDefault(require("../Button"));
var _api = require("../../api");
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
var _UpdatePaymentDetailsPopupStyled = require("./UpdatePaymentDetailsPopupStyled");
var _definedPaymentMethods = _interopRequireWildcard(require("./definedPaymentMethods.const"));
var _Steps = require("./Steps");
var _Adyen = _interopRequireDefault(require("../Adyen"));
var _PayPal = _interopRequireDefault(require("../Payment/PayPal/PayPal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var AmazonIcon = function AmazonIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M.075 29.773c.12-.193.311-.206.578-.037A38.631 38.631 0 0 0 20.383 35a39.055 39.055 0 0 0 14.04-2.651l.524-.233c.229-.1.389-.166.487-.216a.669.669 0 0 1 .873.216c.2.289.15.558-.2.8-.426.316-1 .681-1.672 1.087a26.982 26.982 0 0 1-6.956 2.869 29.282 29.282 0 0 1-7.506 1.014 29.134 29.134 0 0 1-10.7-1.973 29.718 29.718 0 0 1-9.022-5.571.5.5 0 0 1-.251-.366.362.362 0 0 1 .083-.216Zm10.912-10.335a7.315 7.315 0 0 1 1.235-4.283 7.606 7.606 0 0 1 3.391-2.684 18.385 18.385 0 0 1 4.84-1.2c.648-.076 1.717-.171 3.191-.289v-.615a6.647 6.647 0 0 0-.5-3.117 2.722 2.722 0 0 0-2.394-1.08h-.3a3.992 3.992 0 0 0-2.071.765 3.005 3.005 0 0 0-1.122 1.822.932.932 0 0 1-.723.848l-4.189-.524c-.412-.1-.618-.3-.618-.648a.992.992 0 0 1 .037-.249A6.992 6.992 0 0 1 14.788 3.4a11.626 11.626 0 0 1 5.635-1.745h.9a9.226 9.226 0 0 1 6.46 2.145c.224.249.449.5.673.8a4.309 4.309 0 0 1 .47.748 3.186 3.186 0 0 1 .324.947c.1.422.175.7.224.848A4.789 4.789 0 0 1 29.6 8.16c.017.52.033.819.033.919v8.776a5.42 5.42 0 0 0 .274 1.722 3.963 3.963 0 0 0 .524 1.12l.848 1.12a1.133 1.133 0 0 1 .226.6.64.64 0 0 1-.3.522c-1.995 1.745-3.092 2.693-3.263 2.842a.97.97 0 0 1-1.047.075 10.077 10.077 0 0 1-.874-.824l-.515-.577c-.1-.123-.276-.349-.527-.7l-.5-.723a8.908 8.908 0 0 1-3.986 2.768 10.509 10.509 0 0 1-3.042.377 6.378 6.378 0 0 1-4.588-1.719 6.438 6.438 0 0 1-1.8-4.887l-.083-.126Zm6.238-.728a3.436 3.436 0 0 0 .706 2.267 2.389 2.389 0 0 0 1.92.851 2.449 2.449 0 0 0 .324-.033 1.835 1.835 0 0 1 .276-.038 3.729 3.729 0 0 0 2.367-1.957 5.229 5.229 0 0 0 .6-1.513 6.489 6.489 0 0 0 .224-1.33c.025-.324.025-.9.025-1.67v-.9a12.856 12.856 0 0 0-3.191.3 3.9 3.9 0 0 0-3.191 4.039l-.058-.033Zm15.228 11.68a1.206 1.206 0 0 1 .219-.283 5.923 5.923 0 0 1 1.745-.831 13.453 13.453 0 0 1 2.679-.4 2.21 2.21 0 0 1 .681.05c1.08.1 1.745.279 1.948.549a1.156 1.156 0 0 1 .15.648v.249a8.3 8.3 0 0 1-.69 2.992 7.236 7.236 0 0 1-1.921 2.792.548.548 0 0 1-.327.15.388.388 0 0 1-.15-.02c-.15-.073-.178-.2-.106-.4a13.642 13.642 0 0 0 1.34-4.388.953.953 0 0 0-.145-.572c-.241-.276-.914-.427-2.034-.427-.4 0-.886.027-1.446.076-.6.075-1.164.15-1.662.224a.44.44 0 0 1-.3-.073c-.05-.05-.06-.078-.033-.128a.274.274 0 0 1 .033-.1v-.1Z",
    transform: "translate(-.002 -1.653)",
    style: {
      fill: "#f90"
    }
  }));
};
AmazonIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "39.875",
  height: "36.23"
};
var AppleIcon = function AppleIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M28.181 23.049c-1.029 2.985-4.109 8.269-7.282 8.327-2.1.041-2.782-1.248-5.188-1.248s-3.157 1.208-5.147 1.287C7.2 31.544 2 23.787 2 17.022c0-6.214 4.33-9.294 8.114-9.351 2.029-.037 3.945 1.368 5.183 1.368S18.866 7.35 21.312 7.6a7.342 7.342 0 0 1 5.745 3.112c-4.9 3.2-4.134 9.882 1.123 12.339ZM21.345 0c-3.7.149-6.718 4.031-6.3 7.24 3.423.266 6.703-3.567 6.3-7.24Z",
    transform: "translate(-2)",
    style: {
      fill: "#1c1c1c"
    }
  }));
};
AppleIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "26.181",
  height: "31.416"
};
var AndroidIcon = function AndroidIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#62dba3", "}")), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(0 26.681)"
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M2.854 2.902A2.932 2.932 0 0 0-.004 6.008a2.91 2.91 0 0 0 2.858 3.083 2.3 2.3 0 0 0 1.891-.878v.383a.4.4 0 0 0 .383.383h.945V3.038H4.745v.754a2.3 2.3 0 0 0-1.891-.89Zm.237 1.215a1.818 1.818 0 0 1 1.769 1.89 1.833 1.833 0 0 1-1.766 1.89 1.8 1.8 0 0 1-1.746-1.9 1.771 1.771 0 0 1 1.747-1.88ZM7.919 8.979a.372.372 0 0 1-.383-.383V3.037h1.328v.735a2.071 2.071 0 0 1 1.791-.872 2.219 2.219 0 0 1 2.26 2.275v3.8h-.923a.407.407 0 0 1-.405-.405V5.466a1.26 1.26 0 0 0-1.237-1.349 1.606 1.606 0 0 0-1.486 1.71v3.151ZM16.789 2.902a2.932 2.932 0 0 0-2.858 3.106 2.91 2.91 0 0 0 2.858 3.083 2.3 2.3 0 0 0 1.89-.878v.383a.4.4 0 0 0 .383.383h.945V.067h-1.328v3.725a2.3 2.3 0 0 0-1.89-.89Zm.237 1.215a1.818 1.818 0 0 1 1.769 1.89 1.833 1.833 0 0 1-1.766 1.89 1.8 1.8 0 0 1-1.746-1.9 1.771 1.771 0 0 1 1.742-1.88ZM21.853 8.979a.372.372 0 0 1-.383-.383V3.037h1.328v.99a1.636 1.636 0 0 1 1.6-1.058 2.77 2.77 0 0 1 .473.045v1.374a1.912 1.912 0 0 0-.63-.112 1.57 1.57 0 0 0-1.44 1.709v2.994ZM32.925 8.978a.372.372 0 0 1-.383-.383V3.036h1.328v5.942ZM37.765 2.902a2.932 2.932 0 0 0-2.858 3.106 2.91 2.91 0 0 0 2.858 3.083 2.3 2.3 0 0 0 1.89-.878v.383a.4.4 0 0 0 .383.383h.945V.067h-1.328v3.725a2.3 2.3 0 0 0-1.89-.89Zm.237 1.215a1.818 1.818 0 0 1 1.769 1.89 1.833 1.833 0 0 1-1.766 1.89 1.8 1.8 0 0 1-1.746-1.9 1.771 1.771 0 0 1 1.742-1.88Z"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    className: "a",
    cx: ".878",
    cy: ".878",
    r: ".878",
    transform: "translate(32.32)"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M28.371 2.9a3.058 3.058 0 0 0-3.1 3.1 3.024 3.024 0 0 0 3.094 3.094 3.065 3.065 0 0 0 3.142-3.083A3.085 3.085 0 0 0 28.371 2.9Zm0 1.24a1.793 1.793 0 0 1 1.782 1.861 1.82 1.82 0 0 1-1.779 1.872 1.806 1.806 0 0 1-1.777-1.854 1.79 1.79 0 0 1 1.778-1.879Z"
  })), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "m30.494 6.919 3.4-5.885a.69.69 0 0 0-.25-.941.681.681 0 0 0-.936.25l-3.442 5.961a21.477 21.477 0 0 0-17.522 0L8.294.343a.688.688 0 0 0-1.19.691l3.4 5.885A20.284 20.284 0 0 0 .022 22.965h40.956A20.279 20.279 0 0 0 30.494 6.919Zm-19.4 10.295a1.717 1.717 0 1 1 1.717-1.717 1.717 1.717 0 0 1-1.717 1.717Zm18.8 0a1.717 1.717 0 1 1 1.717-1.717 1.717 1.717 0 0 1-1.711 1.717Z"
  }));
};
AndroidIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40.983",
  height: "35.773"
};
var PaypalIcon = function PaypalIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M38.683 24.669h-2.455a.709.709 0 0 0-.586.311l-3.386 4.986-1.434-4.791a.71.71 0 0 0-.679-.505H27.73a.425.425 0 0 0-.4.562l2.7 7.933-2.541 3.585a.425.425 0 0 0 .347.671h2.452a.712.712 0 0 0 .583-.3l8.162-11.78a.425.425 0 0 0-.349-.667Zm-16.408 4.753a2.723 2.723 0 0 1-2.756 2.332 1.892 1.892 0 0 1-2.019-2.375 2.732 2.732 0 0 1 2.736-2.349 2.056 2.056 0 0 1 1.628.665 2.1 2.1 0 0 1 .414 1.727Zm3.4-4.753h-2.438a.425.425 0 0 0-.42.359l-.107.682-.17-.247a3.478 3.478 0 0 0-2.885-1.024 5.615 5.615 0 0 0-5.45 4.912 4.607 4.607 0 0 0 .909 3.751 3.82 3.82 0 0 0 3.075 1.241 4.675 4.675 0 0 0 3.381-1.4l-.109.678a.425.425 0 0 0 .42.491h2.2a.708.708 0 0 0 .7-.6l1.32-8.359a.425.425 0 0 0-.42-.49Zm-14.653.058c-.279 1.83-1.676 1.83-3.029 1.83h-.77l.539-3.417a.424.424 0 0 1 .42-.359h.358c.92 0 1.79 0 2.238.524a1.7 1.7 0 0 1 .248 1.422Zm-.588-4.776h-5.1a.708.708 0 0 0-.7.6L2.576 33.625a.425.425 0 0 0 .42.491h2.435a.708.708 0 0 0 .7-.6l.557-3.528a.708.708 0 0 1 .7-.6H9c3.359 0 5.3-1.625 5.8-4.847a3.926 3.926 0 0 0-.65-3.29 4.727 4.727 0 0 0-3.716-1.3Zm54.489.359-2.09 13.315a.425.425 0 0 0 .42.491h2.1a.708.708 0 0 0 .7-.6l2.064-13.075a.425.425 0 0 0-.42-.491h-2.351a.425.425 0 0 0-.42.359Zm-6.281 9.111a2.723 2.723 0 0 1-2.756 2.332 1.892 1.892 0 0 1-2.022-2.374A2.732 2.732 0 0 1 56.6 27.03a2.056 2.056 0 0 1 1.628.665 2.1 2.1 0 0 1 .414 1.727Zm3.4-4.753h-2.436a.425.425 0 0 0-.42.359l-.107.682-.171-.247a3.476 3.476 0 0 0-2.884-1.024 5.615 5.615 0 0 0-5.45 4.912 4.607 4.607 0 0 0 .909 3.751 3.82 3.82 0 0 0 3.075 1.241 4.675 4.675 0 0 0 3.381-1.4l-.109.678a.425.425 0 0 0 .42.491h2.2a.708.708 0 0 0 .7-.6l1.32-8.359a.425.425 0 0 0-.42-.491Zm-14.653.058c-.279 1.83-1.676 1.83-3.029 1.83h-.76l.539-3.417a.424.424 0 0 1 .42-.359h.353c.92 0 1.79 0 2.238.524a1.705 1.705 0 0 1 .247 1.422Zm-.588-4.776h-5.1a.708.708 0 0 0-.7.6l-2.055 13.075a.425.425 0 0 0 .42.491h2.616a.5.5 0 0 0 .49-.418l.585-3.707a.708.708 0 0 1 .7-.6h1.613c3.359 0 5.3-1.625 5.8-4.847a3.926 3.926 0 0 0-.65-3.29 4.727 4.727 0 0 0-3.716-1.3Z",
    transform: "translate(-2.571 -19.952)",
    style: {
      fill: "#5a9dd8"
    }
  }));
};
PaypalIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "65.556",
  height: "17.469"
};
var RokuIcon = function RokuIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("clipPath", {
    id: "a"
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M3252.226-5954.029h67.614v-31.789h-67.614Z",
    transform: "translate(-3252.226 5985.818)"
  })), /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#662d91", "}")), /*#__PURE__*/_react.default.createElement("g", {
    style: {
      clipPath: "url(#a)"
    },
    transform: "translate(-.001)"
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M15.106 12.445a2.788 2.788 0 0 0-2.774-2.8h-1.375v5.575h1.375a2.783 2.783 0 0 0 2.774-2.775m6.257 11.115h-5.049l-4.009-5.563h-1.348v5.551h-4.45V6.871h6.375c3.675 0 6.675 2.5 6.675 5.574a5.417 5.417 0 0 1-2.9 4.575l4.707 6.54"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M26.382 13.445c-1.175 0-2.175 1.6-2.175 3.575s1 3.577 2.175 3.577c1.2 0 2.2-1.6 2.2-3.577s-1-3.575-2.2-3.575m6.849 3.575a6.816 6.816 0 0 1-6.849 6.8 6.8 6.8 0 0 1-6.825-6.8 6.8 6.8 0 0 1 6.825-6.8 6.817 6.817 0 0 1 6.849 6.8M43.675 10.496l-5.126 5.125v-5.142h-4.451v13.069h4.449v-5.3l5.352 5.3h5.6l-6.8-6.8 5.633-5.631v7.754c0 2.575 1.549 4.951 5.448 4.951a6.183 6.183 0 0 0 4.376-2l2 1.725h.95V10.496h-4.449v8.45a2.492 2.492 0 0 1-2.278 1.424c-1.095 0-1.6-.649-1.6-2.725v-7.149Z"
  })));
};
RokuIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "67.614",
  height: "31.789"
};
var PaymentMethodIcons = {
  amazon: AmazonIcon,
  apple: AppleIcon,
  android: AndroidIcon,
  paypal: PaypalIcon,
  roku: RokuIcon
};
var UpdatePaymentDetailsPopup = function UpdatePaymentDetailsPopup(_ref) {
  var hideInnerPopup = _ref.hideInnerPopup,
    setPublisherPaymentMethods = _ref.setPublisherPaymentMethods,
    updatePaymentDetailsSection = _ref.updatePaymentDetailsSection,
    selectedPaymentMethod = _ref.selectedPaymentMethod;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var _useState = (0, _react.useState)(1),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    action = _useState6[0],
    setAction = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    selectedMethod = _useState8[0],
    setSelectedMethod = _useState8[1];
  var publisherPaymentMethods = (0, _reactRedux.useSelector)(function (state) {
    return state.paymentInfo.publisherPaymentMethods;
  });
  var selectMethod = function selectMethod(method) {
    return selectedMethod(method);
  };
  (0, _react.useEffect)(function () {
    if (!publisherPaymentMethods) {
      setIsLoading(true);
      (0, _api.getPaymentMethods)().then(function (resp) {
        if (resp.responseData) {
          var paymentMethods = resp.responseData.paymentMethods;
          if (paymentMethods) {
            var adyenData = paymentMethods.find(function (item) {
              return item.methodName === 'card';
            });
            var paypalData = paymentMethods.find(function (item) {
              return item.methodName === 'paypal';
            });
            setPublisherPaymentMethods({
              paypal: paypalData === null || paypalData === void 0 ? void 0 : paypalData.id,
              adyen: adyenData === null || adyenData === void 0 ? void 0 : adyenData.id
            });
          }
          setIsLoading(false);
        }
      });
    }
  }, []);
  var renderMainStep = function renderMainStep() {
    switch (action) {
      case _definedPaymentMethods.ACTIONS.addCard:
        return /*#__PURE__*/_react.default.createElement(_Steps.AddCard, {
          setStep: setStep,
          updatePaymentDetailsSection: updatePaymentDetailsSection
        });
      case _definedPaymentMethods.ACTIONS.addPayPal:
        return /*#__PURE__*/_react.default.createElement(_Steps.AddPayPal, {
          setStep: setStep
        });
      case _definedPaymentMethods.ACTIONS.delete:
        return /*#__PURE__*/_react.default.createElement(_Steps.DeletePaymentMethod, {
          hideInnerPopup: hideInnerPopup,
          paymentDetailsToDelete: selectedPaymentMethod,
          setStep: setStep,
          updatePaymentDetailsSection: updatePaymentDetailsSection
        });
      default:
        return '';
    }
  };
  if (selectedPaymentMethod.bound) {
    var LogoComponent = PaymentMethodIcons[selectedPaymentMethod.paymentMethod];
    return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
      steps: 1,
      isError: false,
      currentStep: step,
      popupTitle: t('Update payment details')
    }, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, PaymentMethodIcons[selectedPaymentMethod.paymentMethod] && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.PopupImageStyled, null, /*#__PURE__*/_react.default.createElement(LogoComponent, null)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('It looks like your payments cannot be managed from here')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('You are currently paying for your subscription via'), ' ', selectedPaymentMethod.paymentMethod, ".", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), t('This means that your payment information cannot be changed from here right now.'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
      removeMargin: true
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      theme: "simple",
      onClickFn: function onClickFn() {
        return hideInnerPopup();
      }
    }, t('Back'))));
  }
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: 3,
    isError: false,
    currentStep: step,
    popupTitle: t('Update payment details')
  }, step === 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Update payment details')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Update your current payment method, or add a new one.')), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: !isLoading,
    height: 90
  }, /*#__PURE__*/_react.default.createElement(_Adyen.default, {
    selectPaymentMethod: selectMethod,
    onSubmit: function onSubmit() {}
  }, /*#__PURE__*/_react.default.createElement(_PayPal.default, {
    order: {},
    selectPaymentMethod: selectMethod
  }))), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: !isLoading
  }, selectedPaymentMethod.id && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.RemoveLinkStyled, {
    onClick: function onClick() {
      window.dispatchEvent(new CustomEvent('MSSDK:remove-payment-details-button-clicked'));
      setStep(function (currentStep) {
        return currentStep + 1;
      });
      setAction(_definedPaymentMethods.ACTIONS.delete);
    }
  }, /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.DeleteIconStyled, null), t('Remove your payment method')))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return hideInnerPopup();
    }
  }, t('Cancel')))), step === 2 && renderMainStep(), step === 3 && /*#__PURE__*/_react.default.createElement(_Steps.Success, {
    hideInnerPopup: hideInnerPopup
  }));
};
UpdatePaymentDetailsPopup.propTypes = {
  hideInnerPopup: _propTypes.default.func,
  setPublisherPaymentMethods: _propTypes.default.func,
  updatePaymentDetailsSection: _propTypes.default.func,
  selectedPaymentMethod: _propTypes.default.objectOf(_propTypes.default.any)
};
UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: function hideInnerPopup() {},
  setPublisherPaymentMethods: function setPublisherPaymentMethods() {},
  updatePaymentDetailsSection: function updatePaymentDetailsSection() {},
  selectedPaymentMethod: {}
};
var _default = UpdatePaymentDetailsPopup;
exports.default = _default;