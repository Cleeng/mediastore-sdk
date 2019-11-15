import registerCustomer from './registerCustomer';

describe('registerCustomer', () => {
  it('register user on call', done => {
    const mockResponseData = {
      status: 200,
      responseData: { jwt: 'jvbreigburtij' }
    };

    jest.spyOn(global, 'fetch').mockImplementation(
      async () =>
        new Promise(resolve => {
          resolve({
            json: () => mockResponseData
          });
        })
    );

    registerCustomer().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockError = 'mock-error';
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(mockError);
        })
    );

    registerCustomer().then(res => {
      expect(res).toBe(mockError);
      done();
    });
  });
});
