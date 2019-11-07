import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import Loader from './Loader';

storiesOf('Loader', module)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div
      style={{
        width: 200,
        backgroundColor: 'white',
        padding: 20
      }}
    >
      {story()}
    </div>
  ))
  .add('All options', () => <Loader />);
