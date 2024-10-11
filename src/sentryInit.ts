import {
  BrowserClient,
  defaultStackParser,
  getDefaultIntegrations,
  makeFetchTransport,
  Scope
} from '@sentry/browser';
import { getData } from 'util/appConfigHelper';

const SENTRY_SUPPORTED_ENVIRONMENTS = ['production', 'sandbox'];
const cleengEnvironment = getData('CLEENG_ENVIRONMENT');

console.log(
  '########## mssdk sentry init file root',
  SENTRY_SUPPORTED_ENVIRONMENTS
);
console.log(
  '########## mssdk sentry init file root cleeng env',
  cleengEnvironment
);
console.log(
  '########## mssdk sentry init file root result:',
  SENTRY_SUPPORTED_ENVIRONMENTS.includes(cleengEnvironment)
);

if (SENTRY_SUPPORTED_ENVIRONMENTS.includes(cleengEnvironment)) {
  const mediastoreSDKRegexp = /@?cleeng.mediastore-sdk/;

  // * filter out the integrations that use the global context
  const integrations = getDefaultIntegrations({}).filter(
    (defaultIntegration) => {
      return !['BrowserApiErrors', 'Breadcrumbs', 'GlobalHandlers'].includes(
        defaultIntegration.name
      );
    }
  );

  const client = new BrowserClient({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations,
    environment: cleengEnvironment,
    release: import.meta.env.VITE_MEDIASTORE_SDK_VERSION,
    attachStacktrace: true,
    autoSessionTracking: true,
    sendClientReports: true,
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/auth\.api\.prod\.cleeng\.com\/.*/,
      /^https:\/\/auth\.api\.sandbox\.cleeng\.com\/.*/,
      /^https:\/\/api\.cleeng\.com\/3\.0\/json-rpc\/.*/,
      /^https:\/\/sandbox\.cleeng\.com\/api\/3\.0\/json-rpc\/.*/,
      /^https:\/\/mediastoreapi\.cleeng\.com\/.*/,
      /^https:\/\/mediastoreapi-sandbox\.cleeng\.com\/.*/,
      /^https:\/\/api\.cleeng\.com\/3\.1\/.*/,
      /^https:\/\/api\.sandbox\.cleeng\.com\/3\.1\/.*/
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      return {
        ...event,
        extra: {
          ...event.extra,
          publisherId: getData('CLEENG_PUBLISHER_ID'),
          offerId: getData('CLEENG_OFFER_ID')
        }
      };
    }
  });

  const scope = new Scope();
  scope.setClient(client);
  client.init();

  window.addEventListener('error', (event: ErrorEvent) => {
    console.log('####### mssdk error event: ', event);
    console.log(
      '####### mssdk error condition result: ',
      !mediastoreSDKRegexp.test(event.error.stack ?? event.filename ?? '')
    );
    console.log('####### mssdk error stack: ', event.error.stack);
    console.log('####### mssdk error filename: ', event.filename);

    if (!mediastoreSDKRegexp.test(event.error.stack ?? event.filename ?? '')) {
      return;
    }
    scope.captureException(event);
  });
  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      if (!mediastoreSDKRegexp.test(event.reason.stack ?? '')) {
        return;
      }
      scope.captureException(event);
    }
  );
}
