import * as React from 'react';
import { render,
screen } from '@testing-library/react';
import { Table } from '@mui/material';
import { SuppliersTableHeader } from './SuppliersTableHeader';

describe('SuppliersTableHeader', () => {
    it('Should display the correct Headers', () => {
        setupComponent();

        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Direccion')).toBeInTheDocument();
        expect(screen.getByText('Numero de Contactos')).toBeInTheDocument();
    });

    function setupComponent() {
        render(
            <Table>
                <SuppliersTableHeader />
            </Table>
        );
    }
});