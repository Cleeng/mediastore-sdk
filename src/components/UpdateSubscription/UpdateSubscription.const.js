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
  resubscribe: [
    {
      title: 'Resume your plan',
      text1:
        'By clicking the button below you can resume your plan. Your next bill will be on',
      text2: '',
      startedFrom: '',
      andWillBe: 'and will be',
      reasons: false,
      buttonText: 'Resume',
      backButtonText: 'No, thanks',
      buttonTheme: 'confirm'
    },
    {
      title: 'Your plan has been renewed',
      text: 'You have been successfully resubscribed. Your fee will be',
      startedFrom: 'started from',
      buttonText: 'Back to settings'
    }
  ],
  unsubscribe: [
    {
      title: 'We’re sorry to see you go.',
      text1: 'You will be unsubscribed from your current plan by clicking the',
      text2:
        'button below. Before you go, please let us know why you decided to leave:',
      reasons: true,
      buttonText: 'Unsubscribe',
      backButtonText: 'Go back',
      buttonTheme: 'confirm'
    },
    {
      title: 'Miss you already.',
      text:
        'You have been successfully unsubscribed. Your current plan will expire on',
      buttonText: 'Back to settings'
    }
  ]
};
