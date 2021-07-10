import React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { Primary,
WithNullValues } from './ViewContactDialog.stories';
import { Contact } from '../../../Models';

describe('ViewContactDialog', () => {

    const mockOnCloseDialogClickListener = jest.fn();

    afterEach(() => {
        mockOnCloseDialogClickListener.mockClear();
    });

    it('Should display the Contacts Information', () => {
        const contact: Contact = Primary.args?.contact!;

        setupPrimaryComponent(mockOnCloseDialogClickListener);

        expect(screen.getByDisplayValue(contact.firstName)).toBeInTheDocument();
        expect(screen.getByDisplayValue(contact.lastName)).toBeInTheDocument();
        expect(screen.getByDisplayValue(contact.phoneNumber)).toBeInTheDocument();
        expect(screen.getByDisplayValue(contact.emailAddress)).toBeInTheDocument();
        expect(screen.getByDisplayValue(contact.contactType)).toBeChecked();
    });

    it('Should close the Modal when requested', () => {
        setupPrimaryComponent(mockOnCloseDialogClickListener);

        fireEvent.click(screen.getByText('Cerrar'));

        expect(mockOnCloseDialogClickListener).toHaveBeenCalled();
    });

    it('Should display N/A when Null values are not provided', () => {
        setupWithNullValuesComponent(mockOnCloseDialogClickListener);

        expect(screen.getByDisplayValue('N/A')).toBeInTheDocument();
    });

    function setupWithNullValuesComponent(onCloseDialog: () => void) {
        const contact: Contact = WithNullValues.args?.contact!;

        return render(<Primary contact={contact} onCloseDialog={onCloseDialog} />);
    }

    function setupPrimaryComponent(onCloseDialog: () => void) {
        const contact: Contact = Primary.args?.contact!;

        return render(<Primary contact={contact} onCloseDialog={onCloseDialog}/>);
    }

});