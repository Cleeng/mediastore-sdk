import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import { PureLogin } from './Login';
import 'styles/index.scss';
import 'i18NextInit';

storiesOf('Pages/LoginPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white', position: 'relative' }}>
      {story()}
    </div>
  ))
  .add('Checkout and My account login', () => (
    <PureLogin
      onLoginComplete={action('onLoginComplete')}
      urlProps={{ location: { search: 'http://cleeng.com/' } }}
      isMyAccount={boolean('isMyAccount', false)}
    />
  ));
