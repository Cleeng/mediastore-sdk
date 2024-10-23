import { getTheme } from 'util/appConfigHelper';

const {
  backgroundColor,
  loaderColor,
  successColor,
  errorColor,
  fontColor,
  cardColor,
  primaryColor,
  secondaryColor,
  logoUrl
} = (typeof getTheme === 'function' && getTheme()) || {};

// My Account
export const MyAccountBlue = '#031a6e';
export const MyAccountContentColor = '#f8f9fc';
export const MyAccountTextGray = '#7B849D';
export const MyAccountTextLightGray = '#F2F5FC';
export const CardSecondaryColor = '#182c7a';
export const MyAccountMenu = '#f2f5fc';
export const MyAccountMenuActive = successColor || '#4EB7A1';
export const PayPal = '#ffc439';

// Payment Methods
export const paymentMethodColors = {
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
export const BackgroundColor = backgroundColor || '#F8FAFD';
export const CardColor = cardColor || '#ffffff';
export const FontColor = fontColor || '#515364';
export const ConfirmColor = successColor || '#4EB7A1';
export const ErrorColor = errorColor || '#CB4477';
export const PrimaryColor = primaryColor || FontColor;
export const SecondaryColor = secondaryColor || BackgroundColor;
export const LoaderColor = loaderColor || '#eeeff2';
export const IconsColor = '#BCC3CD';
export const LineColor = '#D3DBE6';
export const White = '#FFFFFF';
export const MediumGrey = '#b7bfca';
export const TextFieldBorderFilter =
  'invert(87%) sepia(14%) saturate(243%) hue-rotate(213deg) brightness(96%) contrast(80%)';
export const FocusColor = '#80b4ea';
export const PaymentButtonBgn = '#00112c';
export const LogoUrl = logoUrl || '';

export const PasswordStrengthColors = {
  Weak: '#ea753c',
  Fair: '#e7ca27',
  Good: '#5da3bd',
  Strong: '#5db98f',
  NotValid: '#CB4477'
};

// Fonts
export const LargeFont = '25px';
export const BigFont = '16px';
export const MediumFont = '14px';
export const SmallFont = '12px';
export const TinyFont = '11px';
export const MicroFont = '9px';

export const BoldFont = '700';
export const MediumFontWeight = '500';
export const LightFont = '300';

export const inputTheme = {
  FontColor,
  BackgroundColor,
  ConfirmColor,
  ErrorColor,
  TextFieldBorderFilter,
  PasswordStrengthColors
};
