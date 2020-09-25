import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Checkbox from './Checkbox';

storiesOf('Common/Checkbox', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('All options', () => (
    <Checkbox
      checked={boolean('checked', false)}
      error={text(
        'consents error',
        'Please agree on all consents to use this service'
      )}
      required={boolean('required', false)}
    >
      {text('checkbox label', 'I accept the Terms and Conditions of Cleeng')}
    </Checkbox>
  ));
