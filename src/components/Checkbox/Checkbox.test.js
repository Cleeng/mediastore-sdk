import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Checkbox from 'components/Checkbox';

describe('Checkbox component', () => {
  test('should render correctly without props', async () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('should render correctly with children', async () => {
    render(<Checkbox>Test label</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveTextContent('Test label');
  });

  test('should render as radio button when isRadioButton prop is passed', async () => {
    const { container } = render(<Checkbox isRadioButton />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('msd__consents__frame--radio').length
    ).toBe(1);
  });

  test('should be disabled when disabled prop is passed', async () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('msd__consents--disabled');
  });

  test('should be checked when checked prop is true', async () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkmark')).toBeInTheDocument();
  });

  test('should be calling onClick when user click', async () => {
    const onClickFunction = jest.fn();
    render(<Checkbox onClickFn={onClickFunction} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });
});
