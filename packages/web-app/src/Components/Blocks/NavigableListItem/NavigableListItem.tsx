import { 
    ListItem, 
    ListItemIcon, 
    ListItemText,
 } from '@material-ui/core';
import { 
    Link as RouterLink,
 } from 'react-router-dom';
import * as React from 'react';

interface Properties {
    icon: any;
    primaryText: string;
    secondaryText: string;
    toUrl: string;
    isSelected: boolean;
    onClick?: () => void;
}

/**
 * Defines A NavigableListItem, which can be used within a List in order to create Navigation Links.
 * @param icon The icon to display.
 * @param {string} primaryText The primary text of the Item.
 * @param {string} secondaryText A subtitle for the Item.
 * @param {string} toUrl Where this link should point to.
 * @param {boolean} isSelected Whether the button is selected or not.
 * @returns 
 */
export const NavigableListItem: React.FunctionComponent<Properties> = ({
    icon,
    primaryText,
    secondaryText,
    toUrl,
    isSelected,
    onClick,
}) => {

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => (
            <RouterLink to={{
                pathname: toUrl,
                state: {
                    sectionTitle: primaryText,
                }
            }} {...itemProps}
            onClick={onClick}
            />
        )),
        [toUrl, primaryText, onClick],
    );

    return (
        <ListItem
            button
            component={renderLink}
            selected={isSelected}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItem>
    );
};