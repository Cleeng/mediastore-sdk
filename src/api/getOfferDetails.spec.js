import getOfferDetails from './getOfferDetails';

describe('getOfferDetails', () => {
  it('calls remote endpoint with authorization token', done => {
    const mockToken = 'TOKEN';
    const mockResponseData = { price: 9 };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}`) {
            resolve({
              json: () => mockResponseData
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem('CLEENG_AUTH_TOKEN', mockToken);
    getOfferDetails().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('fails on remote call error', done => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject();
        })
    );

    getOfferDetails().catch(done);
  });
});
