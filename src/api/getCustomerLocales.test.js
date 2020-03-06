import getCustomerLocales from './getCustomerLocales';

describe('getCustomerLocales', () => {
  it('fetch customer locales on call', done => {
    const mockResponseData = {
      responseData: {
        locale: 'pl_PL',
        country: 'pl',
        currency: 'EUR'
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

    getCustomerLocales().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('fails on remote call error', async done => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject();
        })
    );

    getCustomerLocales().catch(done);
  });
});
