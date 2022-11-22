"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var submitConsents = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(consents, consentDefinitions) {
    var payload,
      API_URL,
      _jwtDecode,
      customerId,
      url,
      consentsPayload,
      res,
      json,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            API_URL = (0, _environmentHelper.default)();
            _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')), customerId = _jwtDecode.customerId;
            url = "".concat(API_URL, "/customers/").concat(customerId, "/consents");
            if (!payload) {
              consentsPayload = consentDefinitions.map(function (consentDefinition, index) {
                return {
                  name: consentDefinition.name,
                  version: consentDefinition.version,
                  state: consents[index] ? 'accepted' : 'declined'
                };
              });
            } else {
              consentsPayload = payload;
            }
            _context.prev = 5;
            _context.next = 8;
            return (0, _fetchHelper.default)(url, {
              method: 'PUT',
              body: JSON.stringify({
                consents: consentsPayload
              })
            });
          case 8:
            res = _context.sent;
            _context.next = 11;
            return res.json();
          case 11:
            json = _context.sent;
            return _context.abrupt("return", json);
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", {
              errors: [_context.t0.message]
            });
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 15]]);
  }));
  return function submitConsents(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = submitConsents;
exports.default = _default;