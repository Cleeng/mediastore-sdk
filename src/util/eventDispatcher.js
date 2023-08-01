export default (title, detail) => {
  window.dispatchEvent(
    new CustomEvent(title, {
      detail
    })
  );
};

export const MSSDK_PURCHASE_SUCCESSFUL = 'MSSDK:purchase-successful';
export const MSSDK_PURCHASE_FAILED = 'MSSDK:purchase-failed';
export const MSSDK_ADYEN_ERROR = 'MSSDK:Adyen-error';
export const MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL =
  'MSSDK:update-payment-details-successful';
export const MSSDK_UPDATE_PAYMENT_DETAILS_FAILED =
  'MSSDK:update-payment-details-failed';
export const MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED =
  'MSSDK:remove-payment-details-button-clicked';
export const MSSDK_REDEEM_BUTTON_CLICKED = 'MSSDK:redeem-button-clicked';
export const MSSDK_REDEEM_COUPON_BUTTON_CLICKED =
  'MSSDK:redeem-coupon-button-clicked';
export const MSSDK_COUPON_SUCCESSFUL = 'MSSDK:redeem-coupon-success';
export const MSSDK_COUPON_FAILED = 'MSSDK:redeem-coupon-failed';
export const MSSDK_PURCHASE_LOADED = 'MSSDK:Purchase-loaded';
export const MSSDK_EDIT_PAYMENT_BUTTON_CLICKED =
  'MSSDK:edit-payment-button-clicked';
export const MSSDK_SWITCH_POPUP_ACTION_SUCCESSFUL =
  'MSSDK:switch-popup-action-successful';
export const MSSDK_SWITCH_POPUP_ACTION_FAILED =
  'MSSDK:switch-popup-action-failed';
export const MSSDK_SWITCH_POPUP_ACTION_CANCELLED =
  'MSSDK:switch-popup-action-cancelled';
export const MSSDK_CANCEL_SWITCH_ACTION_TRIGGERED =
  'MSSDK:cancel-switch-action-triggered';
export const MSSDK_CANCEL_SWITCH_ACTION_SUCCESSFUL =
  'MSSDK:cancel-switch-action-successful';
export const MSSDK_CANCEL_SWITCH_ACTION_FAILED =
  'MSSDK:cancel-switch-action-failed';
export const MSSDK_CANCEL_SWITCH_ACTION_CANCELLED =
  'MSSDK:cancel-switch-action-cancelled';
