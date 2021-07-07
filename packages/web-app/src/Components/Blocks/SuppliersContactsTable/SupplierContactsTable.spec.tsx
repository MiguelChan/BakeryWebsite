import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    OnContactClickListener,
    OnDeleteContactClickListener,
    SupplierContactsTable,
} from './SupplierContactsTable';
import { 
    Contact, ContactType,
} from '../../../Models';

describe('SupplierContactsTable', () => {

    const mockOnDeleteContactClickListener = jest.fn();
    const mockOnContactClickedListener = jest.fn();

    afterEach(() => {
        mockOnDeleteContactClickListener.mockClear();
    });

    it('Should display the Table Header', () => {
        const contacts: Contact[] = buildContacts(0);
        setupComponent(contacts, mockOnDeleteContactClickListener, mockOnContactClickedListener);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);
    });

    it('Should display the provided Contacts', () => {
        const contacts: Contact[] = buildContacts(2);
        setupComponent(contacts, mockOnDeleteContactClickListener, mockOnContactClickedListener);

        screen.getByText(/#/);
        screen.getByText(/Nombre completo/);
        screen.getByText(/Correo Electronico/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Tipo/);

        expect(screen.getByText('PhoneNumber: 0')).toBeInTheDocument();
        expect(screen.getByText('PhoneNumber: 1')).toBeInTheDocument();

        fireEvent.click(screen.getByText('PhoneNumber: 0'));
        expect(mockOnContactClickedListener).toHaveBeenCalledWith(contacts[0]);
    });
    
    it('Should display delete button and call the listener when provided', () => {
        const contacts: Contact[] = buildContacts(2);
        setupComponent(contacts, mockOnDeleteContactClickListener, mockOnContactClickedListener, true);

        const deleteButtons: HTMLElement[] = screen.getAllByLabelText('Delete Contact');
        expect(deleteButtons.length).toEqual(contacts.length);

        fireEvent.click(deleteButtons[0]);
        expect(mockOnDeleteContactClickListener).toHaveBeenCalledWith(contacts[0], 0);
        expect(mockOnContactClickedListener).not.toHaveBeenCalled();
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

    function setupComponent(
        contacts: Contact[], 
        onDeleteContactClickListener: OnDeleteContactClickListener,
        onContactClickListener: OnContactClickListener,
        canDeleteContact: boolean = false,
    ) {
        render(
            <SupplierContactsTable 
                contacts={contacts} 
                canDeleteContact={canDeleteContact}
                onDeleteContactClickListener={onDeleteContactClickListener}
                onContactClickListener={onContactClickListener}
            />
        );
    }

});