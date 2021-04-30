import { ReactComponent as subscriptionCardPlaceholderIcon } from 'assets/images/subscriptionCardPlaceholder.svg';

const mapErrorToText = {
  RECURRING_PROCESS_ALREADY_STARTED: {
    title: 'You are at the end of the billing cycle for your current offer.',
    subtitle: 'Once the new one starts, you can switch to a new offer.',
    icon: subscriptionCardPlaceholderIcon
  },
  PAYMENT_GATEWAY_NOT_SUPPORTED: {
    title:
      'Your payment method does not allow switching to a new plan from here.',
    subtitle:
      'If you signed up via a mobile app, it may be possible to change your plan there.',
    icon: subscriptionCardPlaceholderIcon
  }
};

export default mapErrorToText;
