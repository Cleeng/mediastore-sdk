const ERROR_CODES = {
  REQUEST: {
    INVALID_REQUEST_BODY: 'REQ0001',
    INVALID_QUERY_PARAM: 'REQ0002',
    INVALID_PATH_PARAM: 'REQ0003'
  },
  CAPTCHA: {
    VERIFICATION_REQUIRED: 'CPT0001',
    VERIFICATION_FAILED: 'CPT0002'
  },
  USER: {
    WRONG_CREDENTIALS: 'USER0001',
    ALREADY_EXISTS: 'USER0002',
    NOT_ASSOCIATED_WITH_PUBLISHER: 'USER0003'
  },
  AUTH: {
    MISSING_JWT: 'AUTH0001',
    INVALID_JWT: 'AUTH0002',
    TOKEN_EXPIRED: 'AUTH0003'
  },
  ADYEN: {
    ORDER_NOT_FOUND: 'ADYEN0001',
    REFUSED: 'ADYEN0002',
    CANCELLED: 'ADYEN0003',
    ERROR: 'ADYEN0004',
    UNABLE_TO_PROCESS: 'ADYEN0005'
  },
  SERVER: {
    INTERNAL_SERVER_ERROR: 'S0001'
  }
};

export default ERROR_CODES;
