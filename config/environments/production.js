module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    GB_API_URL: JSON.stringify(
      'https://hc0f1jaa70.execute-api.eu-west-1.amazonaws.com/staging'
    ),
    ADYEN_PUBLIC_KEY: {
      'https://example.cleeng.com': JSON.stringify('pub.v2.xxx')
    },
    WEB_API: JSON.stringify('https://cleeng.com')
  }
};
