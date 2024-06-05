import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxLegacy from 'components/CheckboxLegacy';

describe('CheckboxLegacy component', () => {
  test('should render correctly without props', () => {
    render(<CheckboxLegacy />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('should render correctly with children', () => {
    render(<CheckboxLegacy>Test label</CheckboxLegacy>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveTextContent('Test label');
  });

  test('should render as radio button when isRadioButton prop is passed', () => {
    const { container } = render(<CheckboxLegacy isRadioButton />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('msd__consents__frame--radio').length
    ).toBe(1);
  });

  test('should be disabled when disabled prop is passed', () => {
    render(<CheckboxLegacy disabled />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('msd__consents--disabled');
  });

  test('should be checked when checked prop is true', () => {
    render(<CheckboxLegacy checked />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkmark')).toBeInTheDocument();
  });

  test('should be calling onClick when user click', async () => {
    const onClickFunction = vi.fn();
    render(<CheckboxLegacy onClickFn={onClickFunction} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });
});
