import loginCustomer from 'api/Auth/loginCustomer';
import { sendMessage } from 'util/appConfigHelper';

jest.mock('util/appConfigHelper', () => ({
  sendMessage: jest.fn()
}));

describe('loginCustomer', () => {
  it('login user on call', done => {
    const mockResponseData = {
      status: 200,
      responseData: { jwt: 'jvbreigburtij' }
    };

    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: () => mockResponseData });

    loginCustomer().then(res => {
      expect(res).toEqual(mockResponseData);
      expect(sendMessage).toHaveBeenCalledWith(mockResponseData.responseData);
      done();
    });
  });

  it('fails on remote call error', done => {
    const mockError = 'mock-error';
    jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    loginCustomer().then(res => {
      expect(res).toBe(mockError);
      done();
    });
  });
});
