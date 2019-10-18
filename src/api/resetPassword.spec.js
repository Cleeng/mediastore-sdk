import resetPassword from './resetPassword';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

describe('resetPassword', () => {
  it('calls remote endpoint', done => {
    const mockToken = 'MOCK_TOKEN';
    const mockResponseData = { errors: [] };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { method, headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}` && method === 'PUT') {
            resolve({
              json: () => mockResponseData
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, mockToken);
    resetPassword().then(res => {
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

    resetPassword().catch(done);
  });
});
