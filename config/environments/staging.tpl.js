module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    GB_API_URL: JSON.stringify('$STAGING_GB_API_URL'),
    ADYEN_PUBLIC_KEY: {
      '$STAGING_ADYEN_PUBLIC_KEY_URL': JSON.stringify('$STAGING_ADYEN_PUBLIC_KEY')
    },
    WEB_API: JSON.stringify('$STAGING_WEB_API')
  }
};
