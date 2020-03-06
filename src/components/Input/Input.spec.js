import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Input from './Input';
import { InputElementStyled } from './InputStyled';

jest.useFakeTimers();

describe('Input', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Input />);
      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('text');
      expect(inputElement.props().autoComplete).toBe('off');
    });
  });

  describe('@events', () => {
    it('should call onChange cb when input change', () => {
      const onChangeMock = jest.fn();
      const MockInputValue = 'MOCKVALUE';
      const wrapper = mount(<Input onChange={onChangeMock} />);
      const input = wrapper.find(InputElementStyled);

      input.simulate('change', { target: { value: MockInputValue } });

      expect(onChangeMock).toHaveBeenCalledWith(MockInputValue);
    });
  });
});
