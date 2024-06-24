import subscriptionCardPlaceholderIcon from 'assets/images/subscriptionCardPlaceholder.svg';

const mapErrorToText = {
  RECURRING_PROCESS_ALREADY_STARTED: {
    title: {
      text: 'You are at the end of the billing cycle for your current offer.',
      translationKey:
        'subscription-switches-list.error.recurring-process-already-started.title'
    },
    subtitle: {
      text: 'Once the new one starts, you can switch to a new offer.',
      translationKey:
        'subscription-switches-list.error.recurring-process-already-started.subtitle'
    },
    icon: subscriptionCardPlaceholderIcon
  },
  PAYMENT_GATEWAY_NOT_SUPPORTED: {
    title: {
      text: 'Your payment method does not allow switching to a new plan from here.',
      translationKey:
        'subscription-switches-list.error.payment-gateway-not-supported.title'
    },
    subtitle: {
      text: 'If you signed up via a mobile app, it may be possible to change your plan there.',
      translationKey:
        'subscription-switches-list.error.payment-gateway-not-supported.subtitle'
    },
    icon: subscriptionCardPlaceholderIcon
  },
  SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
    title: {
      text: "You can't change your subscription if a coupon was applied. To change plan, please cancel your current subscription and purchase a new one",
      translationKey:
        'subscription-switches-list.error.subscription-with-coupon-not-allowed.title'
    },
    subtitle: '',
    icon: subscriptionCardPlaceholderIcon
  },
  DEFAULT: {
    title: {
      text: "It looks like you can't change your current plan.",
      translationKey: 'subscription-switches-list.error.default.title'
    },
    subtitle: {
      text: 'Try again later.',
      translationKey: 'subscription-switches-list.error.default.subtitle'
    },
    icon: subscriptionCardPlaceholderIcon
  }
};

export default mapErrorToText;
