import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import 'styles/index.scss';
import { PureBackButton } from 'components/BackButton/BackButton';
import Header from './Header';

storiesOf('Checkout/Header', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <div
      style={{
        width: 600,
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default - with logo', () => <Header />)
  .add('With back to login button', () => (
    <Header>
      <PureBackButton />
    </Header>
  ));
