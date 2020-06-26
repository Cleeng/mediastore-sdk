import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';
import { PureMyAccountMenu as MyAccountMenu } from './MyAccountMenu';

storiesOf('MyAccount/MyAccountMenu', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter>
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
    </MemoryRouter>
  ))
  .add('Default menu', () => (
    <MyAccountMenu routeMatch={{ url: '/my-account/plan-details' }} />
  ));
