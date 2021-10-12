import { 
  Container,
} from '@mui/material';
import React from 'react';
import { 
  Route,
  Switch,
} from 'react-router-dom';
import { 
  SimpleBlock,
} from '../../Blocks';

export const AccountsPage: React.FunctionComponent = () => (
  <>
    <Container>
      <Switch>
        <Route path='/accounts' exact>
          <SimpleBlock />
        </Route>
      </Switch>
    </Container>
  </>
);