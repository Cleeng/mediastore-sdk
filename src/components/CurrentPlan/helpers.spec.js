import { dateFormat } from './helpers';

describe('CurrentPlan helpers', () => {
  it('should return good value for dateFormat function', () => {
    const timestamp = '1582721912';
    const expectedValue = 'February 26th, 2020';
    expect(dateFormat(timestamp)).toBe(expectedValue);
    expect(true).toBe(true);
  });
});
