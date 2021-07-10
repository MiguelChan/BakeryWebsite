import React from 'react';
import {
    Story,
    Meta,
} from '@storybook/react';
import { EditSupplierView } from './EditSupplierView';
import { MemoryRouter,
MemoryRouterProps,
Route } from 'react-router';
import { ContactType,
Supplier } from '../../../Models';

const defaultSupplier: Supplier = {
    id: '123456',
    lineAddress1: 'Avenida Siempre Viva',
    lineAddress2: '123456',
    name: 'Proveedor por Defecto',
    phoneNumber: '123456',
    contacts: [
        {
            contactType: ContactType.SalesRep,
            emailAddress: 'salesrep@sales.com',
            firstName: 'Sales',
            lastName: 'Rep',
            id: '123456',
            phoneNumber: '12345641',
        },
    ],
};

const memoryRouter: MemoryRouterProps = {
    initialEntries: [
        {
            state: {
                supplier: defaultSupplier,
            },
        },
    ],
};

export default {
    title: 'Components/Constructed/EditSupplierView',
    component: EditSupplierView,
    decorators: [
    ]
} as Meta;

const Template: Story = () => (
    <MemoryRouter {...memoryRouter} >
        <Route component={EditSupplierView} location={{
            state: {
                // supplier: defaultSupplier,
            },
            hash: '#',
            pathname: '/',
            search: '',
        }}/>
    </MemoryRouter>
);

export const Primary = Template.bind({});
