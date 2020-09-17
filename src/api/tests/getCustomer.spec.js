import getCustomer from 'api/Customer/getCustomer';
import { setData } from 'util/appConfigHelper';

describe('getCustomer', () => {
  it('calls remote endpoint with authorization token', done => {
    const mockToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiOTUzODAwMDE5Iiwib2ZmZXJJZCI6IlM4NzczNjU4MjBfWlcifQ.BIkzQFE40F6Ig510zaw4aGDa-T0qcrQrWJU8yg3vQvYmjIdVip_9jGxVDA68TT7EF5VmLkTOvEQ-YdLLpygiyCgmncPM_dBvFBx13dwpji2aojqz03hWwHxfYlxQEbMFOiro80XBapmcJQh4kMaZNpQHE9Axx3ooHuOGPXrDy2SzVZTSW3-tG2AoSdkGWVmXBcngDUZjdZdBO9R8j4S1sZ3KxAtWexUHjOmiZos-OOTihp5aFutxm1Faq5qD7f19xBopQ-j3T3gr06oAbcdIyPF8pTUlEmRU1MuFMcMlpVtwPG-P5LoJ_W7fbF7HI-B3DyYHcSXNAehVB54_ETd34g';
    const mockResponse = { responseData: { items: [] } };
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
    getCustomer().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    getCustomer().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
