import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import StoryRouter from 'storybook-react-router';
import Register from './Register';
import '../../styles/index.scss';

storiesOf('RegisterPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 0',
        background: 'linear-gradient(-21deg, #44b2e7, #595fbb)'
      }}
    >
      <div
        style={{
          width: 650,
          background: 'white',
          margin: '30px auto',
          position: 'relative'
        }}
      >
        {story()}
      </div>
    </div>
  ))
  .addDecorator(StoryRouter())
  .add('Basic Register', () => <Register />);
