import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import Footer from './Footer';
import 'styles/index.scss';

storiesOf('Checkout/Footer', module)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div
      style={{
        width: '400px',
        height: '36px',
        background: '#ffffff',
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default', () => <Footer />);
