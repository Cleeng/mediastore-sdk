import checkCaptcha from './checkCaptcha';

describe('checkCaptcha', () => {
  it('should return correct response on success', done => {
    const mockResponseData = {
      responseData: {
        required: false
      }
    };
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      async () =>
        new Promise(resolve => {
          resolve({
            json: () => mockResponseData
          });
        })
    );

    checkCaptcha().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('should fails on remote call error', async done => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject();
        })
    );

    checkCaptcha().catch(done);
  });
});
