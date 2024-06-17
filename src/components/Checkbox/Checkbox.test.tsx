import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from 'components/Checkbox';

const defaultProps = {
  isChecked: false,
  children: '',
  id: 'checkbox-id',
  onClickFn: () => null
};

describe('Checkbox component', () => {
  test('should render correctly without props', () => {
    render(<Checkbox {...defaultProps} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('should render correctly with children', () => {
    const labelText = 'Test label';

    render(<Checkbox {...defaultProps}>{labelText}</Checkbox>);

    expect(screen.getByText(labelText)).toBeVisible();
  });

  test('should render as radio button when isRadioButton prop is passed', () => {
    const { container } = render(<Checkbox {...defaultProps} isRadioButton />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('msd__consents__frame--radio').length
    ).toBe(1);
  });

  test('should be disabled when disabled prop is passed', () => {
    render(<Checkbox {...defaultProps} disabled />);

    expect(screen.getByTestId('checkbox-id-label')).toHaveClass(
      'msd__consents--disabled'
    );
  });

  test('should be checked when checked prop is true', () => {
    render(<Checkbox {...defaultProps} isChecked />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkmark')).toBeInTheDocument();
  });

  test('should be calling onClick when user click', async () => {
    const onClickFunction = vi.fn();
    render(<Checkbox {...defaultProps} onClickFn={onClickFunction} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });
});
