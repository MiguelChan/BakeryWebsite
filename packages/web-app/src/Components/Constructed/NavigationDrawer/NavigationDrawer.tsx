import { Divider,
Drawer,
FormControlLabel,
List,
ListItem,
Switch,
Theme,
useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { 
    AccountTree,
    ContactMail,
    Home,
 } from '@mui/icons-material';
import * as React from 'react';
import { 
    NavigableListItem,
 } from '../../Blocks';
import {
    useLocation
} from "react-router-dom";

interface MenuItem {
    icon: any;
    primaryText: string;
    secondaryText: string;
    toUrl: string;
}

export interface NavigationDrawerProps {
    isOpen: boolean;
    toggleDrawer: () => void;
    toggleDarkMode: () => void;
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        drawer: {
        },
        drawerPaper: {
            margin: 0,
        }
    }),
);


/**
 * Defines the Navigation Bar of the Website.
 * @returns A React Function Component.
 */
export const NavigationDrawer: React.FunctionComponent<NavigationDrawerProps> = ({
    isOpen,
    toggleDrawer,
    toggleDarkMode,
}) => {

    const classes = useStyles();
    const location = useLocation();
    const currentTheme = useTheme();

    const MENU_ITEMS: MenuItem[] = [
        {
            primaryText: 'Cuentas',
            secondaryText: 'Administracion de Cuentas y Subcuentas',
            icon: <AccountTree />,
            toUrl: '/accounts',
        },
        {
            primaryText: 'Proveedores',
            secondaryText: 'Administracion del Catalogo',
            icon: <ContactMail />,
            toUrl: '/suppliers',
        }
    ];

    /**
     * Renders a single Menu Item.
     * @param menuItem 
     * @returns 
     */
    function renderMenuItem(menuItem: MenuItem) {
        const {
            icon,
            primaryText,
            secondaryText,
            toUrl,
        } = menuItem;

        const isSelected = location.pathname.includes(toUrl);

        return <NavigableListItem 
            icon={icon}
            primaryText={primaryText}
            secondaryText={secondaryText}
            toUrl={toUrl}
            isSelected={isSelected}
            key={toUrl}
            onClick={toggleDrawer}
        />;
    }

    function renderToggleDarkMode(): React.ReactElement {
        const switchDefinition: React.ReactElement = (
            <Switch 
                onClick={toggleDarkMode}
                size='small'
                color = 'primary'
                checked={currentTheme.palette.mode === 'dark'}
            />
        );

        return (
            <ListItem>
                <FormControlLabel 
                    control={switchDefinition} 
                    label='Activar Modo Oscuro' 
                />
            </ListItem>
        );
    }

    /**
     * Renders the Menu Items.
     * @returns The component.
     */
    function renderMenuItems() {
        return MENU_ITEMS.map((currentItem: MenuItem) => renderMenuItem(currentItem));
    }

    return (
        <>
            <Drawer  
                className={classes.drawer}
                classes={{paper: classes.drawerPaper}}
                open={isOpen}
                onClose={toggleDrawer}
            >
                <List>
                    <Divider />
                    <NavigableListItem 
                        primaryText='Inicio'
                        secondaryText='Volver a la pagina de Inicio'
                        toUrl='/'
                        icon={<Home />}
                        isSelected={location.pathname === '/'}
                        onClick={toggleDrawer}
                    />
                    <Divider />
                    <List>
                        {renderMenuItems()}
                    </List>
                    <Divider />
                    {renderToggleDarkMode()}
                </List>
            </Drawer>
        </>
    );
};