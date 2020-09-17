import { getData, setData, removeData } from 'util/appConfigHelper';
import Auth from '../auth';
import history from '../../history';

jest.mock('util/appConfigHelper', () => ({
  getData: jest.fn(),
  setData: jest.fn(),
  removeData: jest.fn()
}));

const validJWT =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjo1MzMzNTQzMDUsIm9mZmVySWQiOiJTNzA1OTcwMjkzX05MIn0.HNh4sl7zIg9fBwo7wcZAks8Io998LaJKFKiY10osljZXxPoC5ML2_nwsU-d57WkTCrgyKuofpVdlAwCVe6cYbyjaHDWy31eNjiqPG5V0T6IAw6NJ3nHojbVQ_CxWxVYxc9W--Z09-ClTVJqOCswShsHWXlPexA1r2BI79TVoGXSJags3uN7Q7TuNSb9GPDo1UsUJD0WkFC-05gllsr9eMZ5U2H6ds6ERTQFHdO71QtMPjJbodJZE-gYTyC9LwU1KKt84iQ6FMXvmaU_J7Ye9JrmHOdBppMWrUtvFs1-tZKUd0vvfQbO9y9wGPcRFsEpkmbiu0ba8t5k9v1K7fv7mfQ';

const expiredJWT =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjo3MDI4MTM1MDEsIm9mZmVySWQiOiJTMTQ0NzUzMjUyX1VBIiwicHVibGlzaGVySWQiOjc4ODIwMDg1MiwiZXhwIjoxNTgxMDY3MzE0fQ.gDrE9l0xxFzr9qNL7lzGIKoSiuIb9yEV6EQuQ7A5z38ckOtp2pp7GKbpLr1JG1ftCGehu6Z0VTvG_Jy4N8ACb1zmk8nC8GDTCr06hqXg-4zhR-Wp-5dBCn5CU9E7TBqjuYKTlg-wIyLXr9lw_aZMYqTEn-lqQkklI7cW4Q9IjyZoGCZVYQ08RRbQw6Z9naC1-tnkRkm4MkxzeRxIEKtDJEr0VH6jc6vGqEXkRX7Lp9kL3yhcfmpbjDkiMUd9-7hRubSuFkqFxMWEESdcB-3IxdxMo_BZgZlAWIYp8fG16dqP_Oa8Jcj3VXOwMeKm5k_O61igsCnMz99lS_JEKuTvtQ';

const emailMock = 'example@cleeng.com';

describe('Auth', () => {
  const pushSpy = jest.spyOn(history, 'push');

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@auth status', () => {
    it('should return auth status as not authenticated when jwt is empty', () => {
      setData.mockReturnValue('');
      setData('CLEENG_AUTH_TOKEN', '');
      const result = Auth.isLogged();
      expect(result).toBe(false);
    });
    it('should return auth status as not authenticated when jwt expired', () => {
      setData.mockReturnValue(expiredJWT);
      setData('CLEENG_AUTH_TOKEN', expiredJWT);
      const result = Auth.isLogged();
      expect(result).toBe(false);
    });
  });
  describe('@login', () => {
    it('should update auth status to authenticated and set items in local storage when Login', () => {
      Auth.login(false, emailMock, validJWT);
      getData.mockReturnValueOnce(validJWT).mockReturnValueOnce(emailMock);
      expect(getData('CLEENG_AUTH_TOKEN')).toBe(validJWT);
      expect(getData('CLEENG_CUSTOMER_EMAIL')).toBe(emailMock);
      expect(pushSpy).toHaveBeenCalled();
      expect(pushSpy).toHaveBeenCalledWith('/offer');
    });
  });
  describe('@logout', () => {
    it('should update auth status to not authenticated and remove items from local storage on Logout', () => {
      Auth.login(false, emailMock, validJWT);
      Auth.logout();
      expect(removeData).toHaveBeenCalledTimes(5);
      expect(pushSpy).toHaveBeenCalled();
      expect(pushSpy).toHaveBeenCalledWith('/login');
    });
  });
});
