import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import PasswordInput from 'components/PasswordInput';

describe('PasswordInput component', () => {
  test('should render correctly without props', () => {
    render(<PasswordInput />);

    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
  test('should render with type password', () => {
    render(<PasswordInput />);

    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });
  test('should render with type password', () => {
    render(<PasswordInput />);

    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });
  test('should show error if password is weak', async () => {
    render(<PasswordInput error="Weak" passwordStrength="Weak" />);

    await userEvent.click(screen.getByTestId('input'));
    await userEvent.keyboard('abc');
    expect(screen.getByTestId('input-error')).toBeInTheDocument();
    expect(screen.getByTestId('input-error')).toHaveTextContent('Weak');
    screen.debug();
  });
  test('should show visibility icon when showVisibilityIcon is passed', () => {
    render(<PasswordInput showVisibilityIcon />);

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
  });
  test('should be calling passed onChange function when user change something', async () => {
    const onChangeFunction = jest.fn();
    render(<PasswordInput onChange={onChangeFunction} />);

    await userEvent.type(screen.getByTestId('input'), 'Text');
    expect(onChangeFunction).toHaveBeenCalledTimes(4);
  });
  test('should be calling passed handleClickShowPassword function when user click on toggle button', async () => {
    const showPasswordFunction = jest.fn();
    render(
      <PasswordInput
        showVisibilityIcon
        handleClickShowPassword={showPasswordFunction}
      />
    );
    expect(screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('input-visibility-icon'));
    expect(showPasswordFunction).toHaveBeenCalledTimes(1);
  });
});
