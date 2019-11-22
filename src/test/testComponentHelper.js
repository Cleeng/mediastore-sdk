/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const renderComponentHelper = Component => ({ children, ...props } = {}) => {
  const wrapper = shallow(
    <Component t={key => key} {...props}>
      {children}
    </Component>
  );

  const component = {
    wrapper,
    instance: wrapper.instance()
  };

  return component;
};
const mountComponentHelper = Component => ({ children, ...props } = {}) => {
  const wrapper = mount(
    <Component t={key => key} {...props}>
      {children}
    </Component>
  );

  const component = {
    wrapper,
    instance: wrapper.instance()
  };

  return component;
};

const renderComponentWithLabeling = Component => ({
  children,
  ...props
} = {}) => {
  const wrapper = shallow(
    <Component t={key => key} {...props}>
      {children}
    </Component>
  )
    .first()
    .shallow();

  const component = {
    wrapper,
    instance: wrapper.instance()
  };

  return component;
};

export default renderComponentHelper;
export { renderComponentWithLabeling, mountComponentHelper };
