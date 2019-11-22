import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import Header from './Header';
import 'styles/index.scss';

storiesOf('Header', module)
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
  .add('All options', () => (
    <Header showBackIcon={boolean('showBackIcon', true)} />
  ));
