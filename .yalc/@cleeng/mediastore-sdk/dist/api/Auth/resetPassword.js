"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fetchHelper = require("../../util/fetchHelper");
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var resetPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(customerEmail) {
    var publisherId,
      API_URL,
      url,
      res,
      json,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            publisherId = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
            API_URL = (0, _environmentHelper.default)();
            url = "".concat(API_URL, "/customers/passwords");
            _context.prev = 3;
            _context.next = 6;
            return (0, _fetchHelper.fetchWithHeaders)(url, {
              method: 'PUT',
              body: JSON.stringify({
                publisherId: publisherId,
                customerEmail: customerEmail
              })
            });
          case 6:
            res = _context.sent;
            _context.next = 9;
            return res.json();
          case 9:
            json = _context.sent;
            if (!json.message) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", _objectSpread(_objectSpread({}, json), {}, {
              errors: [json.message]
            }));
          case 12:
            return _context.abrupt("return", _objectSpread({
              status: res.status
            }, json));
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", {
              errors: [_context.t0.message]
            });
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 15]]);
  }));
  return function resetPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = resetPassword;
exports.default = _default;