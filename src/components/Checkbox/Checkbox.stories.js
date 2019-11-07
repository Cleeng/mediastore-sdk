import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: 'white',
        padding: 20
      }}
    >
      {story()}
    </div>
  ))
  .add('All options', () => (
    <Checkbox
      checked={boolean('checked', false)}
      error={text('error', '')}
      required={boolean('required', false)}
    >
      {text('consent content', 'Some text to show')}
    </Checkbox>
  ));
