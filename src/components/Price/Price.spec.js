import React from 'react';
import { mount } from 'enzyme';
import Price from './Price';
import { CurrencyStyled, PriceStyled, PeriodStyled } from './PriceStyled';

describe('<Price/>', () => {
  describe('@renders', () => {
    it('should show price with space after number in period', () => {
      const currency = '$';
      const price = 10;
      const period = '2months';

      const wrapper = mount(
        <Price currency={currency} price={price} period={period} />
      );
      expect(wrapper.find(CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(PriceStyled).text()).toEqual(JSON.stringify(price));
      expect(wrapper.find(PeriodStyled).text()).toEqual(`/\u00a02 months`);
    });
    it('should show price with period', () => {
      const currency = '$';
      const price = 10;
      const period = 'month';

      const wrapper = mount(
        <Price currency={currency} price={price} period={period} />
      );
      expect(wrapper.find(CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(PriceStyled).text()).toEqual(JSON.stringify(price));
      expect(wrapper.find(PeriodStyled).text()).toEqual(`/\u00a0month`);
    });
    it('should show price without period', () => {
      const currency = '$';
      const price = 10;

      const wrapper = mount(<Price currency={currency} price={price} />);
      expect(wrapper.find(CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(PriceStyled).text()).toEqual(JSON.stringify(price));
      expect(wrapper.find(PeriodStyled).exists()).toEqual(false);
    });
  });
});
