"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var updateCaptureAnswers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(anwsers) {
    var API_URL, _jwtDecode, customerId, url, payload, resp, json;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')), customerId = _jwtDecode.customerId;
            url = "".concat(API_URL, "/customers/").concat(customerId, "/capture");
            payload = {
              firstName: anwsers.firstName || null,
              lastName: anwsers.lastName || null,
              address: anwsers.address || null,
              address2: anwsers.address2 || null,
              city: anwsers.city || null,
              state: anwsers.state || null,
              postCode: anwsers.postCode || null,
              country: anwsers.country || null,
              email: anwsers.email || null,
              birthDate: anwsers.birthDate || null,
              companyName: anwsers.companyName || null,
              phoneNumber: anwsers.phoneNumber || null,
              customAnswers: anwsers.customAnswers || null
            };
            _context.next = 6;
            return (0, _fetchHelper.default)(url, {
              method: 'PUT',
              body: JSON.stringify(payload)
            });
          case 6:
            resp = _context.sent;
            _context.next = 9;
            return resp.json();
          case 9:
            json = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: resp.status
            }, json));
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function updateCaptureAnswers(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = updateCaptureAnswers;
exports.default = _default;