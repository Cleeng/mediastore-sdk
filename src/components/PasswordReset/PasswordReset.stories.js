import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import PasswordReset from './PasswordReset';
import '../../styles/index.scss';

storiesOf('PasswordReset', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('All options', () => <PasswordReset onSuccess={action('onSuccess')} />);
