import { 
  Container,
} from '@mui/material';
import React from 'react';
import { 
  Route,
  Switch,
} from 'react-router-dom';
import { 
  AccountsAppContext, 
  ApplicationContext,
} from '../../../Context';
import {
  ViewAccountsDashboard,
} from '../../Constructed';

export interface AccountsPageProps {
  appContext: ApplicationContext;
}

export const AccountsPage: React.FunctionComponent<AccountsPageProps> = ({
  appContext,
}) => (
  <AccountsAppContext.Provider value={appContext}>
    <Container>
      <Switch>
        <Route path='/accounts' exact>
          <ViewAccountsDashboard />
        </Route>
      </Switch>
    </Container>
  </AccountsAppContext.Provider>
);