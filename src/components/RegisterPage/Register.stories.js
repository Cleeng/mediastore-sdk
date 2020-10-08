import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { setData } from 'util/appConfigHelper';
import withMock from 'storybook-addon-mock';
import StoryRouter from 'storybook-react-router';
import { PureRegister } from './Register';
import 'styles/index.scss';

setData('CLEENG_OFFER_ID', 'S144753252_UA');
setData('CLEENG_PUBLISHER_ID', '933103327');

storiesOf('Pages/RegisterPage', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(withMock)
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white', position: 'relative' }}>
      {story()}
    </div>
  ))
  .addDecorator(StoryRouter())
  .add(
    'Basic Register',
    () => (
      <PureRegister
        urlProps={{
          location: {
            search: '?offer=S144753252_UA&publisher=933103327'
          }
        }}
      />
    ),
    {
      mockData: [
        {
          url: `${ENVIRONMENT_CONFIGURATION.API_URL}/publishers/933103327/consents`,
          method: 'GET',
          status: 200,
          response: {
            responseData: {
              consents: [
                {
                  broadcasterId: 0,
                  name: 'terms',
                  version: '1',
                  value: 'https://cleeng.com/cleeng-user-agreement',
                  label: 'I accept the Terms and Conditions of Cleeng.',
                  required: true
                }
              ]
            },
            errors: []
          }
        }
      ]
    }
  );
