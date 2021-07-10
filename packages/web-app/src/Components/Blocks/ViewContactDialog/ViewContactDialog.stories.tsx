import React from 'react';
import {
    Story,
    Meta
} from '@storybook/react';
import { ViewContactDialog } from '.';
import { ViewContactDialogProps } from './ViewContactDialog';
import { Contact,
ContactType } from '../../../Models';

export default {
    title: 'Components/Blocks/ViewContactDialog',
    component: ViewContactDialog,
    argTypes: {
        onCloseDialog: {
            name: 'onCloseDialog',
        },
    },
} as Meta;

const contact: Contact = {
    contactType: ContactType.Returns,
    firstName: 'Miguel',
    lastName: 'Chan',
    emailAddress: 'nemesis_658@gmail.com',
    phoneNumber: '+12063794757',
    id: 'someRandomId',
};

const contactWithNullValues: Contact = {
    ...contact,
    emailAddress: '',
};

const Template: Story<ViewContactDialogProps> = (args) => <ViewContactDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    contact,
};

export const WithNullValues = Template.bind({});
WithNullValues.args = {
    contact: contactWithNullValues,
};