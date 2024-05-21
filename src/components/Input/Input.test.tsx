import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputLegacy from 'components/InputLegacy/InputLegacy';

describe('Input component', () => {
  test('should render correctly without props', () => {
    const { getByTestId } = render(<InputLegacy />);

    getByTestId('input');
  });
  test('should have correct id and label when placeholder is passed', () => {
    const testPlaceholder = 'test-input';
    render(<InputLegacy placeholder={testPlaceholder} />);

    const inputEl = screen.getByTestId('input');
    const inputLabelEl = screen.getByTestId('input-label');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('id', testPlaceholder);
    expect(inputLabelEl).toBeInTheDocument();
    expect(inputLabelEl).toHaveTextContent(testPlaceholder);
  });
  test('should show visibility icon when showVisibilityIcon is passed', () => {
    render(<InputLegacy showVisibilityIcon />);

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
  });
  test('should be calling passed onChange function when user change something', async () => {
    const onChangeFunction = jest.fn();
    render(<InputLegacy onChange={onChangeFunction} />);

    await userEvent.type(screen.getByTestId('input'), 'Text');
    expect(onChangeFunction).toHaveBeenCalledTimes(4);
  });
  test('should be calling passed handleClickShowPassword function when user click on toggle button', async () => {
    const showPasswordFunction = jest.fn();
    render(
      <InputLegacy
        showVisibilityIcon
        handleClickShowPassword={showPasswordFunction}
      />
    );
    expect(screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('input-visibility-icon'));
    expect(showPasswordFunction).toHaveBeenCalledTimes(1);
  });
});
