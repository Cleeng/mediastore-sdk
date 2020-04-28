export const cancellationReasons = [
  { value: 'Poor customer support', key: 'support' },
  { value: 'Switch to a different service', key: 'service' },
  { value: 'Subscription is too expensive', key: 'expensive' },
  { value: 'Video streaming issues', key: 'issues' },
  { value: 'Not enough interesting content', key: 'content' },
  { value: 'Service is hard to use', key: 'hardUse' },
  { value: 'Content I like has ended', key: 'end' }
];
export const content = {
  resubscribe: {
    confirm: {
      title: 'Resubscribe your plan.',
      text1: 'By clicking the',
      text2: 'button you agree to renew your current plan. Your fee will be',
      startedFrom: 'started from',
      reasons: false,
      buttonText: 'Resubscribe',
      buttonTheme: 'primary'
    },
    success: {
      title: 'Your plan has been renewed',
      text: 'You have been successfully resubscribed. Your fee will be',
      startedFrom: 'started from',
      buttonText: 'Back to settings'
    }
  },
  unsubscribe: {
    confirm: {
      title: 'We’re sorry to see you go.',
      text1: 'You will be unsubscribed from you current plan by clicking the',
      text2:
        'button below. Before You go, please let us know why you decided to unsubscribed:',
      reasons: true,
      buttonText: 'Unsubscribe',
      buttonTheme: 'danger'
    },
    success: {
      title: 'Miss you already.',
      text:
        'You have been successfully unsubscribed. Your current plan will expire on',
      buttonText: 'Back to settings'
    }
  }
};
