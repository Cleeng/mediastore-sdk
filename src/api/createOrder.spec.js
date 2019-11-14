import createOrder from './createOrder';

describe('createOrder', () => {
  it('calls remote endpoint with authorization token', done => {
    const mockToken = 'TOKEN';
    const mockResponse = { foo: 'ok' };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}`) {
            resolve({
              json: () => mockResponse
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem('CLEENG_AUTH_TOKEN', mockToken);
    createOrder().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject();
        })
    );

    createOrder().catch(() => {
      expect(mockFetch).toHaveBeenCalled();
      done();
    });
  });
});
