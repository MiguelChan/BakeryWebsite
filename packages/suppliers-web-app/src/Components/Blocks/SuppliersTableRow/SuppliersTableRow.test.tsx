import * as React from 'react';
import { Supplier } from '../../../Models';
import { render,
screen } from '@testing-library/react';
import { Table,
TableBody } from '@mui/material';
import { OnSupplierClickedListener,
SuppliersTableRow } from './SuppliersTableRow';

describe('SuppliersTableRow', () => {

    let mockOnSupplierClickedListener: OnSupplierClickedListener;

    beforeEach(() => {
        mockOnSupplierClickedListener = jest.fn();
    });

    afterEach(() => {
        (mockOnSupplierClickedListener as jest.Mock).mockClear();
    });

    it('Should display the provided Supplier', () => {
        const supplier: Supplier = buildSupplier();

        const supplierAddress = `${supplier.lineAddress1} ${supplier.lineAddress2}`;

        setupComponent(supplier, mockOnSupplierClickedListener);

        expect(screen.getByText(supplier.name)).toBeInTheDocument();
        expect(screen.getByText(supplierAddress)).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('Should call the listener when the row is clicked', () => {
        const supplier: Supplier = buildSupplier();

        setupComponent(supplier, mockOnSupplierClickedListener);

        screen.getByText(supplier.name).click();

        expect(mockOnSupplierClickedListener).toHaveBeenCalledWith(supplier);
    });

    function buildSupplier(): Supplier {
        return {
            id: 'SomeSome',
            name: 'Santos Lugo AC',
            lineAddress1: 'Yuc',
            lineAddress2: 'MID',
            contacts: [],
            phoneNumber: '123-456-7890'
        };
    }

    function setupComponent(supplier: Supplier, onSupplierClickedListener: OnSupplierClickedListener) {
        render(
            <Table>
                <TableBody>
                    <SuppliersTableRow 
                        supplier={supplier} 
                        onSupplierClickedListener={onSupplierClickedListener}
                    />
                </TableBody>
            </Table>
        );
    }
});