import { AppBar,
IconButton,
Theme,
Toolbar,
Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export interface NavigationBarProps {
    title: string;
    onOpenMenuClickListener: () => void;
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        appBar: {
            margin: 0,
            padding: 0,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

/**
 * 
 * Defines the NavigationBar for the Application.
 * 
 * @param {string} title .
 * @returns .
 */
export const NavigationBar: React.FunctionComponent<NavigationBarProps> = ({
    title,
    onOpenMenuClickListener,
}) => {

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
          <Toolbar variant='regular'>
            <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={onOpenMenuClickListener}
                size="large">
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
    );

};