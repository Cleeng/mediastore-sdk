import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import Button from './Button';

storiesOf('Common/Button', module)
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
  .add('Google', () => <Button variant="google">Google</Button>)
  .add('Fb', () => <Button variant="fb">Facebook </Button>)
  .add('Payment method', () => (
    <Button variant="paymentmethod">Credit card</Button>
  ))
  .add('Link', () => <Button variant="link">Link button</Button>)
  .add('Back', () => <Button variant="back">Back</Button>)
  .add('Apply coupon', () => <Button variant="couponApply">Apply</Button>);
