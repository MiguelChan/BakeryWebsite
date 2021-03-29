import { 
    Divider, 
    Drawer, 
    List,  
 } from '@material-ui/core';
import { 
    AccountTree,
    ContactMail,
    Home,
 } from '@material-ui/icons';
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

interface Properties {
    className?: string;
}

/**
 * Defines the Navigation Bar of the Website.
 * @returns A React Function Component.
 */
export const NavigationBar: React.FunctionComponent<Properties> = ({
    className,
}) => {

    const location = useLocation();

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

        // const isSelected = location.pathname === toUrl;
        const isSelected = location.pathname.includes(toUrl);

        return <NavigableListItem 
            icon={icon}
            primaryText={primaryText}
            secondaryText={secondaryText}
            toUrl={toUrl}
            isSelected={isSelected}
            key={toUrl}
        />;
    }

    /**
     * Renders the Menu Items.
     * @returns The component.
     */
    function renderMenuItems() {
        return MENU_ITEMS.map((currentItem: MenuItem) => renderMenuItem(currentItem));
    }

    return (
        <Drawer 
            color='primary' 
            variant='permanent'
            anchor='left'
            className={className}
        >
            <List>
                <NavigableListItem 
                    primaryText='Inicio'
                    secondaryText='Volver a la pagina de Inicio'
                    toUrl='/'
                    icon={<Home />}
                    isSelected={location.pathname === '/'}
                />
            </List>
            <Divider />
            <List>
                {renderMenuItems()}
            </List>
        </Drawer>
    );
};