import React from 'react';
import { 
    Supplier,
} from '../../../Models';
import {
    render,
    screen,
} from '@testing-library/react';
import { ViewSuppliers } from './ViewSuppliers';
import {
    Provider,
} from 'react-redux';
import {
    useAppSelector,
    useAppDispatch,
    store,
    SuppliersState,
    SupplierStatus,
    fetchSuppliers,
} from '../../../Store';
import { Nullable } from '../../../Utils';

jest.mock('../../../Store');

describe('ViewSuppliers', () => {

    const mockUseAppSelector = useAppSelector as jest.Mock;
    const mockUseAppDispatch = useAppDispatch as jest.Mock;
    
    let mockDispatch: jest.Mock;
    let suppliersState: SuppliersState;

    function setupInitialState(
        suppliers: Supplier[], 
        totalElements: number, 
        status: SupplierStatus, 
        errorMessage: Nullable<string>,
    ) {
        suppliersState = {
            errorMessage: errorMessage,
            status: status,
            suppliers: suppliers,
            totalElements: totalElements,
        };
        mockUseAppSelector.mockImplementation(() => suppliersState);
    }

    function buildRandomSupplier(): Supplier {
        return {
            lineAddress1: 'addressLine1',
            lineAddress2: 'addressLine2',
            contacts: [],
            id: 'SomeId',
            name: 'SomeName',
            phoneNumber: 'phoneNumber',
        };
    }

    function setupComponent() {
        render(
            <Provider store={store}>
                <ViewSuppliers />
            </Provider>
        );
    }

    beforeEach(() => {
        mockDispatch = jest.fn();
        mockUseAppDispatch.mockImplementation(() => mockDispatch);
    });

    afterEach(() => {
        mockUseAppDispatch.mockClear();
        mockUseAppSelector.mockClear();
        mockDispatch.mockClear();
    });

    it('Should fetch Suppliers from the Store and display Empty Message', () => {
        setupInitialState([], 0, 'idle', null);
        setupComponent();

        expect(mockDispatch).toHaveBeenCalledWith(fetchSuppliers({
            pageNumber: 0,
        }));

        expect(screen.getByText(/.*No hay proveedores disponibles.*/)).toBeInTheDocument();
        expect(screen.getByText(/.*Agregar Proveedor.*/)).toBeInTheDocument();
    });

    it('Should display the Providers from the State', async () => {
        const expectedSupplier: Supplier = buildRandomSupplier();

        setupInitialState([expectedSupplier], 1, 'idle', null);

        setupComponent();

        expect(screen.getByText(expectedSupplier.name)).toBeInTheDocument();
        expect(screen.getByText(/Agregar Proveedor/g)).toBeInTheDocument();
        expect(screen.getByText(/Exportar Lista de Proveedores/g)).toBeInTheDocument();
    });

    it('Should display error messa from the State', () => {
        const expectedErrorMessage = 'ErrorMessageFromServer';
        setupInitialState([], 0, 'idle', expectedErrorMessage);

        setupComponent();

        expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
    });

});