import { renderHook } from '@testing-library/react-hooks';
import * as validators from 'util/validators';
import * as captchaUtils from 'util/captcha';
import useCaptchaVerification from '../useCaptchaVerification';

vi.mock('appRedux/store', () => ({
  useAppSelector: vi.fn((selector) =>
    selector({
      publisherConfig: {
        googleRecaptcha: {
          showCaptchaOnPurchase: true,
          showCaptchaOnRegister: true,
          sitekey: 'test-sitekey'
        }
      }
    })
  )
}));

describe('useCaptchaVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct initial values', () => {
    const { result } = renderHook(() => useCaptchaVerification());

    expect(result.current.showCaptchaOnPurchase).toBe(true);
    expect(result.current.showCaptchaOnRegister).toBe(true);
    expect(result.current.sitekey).toBe('test-sitekey');
    expect(result.current.recaptchaRef.current).toBe(null);
  });

  it('should validate captcha token correctly', () => {
    const mockValidateCaptcha = vi.spyOn(validators, 'validateCaptcha');
    mockValidateCaptcha.mockReturnValue('');

    const { result } = renderHook(() => useCaptchaVerification());
    const error = result.current.validateCaptchaToken('valid-token');

    expect(mockValidateCaptcha).toHaveBeenCalledWith('valid-token');
    expect(error).toBe('');
  });

  it('should handle getCaptchaToken if token doesnt exist successfully', async () => {
    const mockExecute = vi.fn().mockResolvedValue('raw-token');
    const mockGetValue = vi.fn().mockReturnValue('');
    const mockNormalizeCaptchaToken = vi.spyOn(
      captchaUtils,
      'normalizeCaptchaToken'
    );
    mockNormalizeCaptchaToken.mockReturnValue('normalized-token');

    const mockValidateCaptcha = vi.spyOn(validators, 'validateCaptcha');
    mockValidateCaptcha.mockReturnValue('');

    const { result } = renderHook(() => useCaptchaVerification());
    Object.defineProperty(result.current.recaptchaRef, 'current', {
      value: { execute: mockExecute, getValue: mockGetValue },
      configurable: true
    });

    const captchaResult = await result.current.getCaptchaToken();

    expect(mockGetValue).toHaveBeenCalled();
    expect(mockExecute).toHaveBeenCalled();
    expect(mockNormalizeCaptchaToken).toHaveBeenCalledWith('raw-token');
    expect(mockValidateCaptcha).toHaveBeenCalledWith('normalized-token');
    expect(captchaResult).toEqual({
      recaptchaError: '',
      hasCaptchaSucceeded: true,
      captchaToken: 'normalized-token'
    });
  });

  it('should handle getCaptchaToken if token exist successfully', async () => {
    const mockExecute = vi.fn().mockResolvedValue('raw-token');
    const mockGetValue = vi.fn().mockReturnValue('raw-token-current');
    const mockNormalizeCaptchaToken = vi.spyOn(
      captchaUtils,
      'normalizeCaptchaToken'
    );
    mockNormalizeCaptchaToken.mockReturnValue('normalized-token');

    const mockValidateCaptcha = vi.spyOn(validators, 'validateCaptcha');
    mockValidateCaptcha.mockReturnValue('');

    const { result } = renderHook(() => useCaptchaVerification());
    Object.defineProperty(result.current.recaptchaRef, 'current', {
      value: { execute: mockExecute, getValue: mockGetValue },
      configurable: true
    });

    const captchaResult = await result.current.getCaptchaToken();

    expect(mockGetValue).toHaveBeenCalled();
    expect(mockExecute).toHaveBeenCalledTimes(0);
    expect(mockNormalizeCaptchaToken).toHaveBeenCalledWith('raw-token-current');
    expect(mockValidateCaptcha).toHaveBeenCalledWith('normalized-token');
    expect(captchaResult).toEqual({
      recaptchaError: '',
      hasCaptchaSucceeded: true,
      captchaToken: 'normalized-token'
    });
  });

  it('should handle getCaptchaToken with validation error', async () => {
    const mockExecute = vi.fn().mockResolvedValue('raw-token');
    const mockGetValue = vi.fn().mockResolvedValue('');
    const mockNormalizeCaptchaToken = vi.spyOn(
      captchaUtils,
      'normalizeCaptchaToken'
    );
    mockNormalizeCaptchaToken.mockReturnValue('normalized-token');

    const mockValidateCaptcha = vi.spyOn(validators, 'validateCaptcha');
    mockValidateCaptcha.mockReturnValue('Invalid captcha');

    const { result } = renderHook(() => useCaptchaVerification());
    Object.defineProperty(result.current.recaptchaRef, 'current', {
      value: { execute: mockExecute, getValue: mockGetValue },
      configurable: true
    });
    const captchaResult = await result.current.getCaptchaToken();

    expect(captchaResult).toEqual({
      recaptchaError: 'Invalid captcha',
      hasCaptchaSucceeded: false,
      captchaToken: 'normalized-token'
    });
  });
});
