import React from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react';
import { AccountsAppContext, ApplicationContext } from '../../../Context';
import { ViewAccountsPage } from './ViewAccountsPage';
import { ViewAccountsDashboard } from '../../Constructed';
import { EmptyTable } from './ViewAccountsPage.stories';
import { MemoryRouter } from 'react-router-dom';

describe.skip('ViewAccountsPage', () => {
  interface Context {
    appContext: ApplicationContext;
  }

  const setupComponent = (props: Context): RenderResult => {
    const Component = (
      <AccountsAppContext.Provider value={props.appContext} >
        <MemoryRouter>
          <ViewAccountsPage />
        </MemoryRouter>
      </AccountsAppContext.Provider >
    );

    return render(Component);
  };

  it('Should display an EmptyTable', () => {
    const props = EmptyTable.args as Context;

    const result = setupComponent(props);

    expect(result.container).toMatchSnapshot();
  });
});