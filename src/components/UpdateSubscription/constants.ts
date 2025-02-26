export const DEFAULT_CANCELLATION_REASONS = [
  {
    value: 'Poor customer support',
    key: 'unsubscribe-popup.cancellation.poor-customer-support'
  },
  {
    value: 'Switch to a different service',
    key: 'unsubscribe-popup.cancellation.service-switch'
  },
  {
    value: 'Subscription is too expensive',
    key: 'unsubscribe-popup.cancellation.too-expensive'
  },
  {
    value: 'Video streaming issues',
    key: 'unsubscribe-popup.cancellation.streaming-issues'
  },
  {
    value: 'Not enough interesting content',
    key: 'unsubscribe-popup.cancellation.not-interesting-content'
  },
  {
    value: 'Service is hard to use',
    key: 'unsubscribe-popup.cancellation.hard-to-use'
  },
  {
    value: 'Content I like has ended',
    key: 'unsubscribe-popup.cancellation.content-ended'
  }
];

// This is a bug in ESLint, it should not be throwing an error here
// eslint-disable-next-line no-shadow
export enum STEPS {
  FREE_EXTENSION = 'FREE_EXTENSION',
  PAUSE = 'PAUSE',
  DOWNGRADES = 'DOWNGRADES',
  SURVEY = 'SURVEY',
  CONFIRMATION = 'CONFIRMATION'
}

export const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];
