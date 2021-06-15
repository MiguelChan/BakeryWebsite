import * as React from 'react';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/react';
import { OnPageChangedListener, SuppliersTable } from './SuppliersTable';
import { 
    Supplier,
} from '../../../Models';
import { OnSupplierClickedListener } from '../../Blocks';

describe('SuppliersTable', () => {

    const mockOnSupplierClickedListener: OnSupplierClickedListener = jest.fn();
    const mockOnPageChangedListener: OnPageChangedListener = jest.fn();

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
        
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Direccion')).toBeInTheDocument();
        expect(screen.getByText('Numero de Contactos')).toBeInTheDocument();
    });

    it('Should render all the provided suppliers', () => {
        const suppliers: Supplier[] = setupSuppliers(2);

        setupComponent(suppliers, mockOnSupplierClickedListener);

        screen.getByText('Name: 0');
        screen.getByText('Line1: 0 Line2: 0');
        
        screen.getByText('Name: 1');
        screen.getByText('Line1: 1 Line2: 1');
    });

    it('Should render pagination data', () => {
        const suppliers: Supplier[] = setupSuppliers(200);
        setupComponent(suppliers, mockOnSupplierClickedListener, 0, mockOnPageChangedListener);

        expect(screen.getByText(/.*-.*of.*200/)).toBeInTheDocument();
    });

    it('Should call OnPageChangedListener', () => {
        const suppliers: Supplier[] = setupSuppliers(200);
        setupComponent(suppliers, mockOnSupplierClickedListener, 0, mockOnPageChangedListener);

        expect(screen.getByText(/.*-.*of.*200/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Next page'));

        expect(mockOnPageChangedListener).toHaveBeenCalledWith(0, 1);
    });

    it('Should call onPageChangedListener when custom page is provided', () => {
        const suppliers: Supplier[] = setupSuppliers(200);
        setupComponent(suppliers, mockOnSupplierClickedListener, 1, mockOnPageChangedListener);

        expect(screen.getByText(/.*-.*of.*200/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Previous page'));

        expect(mockOnPageChangedListener).toHaveBeenCalledWith(1, 0);
    });

    function setupSuppliers(supplierCount: number): Supplier[] {
        const suppliers: Supplier[] = [];

        for (let i = 0; i < supplierCount; i++) {
            suppliers.push({
                id: `${i}`,
                name:`Name: ${i}`,
                lineAddress1: `Line1: ${i}`,
                lineAddress2: `Line2: ${i}`,
                phoneNumber: `PhoneNumber: ${i}`,
                contacts: [],
            });
        }

        return suppliers;
    }

    function setupComponent(
        suppliers: Supplier[], 
        onSupplierClickedListener: OnSupplierClickedListener,
        currentPage: number = 0,
        onPageChangedListener: OnPageChangedListener = (): void => {},
    ) {
        render(
            <SuppliersTable 
                suppliers={suppliers}
                onSupplierClickedListener={onSupplierClickedListener}
                currentPage={currentPage}
                onPageChangedListener={onPageChangedListener}
                totalSuppliers={suppliers.length}
            />
        );
    }

});