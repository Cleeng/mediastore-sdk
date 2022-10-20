import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Checkbox from 'components/Checkbox';

describe('Checkbox component', () => {
  test('renders correctly without props', async () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders correctly with children', async () => {
    render(<Checkbox>Test label</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveTextContent('Test label');
  });

  test('renders as radio button when isRadioButton prop is passed', async () => {
    const { container } = render(<Checkbox isRadioButton />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('msd__consents__frame--radio').length
    ).toBe(1);
  });

  test('is disabled when disabled prop is passed', async () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('msd__consents--disabled');
  });

  test('is checked when checked prop is true', async () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkmark')).toBeTruthy();
  });

  test('is calling onClick when user click', async () => {
    const onClickFunction = jest.fn();
    render(<Checkbox onClickFn={onClickFunction} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });
});
