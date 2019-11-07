import getConsents from './getConsents';

describe('getConsents', () => {
  it('fetch broadcaster consents on call', done => {
    const mockResponseData = {
      terms: {
        broadcasterId: 0,
        name: 'terms',
        version: '1',
        value: 'https://cleeng.com/legal',
        label:
          'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        required: true
      }
    };
    jest.spyOn(global, 'fetch').mockImplementation(
      async () =>
        new Promise(resolve => {
          resolve({
            json: () => mockResponseData
          });
        })
    );

    getConsents().then(res => {
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

    getConsents().catch(done);
  });
});
