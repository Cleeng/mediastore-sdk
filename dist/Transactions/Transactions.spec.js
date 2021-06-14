"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _Transactions = require("./Transactions");

var _TransactionsStyled = require("./TransactionsStyled");

/* eslint-disable react/jsx-props-no-spreading */
var mockTransaction = [{
  transactionId: 'T650862998',
  transactionDate: 1584361260,
  offerId: 'S568296139_ZW',
  offerType: 'subscription',
  offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
}];
var toggleTransactionsListMock = jest.fn();
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
describe('<Transactions/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render transactions', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Transactions.PureTransactions, {
        transactions: mockTransaction,
        toggleTransactionsList: toggleTransactionsListMock
      }));
      expect(wrapper.find(_TransactionsStyled.InsideWrapperStyled).exists()).toBe(true);
    });
    it('should show info when there are no transactions', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Transactions.PureTransactions, {
        transactions: [],
        toggleTransactionsList: toggleTransactionsListMock
      }));
      expect(wrapper.find(_MyAccountError.default).exists()).toBe(true);
      expect(wrapper.find(_TransactionsStyled.InsideWrapperStyled).exists()).toBe(false);
    });
    it('should hide button if all transaction are fetched', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Transactions.PureTransactions, {
        transactions: mockTransaction,
        toggleTransactionsList: toggleTransactionsListMock,
        isShowMoreButtonHidden: true
      }));
      expect(wrapper.find('button').exists()).toBe(false);
    });
  });
  describe('@action', function () {
    it('should call toggleTransactionsList on button click', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Transactions.PureTransactions, {
        transactions: mockTransaction,
        toggleTransactionsList: toggleTransactionsListMock,
        isExpanded: true
      }));
      wrapper.find('button').simulate('click');
      expect(toggleTransactionsListMock).toHaveBeenCalled();
    });
  });
});