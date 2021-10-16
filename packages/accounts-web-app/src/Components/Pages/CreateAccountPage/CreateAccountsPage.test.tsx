import React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import { CreateAccountsPage } from './CreateAccountsPage';
import { 
  Loading,
  Primary,
  WithErrorMessage,
} from './CreateAccountsPage.stories';
import { AccountsAppContext } from '../../../Context';

describe('CreateAccountsPage', () => {
  const setupComponent = ({appContext}): RenderResult => {
    const Component = (
      <AccountsAppContext.Provider value={appContext}>
        <CreateAccountsPage />
      </AccountsAppContext.Provider>
    );
    return render(Component);
  }

  it('Should display the Component', () => {
    const renderResult = setupComponent(Primary.args);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should display the Loading Dialog', () => {
    const renderResult = setupComponent(Loading.args);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should display the Error message', () => {
    const renderResult = setupComponent(WithErrorMessage.args);
    expect(renderResult.container).toMatchSnapshot();
  });
});