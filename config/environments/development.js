module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    GB_API_URL: JSON.stringify(
      'https://ke4vfe4m32.execute-api.eu-west-1.amazonaws.com/dev'
    ),
    USE_API_MOCK: true,
    GOOGLE_TAG_MANAGER: JSON.stringify('GTM-XXX'),
    OFFER_ID: JSON.stringify('S705970293_NL'),
    ADYEN_PUBLIC_KEY: {
      'http://dev.cleeng.com:6006': JSON.stringify(
        'pub.v2.7814375173870120.aHR0cDovL2Rldi5jbGVlbmcuY29tOjYwMDY.6Su4p0yHPsSwq2r5oyXmrZhm36-rY3S4g80zERMq5sc'
      ),
      'http://dev.cleeng.com:3003': JSON.stringify(
        'pub.v2.7814375173870120.aHR0cDovL2Rldi5jbGVlbmcuY29tOjMwMDM.eqa5FUKA4GhqEd5aQdNLQQpUm6VLusOh9m5HcFQ2gwY'
      )
    }
  }
};
