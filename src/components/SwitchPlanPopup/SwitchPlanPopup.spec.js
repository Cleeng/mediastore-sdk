/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
// import Button from 'components/Button';
import { PureSwitchPlanPopup } from './SwitchPlanPopup';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<SwitchPlanPopup/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initail state', () => {
      const wrapper = shallow(
        <PureSwitchPlanPopup
          offerData={{ mock: 'mock' }}
          hideInnerPopup={jest.fn()}
          offerToSwitch={{ offerId: '123' }}
        />
      );
      expect(wrapper.state('step')).toBe(1);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('isError')).toBe(false);
    });
  });
});
