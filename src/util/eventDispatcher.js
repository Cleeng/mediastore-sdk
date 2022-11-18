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
