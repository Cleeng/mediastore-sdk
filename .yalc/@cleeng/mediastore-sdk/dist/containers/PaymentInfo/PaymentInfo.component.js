"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../labeling"));
var _PaymentMethod = _interopRequireDefault(require("../../components/PaymentMethod"));
var _SectionHeader = _interopRequireDefault(require("../../components/SectionHeader"));
var _Transactions = _interopRequireDefault(require("../../components/Transactions"));
var _api = require("../../api");
var _propTypes = require("prop-types");
var _UpdatePaymentDetailsPopup = _interopRequireDefault(require("../../components/UpdatePaymentDetailsPopup"));
var _paymentMethodHelper = require("../../util/paymentMethodHelper");
var _PaymentInfoStyled = require("./PaymentInfoStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DEFAULT_TRANSACTIONS_NUMBER = 3;
var PaymentInfoFn = function PaymentInfoFn(_ref) {
  var paymentInfo = _ref.paymentInfo,
    setPaymentDetails = _ref.setPaymentDetails,
    setTransactionsToShow = _ref.setTransactionsToShow,
    hideInnerPopup = _ref.hideInnerPopup,
    innerPopup = _ref.innerPopup,
    showInnerPopup = _ref.showInnerPopup,
    setTransactionsList = _ref.setTransactionsList,
    setTransactionsListAsFetched = _ref.setTransactionsListAsFetched,
    hideShowMoreButton = _ref.hideShowMoreButton,
    setPublisherPaymentMethods = _ref.setPublisherPaymentMethods,
    availablePaymentMethodIds = _ref.availablePaymentMethodIds,
    t = _ref.t;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    paymentDetailsError = _useState2[0],
    setPaymentDetailsError = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    paymentDetailsLoading = _useState4[0],
    setPaymentDetailsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    transactionsError = _useState6[0],
    setTransactionsError = _useState6[1];
  var _useState7 = (0, _react.useState)(true),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    isTransactionsSectionLoading = _useState8[0],
    setIsTransactionsSectionLoading = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    isTransactionListExpanded = _useState10[0],
    setIsTransactionListExpanded = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    isTransactionsItemsLoading = _useState12[0],
    setIsTransactionsItemsLoading = _useState12[1];
  var toggleTransactionsList = function toggleTransactionsList() {
    if (isTransactionListExpanded) {
      setIsTransactionListExpanded(false);
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
    } else if (paymentInfo.isTransactionListFetched) {
      // if transactions was fetched - show all of them without calling API
      setIsTransactionListExpanded(true);
      setTransactionsToShow();
    } else {
      // fetch all transactions when the list expands for the first time
      setIsTransactionsItemsLoading(true);
      (0, _api.listCustomerTransactions)().then(function (response) {
        if (response.errors.length !== 0) {
          setTransactionsError(response.errors);
        } else {
          setIsTransactionListExpanded(true);
          setTransactionsListAsFetched();
          setTransactionsList(response.responseData.items); // state to hold whole transactions
          setTransactionsToShow(); // state to hold the array with showed transactions
        }
      }).catch(function () {
        setTransactionsError(['Something went wrong..']);
      }).finally(function () {
        setIsTransactionsItemsLoading(false);
      });
    }
  };
  var fetchPaymentDetials = function fetchPaymentDetials() {
    (0, _api.getPaymentDetails)().then(function (response) {
      if (response.errors.length) {
        setPaymentDetailsError(response.errors);
      } else {
        setPaymentDetails(response.responseData.paymentDetails);
      }
    }).catch(function () {
      setPaymentDetailsError(['Something went wrong..']);
    }).finally(function () {
      setPaymentDetailsLoading(false);
    });
  };
  var fetchTransactionsList = function fetchTransactionsList() {
    (0, _api.listCustomerTransactions)(DEFAULT_TRANSACTIONS_NUMBER + 1, 0) // fetching +1 transaction to check if have to show 'show more' button
    .then(function (response) {
      if (response.errors.length) {
        setTransactionsError(response.errors);
      } else {
        setTransactionsList(response.responseData.items);
        if (response.responseData.items.length > DEFAULT_TRANSACTIONS_NUMBER // if there are more transactions to fetch - show only default number
        ) {
          setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER);
        } else {
          // if there is nothing more to fetch
          setTransactionsToShow();
          setTransactionsListAsFetched();
          hideShowMoreButton();
        }
      }
    }).catch(function () {
      setTransactionsError(['Something went wrong..']);
    }).finally(function () {
      setIsTransactionsSectionLoading(false);
    });
  };
  var updatePaymentDetailsSection = function updatePaymentDetailsSection() {
    setPaymentDetailsLoading(true);
    fetchPaymentDetials();
  };
  (0, _react.useEffect)(function () {
    if (paymentInfo.paymentDetails && paymentInfo.paymentDetails.length === 0) {
      fetchPaymentDetials();
    } else {
      setPaymentDetailsLoading(false);
    }
    if (paymentInfo.transactionsList.length === 0) {
      fetchTransactionsList();
    } else if (paymentInfo.transactionsList.length !== 0) {
      setTransactionsToShow(DEFAULT_TRANSACTIONS_NUMBER); // if transactions are in state - show default number of them
      setIsTransactionsSectionLoading(false);
    }
    if (!paymentInfo.publisherPaymentMethods && (0, _paymentMethodHelper.areProvidedPaymentMethodIdsValid)(availablePaymentMethodIds)) {
      setPublisherPaymentMethods(availablePaymentMethodIds);
    }
    return function () {
      hideInnerPopup();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_PaymentInfoStyled.WrapStyled, null, innerPopup.isOpen && innerPopup.type === 'paymentDetails' ? /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopup.default, {
    hideInnerPopup: hideInnerPopup,
    setPublisherPaymentMethods: setPublisherPaymentMethods,
    updatePaymentDetailsSection: updatePaymentDetailsSection,
    selectedPaymentMethod: innerPopup.data
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, t('Current payment method')), /*#__PURE__*/_react.default.createElement(_PaymentMethod.default, {
    paymentDetailsLoading: paymentDetailsLoading,
    activeOrBoundPaymentDetails: paymentInfo.activeOrBoundPaymentDetails,
    showInnerPopup: showInnerPopup,
    error: paymentDetailsError
  }), /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
    marginTop: "25px"
  }, t('Payment history')), /*#__PURE__*/_react.default.createElement(_Transactions.default, {
    transactions: paymentInfo.transactionsToShow,
    toggleTransactionsList: toggleTransactionsList,
    isTransactionsItemsLoading: isTransactionsItemsLoading,
    isTransactionsSectionLoading: isTransactionsSectionLoading,
    isShowMoreButtonHidden: paymentInfo.isShowMoreButtonHidden,
    isExpanded: isTransactionListExpanded,
    error: transactionsError
  })));
};
PaymentInfoFn.propTypes = {
  setPaymentDetails: _propTypes.PropTypes.func.isRequired,
  setTransactionsList: _propTypes.PropTypes.func.isRequired,
  setTransactionsToShow: _propTypes.PropTypes.func.isRequired,
  setTransactionsListAsFetched: _propTypes.PropTypes.func.isRequired,
  hideShowMoreButton: _propTypes.PropTypes.func.isRequired,
  paymentInfo: _propTypes.PropTypes.objectOf(_propTypes.PropTypes.any),
  showInnerPopup: _propTypes.PropTypes.func.isRequired,
  hideInnerPopup: _propTypes.PropTypes.func.isRequired,
  innerPopup: _propTypes.PropTypes.objectOf(_propTypes.PropTypes.any).isRequired,
  setPublisherPaymentMethods: _propTypes.PropTypes.func.isRequired,
  availablePaymentMethodIds: _propTypes.PropTypes.shape({
    adyen: _propTypes.PropTypes.number,
    paypal: _propTypes.PropTypes.number
  }),
  t: _propTypes.PropTypes.func
};
PaymentInfoFn.defaultProps = {
  paymentInfo: {
    paymentMethod: [],
    transactionsList: []
  },
  availablePaymentMethodIds: null,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(PaymentInfoFn));
exports.default = _default;