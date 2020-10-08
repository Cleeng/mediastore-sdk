import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import ErrorPage from './ErrorPage';
import 'styles/index.scss';

storiesOf('Pages/ErrorPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 600, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('All options', () => (
    <ErrorPage
      type={select('Types', [
        'offerNotExist',
        'generalError',
        'alreadyHaveAccess',
        'cannotPurchase'
      ])}
      error={text('Error label', '')}
    />
  ));
