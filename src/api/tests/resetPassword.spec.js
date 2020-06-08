import resetPassword from 'api/Auth/resetPassword';

describe('resetPassword', () => {
  it('calls remote endpoint', done => {
    const mockOfferId = 'mock-offer-id';
    const mockEmail = 'mock-email';
    const mockResponseData = { errors: [] };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { method }) =>
        new Promise((resolve, reject) => {
          if (method === 'PUT') {
            resolve({
              json: () => mockResponseData
            });
          } else {
            reject();
          }
        })
    );

    resetPassword(mockOfferId, mockEmail).then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('calls remote endpoint and catch messages', done => {
    const mockOfferId = 'mock-offer-id';
    const mockEmail = 'mock-email';
    const mockResponseData = { message: 'errorMessage' };
    const mockResponseErrorData = {
      message: mockResponseData.message,
      errors: [mockResponseData.message]
    };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { method }) =>
        new Promise((resolve, reject) => {
          if (method === 'PUT') {
            resolve({
              json: () => mockResponseData
            });
          } else {
            reject();
          }
        })
    );

    resetPassword(mockOfferId, mockEmail).then(res => {
      expect(res).toEqual(mockResponseErrorData);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockOfferId = 'mock-offer-id';
    const mockEmail = 'mock-email';
    const mockError = 'mock-error';
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error(mockError));

    resetPassword(mockOfferId, mockEmail).then(res => {
      const { errors } = res;
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe(mockError);
      done();
    });
  });
});
