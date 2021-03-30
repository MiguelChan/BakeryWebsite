import * as React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { 
    SupplierContactsTable,
} from './SupplierContactsTable';
import { 
    Contact, ContactType,
} from '../../../Models';

describe('SupplierContactsTable', () => {

    it('Should display the Table Header', () => {
        const contacts: Contact[] = buildContacts(0);
        setupComponent(contacts);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);
    });

    it('Should display the provided Contacts', () => {
        const contacts: Contact[] = buildContacts(2);
        setupComponent(contacts);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);

        expect(screen.getAllByText('0').length).toBe(3);
        expect(screen.getAllByText('1').length).toBe(3);
    });

    function buildContacts(numberOfContacts: number): Contact[] {
        const contacts: Contact[] = [];
        for (let i = 0; i < numberOfContacts; i++) {
            contacts.push({
                id: `${i}`,
                contactType: ContactType.Returns,
                phoneNumber: `${i}`,
                emailAddress: `${i}`,
                contactFirstName: `${i}`,
                contactLastName: `${i}`,
            });
        }
        return contacts;
    }

    function setupComponent(contacts: Contact[]) {
        render(
            <SupplierContactsTable contacts={contacts} />
        );
    }

});