import createOrder from './createOrder';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

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

    localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, mockToken);
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
