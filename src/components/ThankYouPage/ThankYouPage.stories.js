import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { PureThankYouPage } from './ThankYouPage';

storiesOf('Pages/ThankYouPage', module)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white', position: 'relative' }}>
      {story()}
    </div>
  ))
  .add('Default', () => <PureThankYouPage />);
