export {};

type RecaptchaOptions = {
  enterprise: boolean;
};

declare global {
  interface Window {
    recaptchaOptions: RecaptchaOptions;
  }
}
