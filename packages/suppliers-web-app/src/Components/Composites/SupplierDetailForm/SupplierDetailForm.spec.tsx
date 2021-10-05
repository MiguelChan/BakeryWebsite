import React from 'react';
import {
    render,
    screen,
    fireEvent
} from '@testing-library/react';
import { Contact,
ContactType,
Supplier } from '../../../Models';
import { OnButtonClickListener } from '../../Blocks';
import { SupplierDetailForm } from './SupplierDetailForm';
describe('SupplierDetailForm', () => {

    const mockOnEditClickListener = jest.fn();

    // ToDo: There should be a better way of randomly generate an Object in JS.
    function buildRandomSupplier(): Supplier {
        return {
            lineAddress1: 'AddressLine1',
            lineAddress2: 'AddressLine2',
            contacts: [],
            id: '',
            name: 'SupplierName',
            phoneNumber: 'SupplierPhoneNumber',
        };
    }

    function buildRandomContact(): Contact {
        return {
            firstName: 'ContactFirstName',
            lastName: 'ContactLastName',
            contactType: ContactType.SalesRep,
            emailAddress: 'ContactEmailAddress',
            id: '',
            phoneNumber: 'ContactPhoneNumber',
        };
    }

    afterEach(() => {
        mockOnEditClickListener.mockClear();
    });

    it('Should display both Suppliers and Contacts', () => {
        const contact: Contact = buildRandomContact();
        const supplier: Supplier = buildRandomSupplier();
        supplier.contacts = [contact];

        setupComponent(supplier, mockOnEditClickListener);

        // The Supplier Info is displayed within TextField, therefore they're 
        expect(screen.getByDisplayValue(supplier.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.phoneNumber)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.lineAddress1)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.lineAddress2)).toBeInTheDocument();

        // Contact Info lives within a Table.
        expect(screen.getByText(contact.phoneNumber)).toBeInTheDocument();

        // We need the Edit Button.
        expect(screen.getByText('Editar Proveedor')).toBeInTheDocument();
    });

    it('Should call the onEditClickListener when an Edit is Requested', () => {
        const contact: Contact = buildRandomContact();
        const supplier: Supplier = buildRandomSupplier();
        supplier.contacts = [contact];

        setupComponent(supplier, mockOnEditClickListener);

        fireEvent.click(screen.getByText('Editar Proveedor'));

        expect(mockOnEditClickListener).toHaveBeenCalled();
    });

    function setupComponent(supplier: Supplier, onEditClickListener: OnButtonClickListener) {
        render(
            <SupplierDetailForm 
                onEditSupplierClickListener={onEditClickListener} 
                supplier={supplier}
            />
        );
    }

});