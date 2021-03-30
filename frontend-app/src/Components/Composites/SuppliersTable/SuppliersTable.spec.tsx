import * as React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { SuppliersTable } from './SuppliersTable';
import { 
    Supplier,
} from '../../../Models';
import { OnSupplierClickedListener } from '../../Blocks';

describe('SuppliersTable', () => {

    const mockOnSupplierClickedListener: OnSupplierClickedListener = jest.fn();

    afterEach(() => {
        (mockOnSupplierClickedListener as jest.Mock).mockClear();
    });

    it('Should render No Suppliers Text when no Suppliers are not found', () => {
        setupComponent([], mockOnSupplierClickedListener);

        screen.getByText(/No hay proveedores disponibles/);
    });

    it('Should render the Table Header', () => {
        const suppliers: Supplier[] = setupSuppliers(2);

        setupComponent(suppliers, mockOnSupplierClickedListener);
        
        screen.getByText('Nombre');
        screen.getByText('Direccion');
        screen.getByText('Numero de Contactos');
    });

    it('Should render all the provided suppliers', () => {
        const suppliers: Supplier[] = setupSuppliers(2);

        setupComponent(suppliers, mockOnSupplierClickedListener);

        screen.getByText('Name: 0');
        screen.getByText('Line1: 0 Line2: 0');
        
        screen.getByText('Name: 1');
        screen.getByText('Line1: 1 Line2: 1');
    });

    function setupSuppliers(supplierCount: number): Supplier[] {
        const suppliers: Supplier[] = [];

        for (let i = 0; i < supplierCount; i++) {
            suppliers.push({
                id: `${i}`,
                name:`Name: ${i}`,
                addressLine1: `Line1: ${i}`,
                addressLine2: `Line2: ${i}`,
                phoneNumber: `PhoneNumber: ${i}`,
                contacts: [],
            });
        }

        return suppliers;
    }

    function setupComponent(suppliers: Supplier[], onSupplierClickedListener: OnSupplierClickedListener) {
        render(
            <SuppliersTable 
                suppliers={suppliers}
                onSupplierClickedListener={onSupplierClickedListener}
            />
        );
    }

});