import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    ADDRESS_1_TEST_ID,
    ADDRESS_2_TEST_ID,
    EditableSupplierForm, 
    NAME_TEST_ID, 
    OnSupplierChangedListener,
    PHONE_NUMBER_TEST_ID,
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

        typeValue(NAME_TEST_ID, testSupplierName);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            name: testSupplierName,
        });

        typeValue(ADDRESS_1_TEST_ID, testLineAddress1);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            addressLine1: testLineAddress1,
        });

        typeValue(ADDRESS_2_TEST_ID, testLineAddress2);
        expect(mockOnSupplierChangedListener).toHaveBeenCalledWith({
            ...supplier,
            addressLine2: testLineAddress2,
        });

        typeValue(PHONE_NUMBER_TEST_ID, testPhoneNumber);
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