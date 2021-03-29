import { 
  NavigationBar,
 } from '../Constructed';
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
  AppBar, 
  makeStyles, 
  Toolbar, 
} from '@material-ui/core';

import theme from '../../theme';
import React from 'react';

const drawerWidth = 390;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    maxWidth: drawerWidth,
    flexShrink: 0,
  },    
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: 25,
  },
}));

/**
 * 
 * @returns The main React Application.
 */
function App() {

  const classes = useStyles(theme);

  const location: any = useLocation();

  function getSectionTitle(): string {
    if (location.state?.sectionTitle) {
      return location.state.sectionTitle;
    }
    return 'Administracion';
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
            <Toolbar variant='dense'>
              {getSectionTitle()}
            </Toolbar>
        </AppBar>
        <NavigationBar className={classes.drawer} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/suppliers'>
              <SuppliersPage />
            </Route>
            <Route path='/' exact>
              <LandingPage />
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
