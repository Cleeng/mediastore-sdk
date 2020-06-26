import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text } from '@storybook/addon-knobs';
import MyAccountUserInfo from './MyAccountUserInfo';

storiesOf('MyAccount/MyAccountUserInfo', module)
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
  .add('Default', () => (
    <MyAccountUserInfo
      firstName={text('First name', 'John')}
      lastName={text('Last name', 'Doe')}
      email={text('Email', 'johndoe@example.com')}
      subscription={text('Subscription', 'Example subscription name')}
    />
  ));
