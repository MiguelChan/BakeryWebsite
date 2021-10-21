import {
  addDecorator, 
  addParameters,
} from '@storybook/react';
import {
  MemoryRouter,
} from 'react-router';

addDecorator(story => <MemoryRouter initialEntries={['/accounts']}>{story()}</MemoryRouter>);

export const parameters = {
  actions: { 
    argTypesRegex: "^on[A-Z].*",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    showPanel: true,
    panelPosition: 'bottom',
  },
}

addParameters(parameters);

export const decorators = [
];