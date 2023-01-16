import React from 'react';
import { render } from '@testing-library/react';
import GracePeriodError from './GracePeriodError';
import '@testing-library/jest-dom';

describe('GracePeriodError component', () => {
  test('renders warning with correct styles', async () => {
    const { getByText } = render(<GracePeriodError />);

    expect(getByText('make sure to update')).toHaveStyle(
      'text-decoration: underline;'
    );
  });

  test('renders svg image', async () => {
    const { getByTestId } = render(<GracePeriodError />);
    getByTestId('alert-svg');
  });
});
