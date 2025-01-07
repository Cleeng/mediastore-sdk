import { isCaptchaTokenString, normalizeCaptchaToken } from './utils';

describe('isCaptchaTokenString', () => {
  it('should return true for non-empty string', () => {
    expect(isCaptchaTokenString('token123')).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isCaptchaTokenString('')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isCaptchaTokenString(undefined)).toBe(false);
  });

  it('should return false for void', () => {
    expect(isCaptchaTokenString(undefined)).toBe(false);
  });
});

describe('normalizeCaptchaToken', () => {
  it('should return the same string for valid token', () => {
    const token = 'valid-token';
    expect(normalizeCaptchaToken(token)).toBe(token);
  });

  it('should return empty string for undefined', () => {
    expect(normalizeCaptchaToken(undefined)).toBe('');
  });

  it('should return empty string for void', () => {
    expect(normalizeCaptchaToken(undefined)).toBe('');
  });

  it('should return empty string for empty string input', () => {
    expect(normalizeCaptchaToken('')).toBe('');
  });
});
