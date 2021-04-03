import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import { suppliersClient } from '../../../Clients';
import { Supplier } from '../../../Models';
import { EditSupplierView } from './EditSupplierView';

jest.mock('../../../Clients');

describe('EditSupplierView', () => {

    const memoryHistory = createMemoryHistory();

    const getSupplierMockFn = suppliersClient.getSupplier as jest.Mock;
    const putSupplierMockFn = suppliersClient.editSupplier as jest.Mock;

    function buildRandomSupplier(): Supplier {
        return {
            addressLine1: 'supplierAddressLine1',
            addressLine2: 'supplierAddressLine2',
            contacts: [],
            id: 'supplierId',
            name: 'supplierName',
            phoneNumber: 'supplierPhoneNumber',
        };
    }

    it('Should call the suppliersClient when the Supplier is not in the location state', () => {
        const expectedSupplier: Supplier = buildRandomSupplier();
        const testSupplierId = expectedSupplier.id;

        getSupplierMockFn.mockResolvedValue({
            supplier: expectedSupplier,
        });

        setupComponent({ state: undefined }, { params: { supplierId: testSupplierId } });

        return waitFor(() => expect(getSupplierMockFn).toHaveBeenCalledWith(testSupplierId));
    });

    it('Should get the Supplier from the location state when provided', () => {
        const expectedSupplier: Supplier = buildRandomSupplier();
        
        memoryHistory.push({
            state: expectedSupplier,
            pathname: '/suppliers/1234/edit', 
        });

        setupComponent({}, { params: {} });

        return waitFor(() => expect(getSupplierMockFn).not.toHaveBeenCalled());
    });

    it('Should call the APIClient when an Edit is requested', () => {
        const supplier: Supplier = buildRandomSupplier();

        putSupplierMockFn.mockResolvedValue({});
        getSupplierMockFn.mockResolvedValue(supplier);

        memoryHistory.push({
            state: supplier,
            pathname: '/suppliers/1234/edit',
        });

        setupComponent({ state: supplier }, { params: { supplierId: '12345' }});

        fireEvent.click(screen.getByText('Editar proveedor'));
        fireEvent.click(screen.getByText('Aceptar'));

        return waitFor(() => {
            expect(putSupplierMockFn).toHaveBeenCalledWith(supplier, []);
        });
    });

    it('Should show error message when server fails', () => {
        const expectedErrorMessage = 'ErrorOccurred';
        const expectedSupplier: Supplier = buildRandomSupplier();

        getSupplierMockFn.mockResolvedValue(expectedSupplier);
        putSupplierMockFn.mockRejectedValue({errorMessage: expectedErrorMessage});
        
        memoryHistory.push({
            state: expectedSupplier,
            pathname: '/suppliers/1234/edit', 
        });

        setupComponent({}, { params: {} });

        fireEvent.click(screen.getByText('Editar proveedor'));
        fireEvent.click(screen.getByText('Aceptar'));

        return waitFor(() => {
            expect(putSupplierMockFn).toHaveBeenCalledWith(expectedSupplier, []);
            expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
        });
    });

    function setupComponent(location: any, match: any) {
        render(
            <Router history={memoryHistory}>
                <EditSupplierView 
                    history={memoryHistory} 
                    location={location}
                    match={match}
                />
            </Router>
        );
    }
});