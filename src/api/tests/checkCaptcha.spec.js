import checkCaptcha from 'api/Auth/checkCaptcha';

describe('checkCaptcha', () => {
  it('should return correct response on success', done => {
    const mockResponseData = {
      responseData: {
        required: false
      }
    };
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: () => mockResponseData });

    checkCaptcha().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('should fails on remote call error', done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    checkCaptcha().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
