import submitPayment from './submitPayment';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

describe('submitPayment', () => {
  it('calls remote endpoint with authorization token', done => {
    const mockToken = 'TOKEN';

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}`) {
            resolve({
              ok: true
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, mockToken);
    submitPayment().then(res => {
      expect(res).toBe(true);
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

    submitPayment().then(res => {
      expect(res).toBe(false);
      done();
    });
  });
});
