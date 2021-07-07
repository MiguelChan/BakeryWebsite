import React from 'react';
import {
    Story,
    Meta,
} from '@storybook/react';
import { 
    EditableSupplierContactsTable, 
    EditableSupplierContactsTableProps,
} from './EditableSupplierContactsTable';
import { 
    Contact, 
    ContactType,
} from '../../../Models';

export default {
    title: 'Components/Composites/EditableSupplierContactsTable',
    component: EditableSupplierContactsTable,
    argTypes: {
        onCreateContactClickListener: {
            name: 'onCreateContactClickListener',
        },
        onDeleteContactClickListener: {
            name: 'onDeleteContactClickListener',
        },
    }
} as Meta;

const Template: Story<EditableSupplierContactsTableProps> = (args) => <EditableSupplierContactsTable {...args} />;

const contacts: Contact[] = [
    {
        id: '12345',
        contactType: ContactType.SalesRep,
        emailAddress: 'salesrep@sales.com',
        firstName: 'Sales',
        lastName: 'Rep',
        phoneNumber: '123456',
    },
    {
        id: '123456',
        contactType: ContactType.Returns,
        emailAddress: 'returns@sales.com',
        firstName: 'Returns',
        lastName: 'Rep',
        phoneNumber: '124654',
    },
];

export const Primary = Template.bind({});
Primary.args = {
    contacts: contacts,
};