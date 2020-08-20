import submitPayPalPayment from 'api/Offer/submitPayPalPayment';
import { setData } from 'util/appConfigHelper';

describe('submitPayPalPayment', () => {
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
    submitPayPalPayment().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('error'));

    submitPayPalPayment().then(res => {
      expect(res).toEqual(new Error('error'));
      done();
    });
  });
});
