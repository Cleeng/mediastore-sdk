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
        width: '100%',
        height: '100%',
        background: '#ffffff'
      }}
    >
      <div
        style={{
          width: 400,
          height: 35,
          position: 'relative'
        }}
      >
        {story()}
      </div>
    </div>
  ))
  .add('Default', () => <Footer />);
