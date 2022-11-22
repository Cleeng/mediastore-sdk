"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.SurveyCard = exports.StyledItem = exports.StrongStyled = exports.ReasonsWrapper = exports.Loader = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _Card = _interopRequireDefault(require("../Card"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var SurveyCard = (0, _styledComponents.default)(_Card.default)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid ", ";\n  height: 100%;\n  min-height: 500px;\n  display: flex;\n  ", ";\n"])), _variables.LineColor, _BreakPoints.media.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    align-items: flex-start;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100vh;\n    overflow-y: scroll;\n  "]))));
exports.SurveyCard = SurveyCard;
var WrapperStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 30px 10px;\n  margin: auto;\n"])));
exports.WrapperStyled = WrapperStyled;
var ReasonsWrapper = _styledComponents.default.ul(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 30px 0;\n  list-style: none;\n"])));
exports.ReasonsWrapper = ReasonsWrapper;
var StyledItem = _styledComponents.default.li(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 0 20px 0;\n  color: ", ";\n\n  font-size: 13px;\n"])), _variables.FontColor);
exports.StyledItem = StyledItem;
var Loader = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-color: #5cb85c;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  border-radius: 50%;\n  width: 7em;\n  height: 7em;\n  transition: border 500ms ease-out;\n  margin-bottom: 20px;\n"])));
exports.Loader = Loader;
var StrongStyled = _styledComponents.default.strong(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  text-transform: uppercase;\n"])));
exports.StrongStyled = StrongStyled;