import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import Button from './Button';

storiesOf('Button', module)
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
  .add('Default', () => <Button>Default button</Button>)
  .add('Secondary', () => <Button variant="secondary">Secondary button</Button>)
  .add('Google', () => <Button variant="google" />)
  .add('Fb', () => <Button variant="fb" />)
  .add('CreditCard', () => <Button variant="creditcard">Credit card</Button>)
  .add('Link', () => <Button variant="link">Link button</Button>)
  .add('Back', () => <Button variant="back">Back</Button>);
