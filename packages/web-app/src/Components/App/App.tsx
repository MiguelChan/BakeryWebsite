import './App.css';
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { 
  LandingPage, 
  NotFoundPage,
  SuppliersPage,
 } from '../Pages';
import { 
  createStyles, 
  makeStyles, 
  Theme, 
} from '@material-ui/core';
import React from 'react';
import { NavigationBar } from '../Blocks';
import { NavigationDrawer } from '../Constructed';

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
