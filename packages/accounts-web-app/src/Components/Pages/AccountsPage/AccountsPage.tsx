import {
  Container,
} from '@mui/material';
import React from 'react';
import {
  Route,
  Switch,

  BrowserRouter,
} from 'react-router-dom';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import {
  ViewAccountsDashboard,
} from '../../Constructed';
import {
  CreateAccountsPage,
} from '../CreateAccountPage/CreateAccountsPage';
import { ViewAccountsPage } from '../ViewAccountsPage/ViewAccountsPage';
import { ViewAccountPage } from '../ViewAccountPage/ViewAccountPage';

export interface AccountsPageProps {
  appContext: ApplicationContext;
}

export const AccountsPage: React.FunctionComponent<AccountsPageProps> = ({
  appContext,
}) => (
  <AccountsAppContext.Provider value={appContext}>
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/accounts" exact>
            <ViewAccountsPage />
          </Route>
          <Route path="/accounts/create" exact>
            <CreateAccountsPage />
          </Route>
          <Route path='/accounts/:accountId'>
            <ViewAccountPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  </AccountsAppContext.Provider>
);
