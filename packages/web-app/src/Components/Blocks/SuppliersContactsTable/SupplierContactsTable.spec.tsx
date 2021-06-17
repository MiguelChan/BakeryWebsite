import * as React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { 
    OnDeleteContactClickListener,
    SupplierContactsTable,
} from './SupplierContactsTable';
import { 
    Contact, ContactType,
} from '../../../Models';

describe('SupplierContactsTable', () => {

    const mockOnDeleteContactClickListener = jest.fn();

    afterEach(() => {
        mockOnDeleteContactClickListener.mockClear();
    });

    it('Should display the Table Header', () => {
        const contacts: Contact[] = buildContacts(0);
        setupComponent(contacts, mockOnDeleteContactClickListener);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);
    });

    it('Should display the provided Contacts', () => {
        const contacts: Contact[] = buildContacts(2);
        setupComponent(contacts, mockOnDeleteContactClickListener);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);

        expect(screen.getByText('PhoneNumber: 0')).toBeInTheDocument();
        expect(screen.getByText('PhoneNumber: 1')).toBeInTheDocument();
    });

    function buildContacts(numberOfContacts: number): Contact[] {
        const contacts: Contact[] = [];
        for (let i = 0; i < numberOfContacts; i++) {
            contacts.push({
                id: `${i}`,
                contactType: ContactType.Returns,
                phoneNumber: `PhoneNumber: ${i}`,
                emailAddress: `EmailAddress: ${i}`,
                firstName: `FirstName: ${i}`,
                lastName: `LastName: ${i}`,
            });
        }
        return contacts;
    }

    function setupComponent(contacts: Contact[], onDeleteContactClickListener: OnDeleteContactClickListener) {
        render(
            <SupplierContactsTable 
                contacts={contacts} 
                canDeleteContact={false}
                onDeleteContactClickListener={onDeleteContactClickListener}
            />
        );
    }

});