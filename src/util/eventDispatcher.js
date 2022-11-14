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
