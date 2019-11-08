import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import ErrorPage from './ErrorPage';
import 'styles/index.scss';

storiesOf('ErrorPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Welcome Dashboard', () => (
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
