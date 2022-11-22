"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var useMessage = function useMessage() {
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    message = _useState2[0],
    setMessageText = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    type = _useState4[0],
    setType = _useState4[1];
  var setMessage = function setMessage(newMessage) {
    setMessageText(newMessage.message);
    setType(newMessage.type);
  };
  var resetMessage = function resetMessage() {
    setMessageText('');
    setType('');
  };
  return [message, type, setMessage, resetMessage];
};
var _default = useMessage;
exports.default = _default;