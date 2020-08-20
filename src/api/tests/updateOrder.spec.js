import updateOrder from 'api/Offer/updateOrder';
import { setData } from 'util/appConfigHelper';

describe('updateOrder', () => {
  it('calls remote endpoint with authorization token', done => {
    const mockToken = 'TOKEN';
    const mockResponse = { foo: 'ok' };
    jest.spyOn(Storage.prototype, 'setItem');

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

    setData('CLEENG_AUTH_TOKEN', mockToken);
    updateOrder().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    updateOrder().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
