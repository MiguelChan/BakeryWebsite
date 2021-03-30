import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    EditableSupplierForm, 
    OnSupplierChangedListener,
} from './EditableSupplierForm';
import { 
    Supplier,
} from '../../../Models';

describe('EditableSupplierForm', () => {

    const mockOnSupplierChangedListener = jest.fn();

    beforeEach(() => {
    });

    afterEach(() => {
        mockOnSupplierChangedListener.mockClear();
    });

    it('Should display all the fields', () => {
        setupComponent(mockOnSupplierChangedListener, buildEmptySupplier());

        screen.getByText(/Nombre de Proveedor/);
        screen.getByText(/Direccion Linea 1/);
        screen.getByText(/Direccion Linea 2/);
        screen.getByText(/Numero de Telefono/);
        screen.getByText(/Agregar Imagen/);
    });

    it('Should call the OnSupplierChangedListener with the correct attributes', () => {
        const testSupplierName = 'TestSupplierName';
        const testLineAddress1 = 'TestLineAddress1';
        const testLineAddress2 = 'TestLineAddress2';
        const testPhoneNumber = 'TestPhoneNumber';

        const supplier: Supplier = buildEmptySupplier();
        setupComponent(mockOnSupplierChangedListener, supplier);

        typeValue('supplierName', testSupplierName);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            name: testSupplierName,
        });

        typeValue('supplierAddress1', testLineAddress1);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            addressLine1: testLineAddress1,
        });

        typeValue('supplierAddress2', testLineAddress2);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            addressLine2: testLineAddress2,
        });

        typeValue('supplierPhoneNumber', testPhoneNumber);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            phoneNumber: testPhoneNumber,
        });
    });

    function typeValue(dataTestId: string, valueToType: string) {
        const inputElement = screen.getByTestId(dataTestId).querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: valueToType } });
    }

    function buildEmptySupplier(): Supplier {
        return {
            addressLine1: '',
            addressLine2: '',
            contacts: [],
            id: '',
            name: '',
            phoneNumber: '',
        };
    }

    function setupComponent(onSupplierChangedListener: OnSupplierChangedListener, supplier: Supplier) {
        render(
            <EditableSupplierForm 
                supplier={supplier} 
                onSupplierChangedListener={onSupplierChangedListener}
            />
        );
    }
});