import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { setData } from 'util/appConfigHelper';
import StoryRouter from 'storybook-react-router';
import Register from './Register';
import 'styles/index.scss';

setData('CLEENG_OFFER_ID', 'S144753252_UA');

storiesOf('Checkout/RegisterPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white', position: 'relative' }}>
      {story()}
    </div>
  ))
  .addDecorator(StoryRouter())
  .add('Basic Register', () => (
    <Register
      urlProps={{
        location: { search: 'http://cleeng.com' }
      }}
    />
  ));
