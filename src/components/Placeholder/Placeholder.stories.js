import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import Placeholder from './Placeholder';
import 'styles/index.scss';

storiesOf('Placeholder', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Sample placeholder', () => (
    <Placeholder label={text('Label', 'a sample')} />
  ));
