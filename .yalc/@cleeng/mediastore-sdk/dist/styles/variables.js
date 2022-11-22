"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentMethodColors = exports.White = exports.Weak = exports.TinyFont = exports.TextFieldBorderFilter = exports.Strong = exports.SmallFont = exports.SecondaryColor = exports.PrimaryColor = exports.PaymentButtonBgn = exports.PayPal = exports.MyAccountTextLightGray = exports.MyAccountTextGray = exports.MyAccountMenuActive = exports.MyAccountMenu = exports.MyAccountContentColor = exports.MyAccountBlue = exports.MicroFont = exports.MediumGrey = exports.MediumFontWeight = exports.MediumFont = exports.LoaderColor = exports.LineColor = exports.LightFont = exports.LargeFont = exports.IconsColor = exports.Good = exports.FontColor = exports.FocusColor = exports.Fair = exports.ErrorColor = exports.ConfirmColor = exports.CardSecondaryColor = exports.CardColor = exports.BoldFont = exports.BigFont = exports.BackgroundColor = void 0;
var _appConfigHelper = require("../util/appConfigHelper");
/* eslint-disable no-unused-vars */

var _ref = (0, _appConfigHelper.getTheme)() || {},
  backgroundColor = _ref.backgroundColor,
  loaderColor = _ref.loaderColor,
  successColor = _ref.successColor,
  errorColor = _ref.errorColor,
  fontColor = _ref.fontColor,
  cardColor = _ref.cardColor,
  primaryColor = _ref.primaryColor,
  secondaryColor = _ref.secondaryColor;

// My Account
var MyAccountBlue = '#031a6e';
exports.MyAccountBlue = MyAccountBlue;
var MyAccountContentColor = '#f8f9fc';
exports.MyAccountContentColor = MyAccountContentColor;
var MyAccountTextGray = '#7B849D';
exports.MyAccountTextGray = MyAccountTextGray;
var MyAccountTextLightGray = '#F2F5FC';
exports.MyAccountTextLightGray = MyAccountTextLightGray;
var CardSecondaryColor = '#182c7a';
exports.CardSecondaryColor = CardSecondaryColor;
var MyAccountMenu = '#f2f5fc';
exports.MyAccountMenu = MyAccountMenu;
var MyAccountMenuActive = successColor || '#4EB7A1';
exports.MyAccountMenuActive = MyAccountMenuActive;
var PayPal = '#61AEF0';

// Payment Methods
exports.PayPal = PayPal;
var paymentMethodColors = {
  paypalMainColor: '#61AEF0',
  paypalSecondaryColor: '#74B8F2',
  amazonMainColor: '#FDA625',
  amazonSecondaryColor: '#EF9A1B',
  appleMainColor: '#1C1C1C',
  appleSecondaryColor: '#252525',
  androidMainColor: '#62DBA3',
  androidSecondaryColor: '#63CB9B',
  rokuMainColor: '#662C91',
  rokuSecondaryColor: '#7838A8'
};

// Common colors
exports.paymentMethodColors = paymentMethodColors;
var BackgroundColor = backgroundColor || '#F8FAFD';
exports.BackgroundColor = BackgroundColor;
var CardColor = cardColor || '#ffffff';
exports.CardColor = CardColor;
var FontColor = fontColor || '#515364';
exports.FontColor = FontColor;
var ConfirmColor = successColor || '#4EB7A1';
exports.ConfirmColor = ConfirmColor;
var ErrorColor = errorColor || '#CB4477';
exports.ErrorColor = ErrorColor;
var PrimaryColor = primaryColor || FontColor;
exports.PrimaryColor = PrimaryColor;
var SecondaryColor = secondaryColor || BackgroundColor;
exports.SecondaryColor = SecondaryColor;
var LoaderColor = loaderColor || '#eeeff2';
exports.LoaderColor = LoaderColor;
var IconsColor = '#BCC3CD';
exports.IconsColor = IconsColor;
var LineColor = '#D3DBE6';
exports.LineColor = LineColor;
var White = '#FFFFFF';
exports.White = White;
var MediumGrey = '#b7bfca';
exports.MediumGrey = MediumGrey;
var TextFieldBorderFilter = 'invert(87%) sepia(14%) saturate(243%) hue-rotate(213deg) brightness(96%) contrast(80%)';
exports.TextFieldBorderFilter = TextFieldBorderFilter;
var FocusColor = '#80b4ea';
exports.FocusColor = FocusColor;
var PaymentButtonBgn = '#00112c';
exports.PaymentButtonBgn = PaymentButtonBgn;
var Weak = '#ea753c';
exports.Weak = Weak;
var Fair = '#e7ca27';
exports.Fair = Fair;
var Good = '#5da3bd';
exports.Good = Good;
var Strong = '#5db98f';

// Fonts
exports.Strong = Strong;
var LargeFont = '25px';
exports.LargeFont = LargeFont;
var BigFont = '16px';
exports.BigFont = BigFont;
var MediumFont = '14px';
exports.MediumFont = MediumFont;
var SmallFont = '12px';
exports.SmallFont = SmallFont;
var TinyFont = '11px';
exports.TinyFont = TinyFont;
var MicroFont = '9px';
exports.MicroFont = MicroFont;
var BoldFont = '700';
exports.BoldFont = BoldFont;
var MediumFontWeight = '600';
exports.MediumFontWeight = MediumFontWeight;
var LightFont = '300';
exports.LightFont = LightFont;