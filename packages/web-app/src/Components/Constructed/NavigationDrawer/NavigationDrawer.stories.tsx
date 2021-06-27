import React from 'react';
import {
    Story,
    Meta,
} from '@storybook/react';
import { 
    NavigationDrawer, NavigationDrawerProps,
} from '.';
import { MemoryRouter } from 'react-router';

export default {
    title: 'Components/Constructed/NavigationDrawer',
    component: NavigationDrawer,
    argTypes: {
        toggleDrawer: {
            name: 'onToggleDrawer',
            description: 'Called when something occurs within the Drawer that should toggle the Status',
        },
    },
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],

} as Meta;

const Template: Story<NavigationDrawerProps> = (args) => <NavigationDrawer {...args} />;

export const Primary = Template.bind(this);
Primary.args = {
    isOpen: true,
};
