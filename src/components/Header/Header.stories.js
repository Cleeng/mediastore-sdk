import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import 'styles/index.scss';
import Logout from 'components/Logout/Logout';
import BackButton from 'components/BackButton';
import Header from './Header';

storiesOf('Checkout/Header', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <div
      style={{
        width: 500,
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default', () => <Header />)
  .add('With logout button', () => (
    <Header>
      <Logout />
    </Header>
  ))
  .add('With back button', () => (
    <Header>
      <BackButton />
    </Header>
  ));
