import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Card from './Card';

storiesOf('Common/Card', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: '#f8f9fc',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default', () => (
    <Card withShadow={boolean('withShadow', false)}>Default Card</Card>
  ));
