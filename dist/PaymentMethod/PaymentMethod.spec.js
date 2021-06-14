"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _PaymentMethod = require("./PaymentMethod");

var _PaymentMethodStyled = require("./PaymentMethodStyled");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('containers/labeling', function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
var mockPaymentDetailsByTypes = [{
  id: 193925086,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null
}];
var mockPaymentDetailsNotSupported = [{
  id: 193925084,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'notSupportedMethod',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null
}];
var mockPaymentDetailsPaypal = [{
  id: 193925082,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'paypal',
  paymentMethodId: null
}];
describe('<PaymentMethod/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, null));
      expect(wrapper.prop('paymentDetails')).toEqual([]);
    });
    it('should render all supported payment types', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, {
        paymentDetails: mockPaymentDetailsByTypes
      }));
      expect(wrapper.find(_PaymentMethodStyled.CardWrapStyled)).toHaveLength(1);
    });
    it('should show specifid data for paypal', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, {
        paymentDetails: mockPaymentDetailsPaypal
      }));
      expect(wrapper.find(_PaymentMethodStyled.CardWrapStyled)).toHaveLength(1);
      expect(wrapper.find(_PaymentMethodStyled.CardWrapStyled).props().type).toEqual('paypal');
    });
    it('should show the message if type is not supported', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, {
        paymentDetails: mockPaymentDetailsNotSupported
      }));
      expect(wrapper.find(_PaymentMethodStyled.Message)).toHaveLength(1);
    });
  });
});