import './App.css';
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { 
  LandingPage, 
  NotFoundPage,
} from '../Pages';
import { 
  Theme,
} from '@mui/material';
import {
  createStyles,
  makeStyles,
} from '@mui/styles';
import React from 'react';
import { 
  NavigationBar,
} from '../Blocks';
import { 
  NavigationDrawer,
} from '../Constructed';
// @ts-ignore
import {
  // @ts-ignore
  SuppliersPage,
  // @ts-ignore
} from '@mgl/suppliers-web-app';
import {
  AccountsPage,
  AccountsAppContext,
  ApplicationContext,
} from '@mgl/accounts-web-app';

// https://stackoverflow.com/questions/56021112/react-hooks-in-react-library-giving-invalid-hook-call-error

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      margin: 0,
      padding: 0,
    },
    content: {
      marginTop: 70,
    }
  }),
);

export interface AppProps {
  toggleDarkMode: () => void;
}

/**
 * 
 * @returns The main React Application.
 */
const App: React.FunctionComponent<AppProps> = ({
  toggleDarkMode,
}) => {

  const classes = useStyles();

  const location: any = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  function getSectionTitle(): string {
    if (location.state?.sectionTitle) {
      return location.state.sectionTitle;
    }
    return 'Administracion';
  }

  /**
   * Toggles the Drawer.
   */
  function toggleDrawer(): void {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const accountsAppContext: ApplicationContext = React.useContext(AccountsAppContext);

  return (
    <>
      <div className={classes.root}>
        <NavigationBar 
          title={getSectionTitle()} 
          onOpenMenuClickListener={toggleDrawer} 
        />
        <NavigationDrawer 
          isOpen={isDrawerOpen} 
          toggleDrawer={toggleDrawer}
          toggleDarkMode={toggleDarkMode}
        />
        <main className={classes.content}>
          <Switch>
            <Route path='/' exact>
              <LandingPage />
            </Route>
            <Route path='/suppliers'>
              <SuppliersPage />
            </Route>
            <Route path='/accounts'>
              <AccountsPage appContext={accountsAppContext}/>
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;
