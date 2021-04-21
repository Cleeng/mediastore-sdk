import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import StoryRouter from 'storybook-react-router';
import { PureLogin as Login } from './Login';
import 'styles/index.scss';

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
    <Login
      urlProps={{ location: { search: 'http://cleeng.com/' } }}
      isMyAccount={boolean('isMyAccount', false)}
    />
  ));
