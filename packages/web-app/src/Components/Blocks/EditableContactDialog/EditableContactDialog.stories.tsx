import React from 'react';
import {
    Meta,
    Story,
} from '@storybook/react';
import { EditableContactDialog, EditableContactDialogProps } from './EditableContactDialog';
import { Contact, ContactType } from '../../../Models';

export default {
    title: 'Components/Blocks/EditableContactDialog',
    component: EditableContactDialog,
} as Meta;

const customContact: Contact = {
    id: 'SomeId',
    contactType: ContactType.Returns,
    emailAddress: 'someSome@somesome.com',
    firstName: 'Miguel',
    lastName: 'Chan',
    phoneNumber: '1234567',
};

const Template: Story<EditableContactDialogProps> = (args) => <EditableContactDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    contact: customContact,
    isDialogOpen: true,
};