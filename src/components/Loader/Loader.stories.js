import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import Loader from './Loader';

storiesOf('Common/Loader', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
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
  .add('Default loader', () => <Loader />)
  .add('Button loader', () => <Loader buttonLoader />);
