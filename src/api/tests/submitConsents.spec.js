import submitConsents from 'api/Customer/submitConsents';
import { setData } from 'util/appConfigHelper';

describe('submitConsents', () => {
  const mockConsentDef = [
    {
      name: 'name',
      version: '1',
      required: false,
      label: '<a>Terms</a>'
    }
  ];
  const mockConsent = [true];
  it('calls remote endpoint with authorization token', done => {
    const mockToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiOTUzODAwMDE5Iiwib2ZmZXJJZCI6IlM4NzczNjU4MjBfWlcifQ.BIkzQFE40F6Ig510zaw4aGDa-T0qcrQrWJU8yg3vQvYmjIdVip_9jGxVDA68TT7EF5VmLkTOvEQ-YdLLpygiyCgmncPM_dBvFBx13dwpji2aojqz03hWwHxfYlxQEbMFOiro80XBapmcJQh4kMaZNpQHE9Axx3ooHuOGPXrDy2SzVZTSW3-tG2AoSdkGWVmXBcngDUZjdZdBO9R8j4S1sZ3KxAtWexUHjOmiZos-OOTihp5aFutxm1Faq5qD7f19xBopQ-j3T3gr06oAbcdIyPF8pTUlEmRU1MuFMcMlpVtwPG-P5LoJ_W7fbF7HI-B3DyYHcSXNAehVB54_ETd34g';
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
    submitConsents(mockConsent, mockConsentDef).then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('fails on remote call error', done => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('error'));

    submitConsents(mockConsent, mockConsentDef).then(res => {
      expect(res).toEqual({ errors: ['error'] });
      done();
    });
  });
});
