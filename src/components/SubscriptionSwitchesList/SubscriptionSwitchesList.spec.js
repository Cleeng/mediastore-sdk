/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import MyAccountError from 'components/MyAccountError';
import Loader from 'components/Loader';
import { SubscriptionStyled } from 'components/CurrentPlan/CurrentPlanStyled';
import { PureSubscriptionSwitchesList } from './SubscriptionSwitchesList';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<SubscriptionSwitchesList/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should show loader if isLoading', () => {
      const wrapper = shallow(
        <PureSubscriptionSwitchesList isLoading isOfferSelected={false} />
      );
      expect(wrapper.find(Loader)).toHaveLength(1);
    });
    it('should show error if offer is not selected', () => {
      const wrapper = shallow(
        <PureSubscriptionSwitchesList isOfferSelected={false} />
      );
      expect(wrapper.find(MyAccountError)).toHaveLength(1);
    });
    it('should show error if offer is selected and there are no switch settings', () => {
      const wrapper = shallow(<PureSubscriptionSwitchesList isOfferSelected />);
      expect(wrapper.find(MyAccountError)).toHaveLength(1);
    });
    it('should show error if errors are passed', () => {
      const wrapper = shallow(
        <PureSubscriptionSwitchesList
          isOfferSelected={false}
          errors={['error']}
        />
      );
      expect(wrapper.find(MyAccountError)).toHaveLength(1);
    });
    it('should render SubscriptionSwitchesList if offer is selected and there are switch settings', () => {
      const wrapper = shallow(
        <PureSubscriptionSwitchesList
          isOfferSelected
          switchSettings={{
            available: [
              {
                toOfferId: 'mock',
                period: 'month',
                title: 'title',
                currency: 'EUR',
                price: 10
              }
            ]
          }}
        />
      );
      expect(wrapper.find(SubscriptionStyled)).toHaveLength(1);
    });
  });
});
