import {
  BrowserClient,
  defaultStackParser,
  getDefaultIntegrations,
  makeFetchTransport,
  Scope
} from '@sentry/browser';
import { getData } from 'util/appConfigHelper';

const SENTRY_SUPPORTED_ENVIRONMENTS = ['production', 'sandbox', 'staging'];
const cleengEnvironment = getData('CLEENG_ENVIRONMENT');

if (SENTRY_SUPPORTED_ENVIRONMENTS.includes(cleengEnvironment)) {
  const CLEENG_COMPILED_FILENAME = '@cleeng_mediastore-sdk.js';
  const mediastoreSDKRegex = /@?cleeng.mediastore-sdk/;

  // /node_modules/.pnpm/@cleeng+mediastore-sdk@file+.yalc+@cleeng+mediastore-sdk_@types+react@18.3.11_react-dom@18.3._b4jcenvjzlrd7p7jqldch25okm/node_modules/@cleeng/mediastore-sdk/dist/cleeng-mediastore-sdk.js
  // at ./node_modules/@cleeng/mediastore-sdk/dist/cleeng-mediastore-sdk.js (RequiredInput.tsx:15:1)

  // filter integrations that use the global variable
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

  client.init(); // initializing has to be done after setting the client on the scope

  // You can capture exceptions manually for this client like this:
  window.addEventListener('error', (event: ErrorEvent) => {
    // if (!event.filename.includes(CLEENG_COMPILED_FILENAME)) {
    //   return;
    // }
    if (!mediastoreSDKRegex.test(event.error.stack ?? event.filename ?? '')) {
      return;
    }

    console.log('######################### sentry init > error event', event);

    // scope.setExtras({ ...event });
    // scope.addBreadcrumb({});
    scope.captureException(event);
  });

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      console.log(
        '########### sentry init > Unhandled promise rejection:',
        event
      );

      if (!mediastoreSDKRegex.test(event.reason.stack ?? '')) {
        return;
      }

      scope.captureException(event);
    }
  );
  // }
  // window.addEventListener(
  //   'unhandledrejection',
  //   (event: PromiseRejectionEvent) => {
  //     event.
  //     if (!event.filename.includes('@cleeng_mediastore-sdk.js')) {
  //       return;
  //     }
  //     console.log(
  //       '######################### sentry init > unhandled rejection',
  //       event
  //     );

  //     scope.captureException(event.reason);
  //   }
  // );
  // if (SHOULD_USE_SENTRY) {
  //   Sentry.init({
  //     dsn: import.meta.env.VITE_SENTRY_DSN,
  //     environment: cleengEnvironment,
  //     release: import.meta.env.VITE_MEDIASTORE_SDK_VERSION,
  //     attachStacktrace: true,
  //     autoSessionTracking: true,
  //     sendClientReports: true,
  //     tracesSampleRate: 1.0,
  //     tracePropagationTargets: [
  //       'localhost',
  //       /^https:\/\/auth\.api\.prod\.cleeng\.com\/.*/,
  //       /^https:\/\/auth\.api\.sandbox\.cleeng\.com\/.*/,
  //       /^https:\/\/api\.cleeng\.com\/3\.0\/json-rpc\/.*/,
  //       /^https:\/\/sandbox\.cleeng\.com\/api\/3\.0\/json-rpc\/.*/,
  //       /^https:\/\/mediastoreapi\.cleeng\.com\/.*/,
  //       /^https:\/\/mediastoreapi-sandbox\.cleeng\.com\/.*/,
  //       /^https:\/\/api\.cleeng\.com\/3\.1\/.*/,
  //       /^https:\/\/api\.sandbox\.cleeng\.com\/3\.1\/.*/
  //     ],
  //     replaysSessionSampleRate: 0.1,
  //     replaysOnErrorSampleRate: 1.0,
  //     beforeSend(event) {
  //       return {
  //         ...event,
  //         extra: {
  //           ...event.extra,
  //           publisherId: getData('CLEENG_PUBLISHER_ID'),
  //           offerId: getData('CLEENG_OFFER_ID')
  //         }
  //       };
  //     }
}
