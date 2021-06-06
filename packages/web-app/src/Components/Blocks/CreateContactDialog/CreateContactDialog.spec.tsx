import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    CreateContactDialog,
} from '.';
import {
    OnCreateContactClickListener,
} from './CreateContactDialog';
import { 
    OnButtonClickListener,
} from '../BasicDialog/BasicDialog';
import { 
    ContactType,
} from '../../../Models';

describe('CreateContactDialog', () => {

    const mockOnCreateContactClickListener = jest.fn();
    const mockOnCloseModalClickListener = jest.fn();

    afterEach(() => {
        mockOnCloseModalClickListener.mockClear();
        mockOnCreateContactClickListener.mockClear();
    });

    it('Should display the correct fields', () => {
        setupComponent(mockOnCreateContactClickListener, mockOnCloseModalClickListener);

        expect(screen.getByLabelText('Nombre(s)')).toBeInTheDocument();
        expect(screen.getByLabelText('Apellido(s)')).toBeInTheDocument();
        expect(screen.getByLabelText('Numero Telefonico')).toBeInTheDocument();
        expect(screen.getByLabelText('Correo Electronico')).toBeInTheDocument();
        expect(screen.getByLabelText('Tipo de Contacto')).toBeInTheDocument();
        expect(screen.getByLabelText('Cancelar')).toBeInTheDocument();
        expect(screen.getByLabelText('Crear Contacto')).toBeInTheDocument();
    });

    it('Should close the Modal', () => {
        setupComponent(mockOnCreateContactClickListener, mockOnCloseModalClickListener);

        fireEvent.click(screen.getByLabelText('Cancelar'));

        expect(mockOnCloseModalClickListener).toHaveBeenCalled();
    });

    it('Should return the created Contact', () => {
        const testFirstName = 'TestName';
        const testLastName = 'TestLastName';
        const testPhoneNumber = '2063794757';
        const testEmail = 'miguel@gmail.com';

        setupComponent(mockOnCreateContactClickListener, mockOnCloseModalClickListener);

        typeText('Nombre(s)', testFirstName);
        typeText('Apellido(s)', testLastName);
        typeText('Numero Telefonico', testPhoneNumber);
        typeText('Correo Electronico', testEmail);

        fireEvent.click(screen.getByLabelText('Crear Contacto'));

        expect(mockOnCreateContactClickListener).toHaveBeenCalledWith({
            contactType: ContactType.Returns,
            phoneNumber: testPhoneNumber,
            emailAddress: testEmail,
            contactFirstName: testFirstName,
            contactLastName: testLastName,
            id: '',
        });
    });

    it('Should not create the Contact when required fields are missing', () => {
        const testPhoneNumber = '2063794757';
        const testEmail = 'miguel@gmail.com';

        setupComponent(mockOnCreateContactClickListener, mockOnCloseModalClickListener);

        typeText('Numero Telefonico', testPhoneNumber);
        typeText('Correo Electronico', testEmail);

        fireEvent.click(screen.getByLabelText('Crear Contacto'));

        expect(mockOnCreateContactClickListener).not.toHaveBeenCalled();
    });

    function typeText(labelToFind: string, valueToWrite: string) {
        const input = screen.getByLabelText(labelToFind).querySelector('input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: valueToWrite } });
    }

    function setupComponent(onCreateContactClickListener: OnCreateContactClickListener, onCloseModalClickListener: OnButtonClickListener) {
        render(
            <CreateContactDialog 
                isOpen
                onCloseModalClickListener={onCloseModalClickListener}
                onCreateContactClickListener={onCreateContactClickListener}
            />
        );
    }

});