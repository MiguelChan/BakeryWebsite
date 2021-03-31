import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    SupplierEditableView,
} from './SupplierEditableView';
import { NAME_TEST_ID, PHONE_NUMBER_TEST_ID } from '../../Composites';

describe('SupplierEditableView', () => {

    it('Should display the sections for Editable Views', () => {
        setupComponent();

        screen.getByText(/Nombre de Proveedor/i);
        screen.getByText(/Nombre completo/i);
        screen.getByText(/Agregar Nuevo Contacto/i);
        screen.getByText(/Crear Proveedor/);
    });

    it('Should not create a Supplier when either the name or phone numbers are missing', () => {
        setupComponent();
        fireEvent.click(screen.getByText('Crear Proveedor'));

        expect(screen.getByText(/.*Atributos Requeridos.*/)).toBeInTheDocument();
    });

    it('Should show contacts missing dialog when no contacts are added', () => {
        setupComponent();
        typeValue(NAME_TEST_ID, 'SomeRandomName');
        typeValue(PHONE_NUMBER_TEST_ID, 'SomeRandomPhoneNumber');

        fireEvent.click(screen.getByText('Crear Proveedor'));

        expect(screen.getByText(/.*Contactos no agregados.*/)).toBeInTheDocument();
    });

    function typeValue(testId: string, valueToType: string) {
        const inputElement = screen.getByTestId(testId).querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: valueToType } });
    }

    function setupComponent() {
        render(
            <SupplierEditableView />
        );
    }
});