import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import ThankYouPage from './ThankYouPage';

storiesOf('ThankYouPage', module)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('Default', () => <ThankYouPage />);
