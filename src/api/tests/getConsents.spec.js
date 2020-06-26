import getConsents from 'api/Publisher/getConsents';

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
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: () => mockResponseData });

    getConsents().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    getConsents().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
