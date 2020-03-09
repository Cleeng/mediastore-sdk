import { dateFormat } from './helpers';

describe('CurrentPlan helpers', () => {
  it('should return good value for dateFormat function', () => {
    const timestamp = '1582721912';
    const expectedValue = '2/26/2020';
    expect(dateFormat(timestamp)).toBe(expectedValue);
    expect(true).toBe(true);
  });
});
