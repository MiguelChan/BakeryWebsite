import * as React from 'react';
import { render,
screen } from '@testing-library/react';
import { NavigableListItem } from './NavigableListItem';
import { List } from '@mui/material';
import { ContactMail } from '@mui/icons-material';
import { createMemoryHistory,
MemoryHistory } from 'history'
import { Router } from 'react-router-dom';

describe('NavigableListItem', () => {

    let memoryHistory: MemoryHistory;

    beforeEach(() => {
        memoryHistory = createMemoryHistory();
    });

    it('Should display the MenuItem', () => {
        const primaryText = 'A Menu Item';
        const secondaryText = 'A Secondary Menu Item';
        const toUrl = '/SomeRandomUrl';
        const icon = <ContactMail />;

        setupComponent(primaryText, secondaryText, toUrl, icon, false);

        const element = screen.getByText(primaryText);
        expect(element).toBeInTheDocument();
    });

    it('Should redirect to correct URL when clicked', () => {
        const primaryText = 'A Menu Item';
        const secondaryText = 'A Secondary Menu Item';
        const toUrl = '/SomeRandomUrl';
        const icon = <ContactMail />;

        setupComponent(primaryText, secondaryText, toUrl, icon, true);

        const element = screen.getByText(primaryText);
        element.click();

        expect(memoryHistory.location.pathname).toContain(toUrl);
    });

    function setupComponent(
        primaryText: string, 
        secondaryText: string, 
        toUrl: string, 
        icon: any,
        isSelected: boolean,
    ) {
        render(
            <Router history={memoryHistory}>
                <List>
                    <NavigableListItem 
                        primaryText={primaryText}
                        secondaryText={secondaryText}
                        toUrl={toUrl}
                        icon={icon}
                        isSelected={isSelected}
                    />
                </List>
            </Router>
        );
    }

});