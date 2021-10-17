import React from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ApplicationContext } from '../../..';
import { AccountsAppContext } from '../../../Context';
import { ViewAccountPage } from './ViewAccountPage';
import {
  Loading,
  Primary,
  WithAccount,
  WithErrorMessage,
} from './ViewAccountPage.stories';

interface Props {
  appContext: ApplicationContext;
}

describe('ViewAccountPage', () => {
  const setupComponent = ({ appContext }): RenderResult => {
    const Component = (
      <AccountsAppContext.Provider value={appContext}>
        <MemoryRouter>
          <ViewAccountPage />
        </MemoryRouter>
      </AccountsAppContext.Provider>
    );

    return render(Component);
  };

  it('Should render an Error dialog when the Account cant be found', () => {
    const renderResult = setupComponent(Primary.args);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should render an Error dialog when an error exists', () => {
    const renderResult = setupComponent(WithErrorMessage.args);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should render a Loading dialog', () => {
    const renderResult = setupComponent(Loading.args);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should render the Account', () => {
    const renderResult = setupComponent(WithAccount.args);
    expect(renderResult.container).toMatchSnapshot();
  });
});
