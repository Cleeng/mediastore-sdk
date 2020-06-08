import getCustomerLocales from 'api/Customer/getCustomerLocales';

describe('getCustomerLocales', () => {
  it('fetch customer locales on call', done => {
    const mockResponseData = {
      responseData: {
        locale: 'pl_PL',
        country: 'pl',
        currency: 'EUR'
      }
    };
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: () => mockResponseData });

    getCustomerLocales().then(res => {
      expect(res).toEqual(mockResponseData);
      done();
    });
  });

  it('fails on remote call error', async done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    getCustomerLocales().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
