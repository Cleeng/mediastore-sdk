import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import 'styles/index.scss';
import PasswordResetSuccess from './PasswordResetSuccess';

storiesOf('Common/PasswordResetSuccess', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('Default', () => (
    <PasswordResetSuccess
      onSuccess={action('onSuccess')}
      urlProps={{ location: { search: 'http://cleeng.com/' } }}
      email={text('email', 'customer@example.com')}
    />
  ));
