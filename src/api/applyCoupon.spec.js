import applyCoupon from './applyCoupon';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

describe('applyCoupon', () => {
  it('calls remote endpoint', done => {
    const mockToken = 'MOCK_TOKEN';
    const mockCouponCode = 'MOCK_COUPON_CODE';
    const mockResponseData = { price: 9 };

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { method, body, headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (
            Authorization === `Bearer ${mockToken}` &&
            method === 'POST' &&
            JSON.parse(body).couponCode === mockCouponCode
          ) {
            resolve({
              json: () => mockResponseData
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, mockToken);
    applyCoupon(mockCouponCode).then(res => {
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

    applyCoupon().catch(done);
  });
});
