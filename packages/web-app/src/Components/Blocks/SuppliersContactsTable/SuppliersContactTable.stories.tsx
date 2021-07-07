import React from 'react';
import {
    Story,
    Meta,
} from '@storybook/react';
import { SupplierContactsTable, SupplierContactsTableProps } from './SupplierContactsTable';
import { Contact, ContactType } from '../../../Models';

export default {
    title: 'Components/Blocks/SuppliersContactsTable',
    component: SupplierContactsTable,
    argTypes: {
        onDeleteContactClickListener: {
            name: 'onDeleteContactClickListener',
        },
        onContactClickListener: {
            name: 'onContactClickListener',
        },
    },
} as Meta;

const Template: Story<SupplierContactsTableProps> = (args) => <SupplierContactsTable {...args} />;

const contacts: Contact[] = [
    {
        contactType: ContactType.Returns,
        emailAddress: 'somecontact@contacts.com',
        firstName: 'Contact FirstName',
        lastName: 'Contact LastName',
        id: '12345',
        phoneNumber: '12345667',
    },
    {
        contactType: ContactType.SalesRep,
        emailAddress: 'anothercontact@contacts.com',
        firstName: 'Contact2 FirstName',
        lastName: 'Contact2 LastName',
        id: '12345',
        phoneNumber: '45753',
    }
];

export const Primary = Template.bind({});
Primary.args = {
    contacts: contacts,
    canDeleteContact: false,
};

export const WithDeleteContacts = Template.bind({});
WithDeleteContacts.args = {
    contacts: contacts,
    canDeleteContact: true,
};