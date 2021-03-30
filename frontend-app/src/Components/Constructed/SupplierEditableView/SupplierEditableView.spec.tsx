import * as React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { 
    SupplierEditableView,
} from './SupplierEditableView';

describe('SupplierEditableView', () => {

    it('Should display the sections for Editable Views', () => {
        setupComponent();

        screen.getByText(/Nombre de Proveedor/i);
        screen.getByText(/Nombre completo/i);
        screen.getByText(/Agregar Nuevo Contacto/i);
        screen.getByText(/Crear Proveedor/);
    });

    function setupComponent() {
        render(
            <SupplierEditableView />
        );
    }
});