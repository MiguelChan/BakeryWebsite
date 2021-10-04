import {
    screen,
    render,
    waitFor,
} from '@testing-library/react';
import { Router,
Route } from 'react-router-dom';
import { SupplierDetailView } from './SupplierDetailView';
import { createMemoryHistory,
MemoryHistory } from 'history'
import React from 'react';
import { GetSupplierResponse,
suppliersClient } from '../../../Clients';
import { Supplier } from '../../../Models';

jest.mock('../../../Clients/SuppliersClient')

describe('SupplierDetailView', () => {

    const getSupplierMockFn = suppliersClient.getSupplier as jest.Mock;

    let memoryHistory: MemoryHistory;

    beforeEach(() => {
        memoryHistory = createMemoryHistory();
    });

    function buildRandomSupplier(): Supplier {
        return {
            contacts: [],
            id: '',
            name: '',
            phoneNumber: '',
            lineAddress1: '',
            lineAddress2: '',
        };
    }

    function buildGetSupplierResponse(supplier: Supplier): GetSupplierResponse {
        return {
            supplier: supplier,
        };
    }

    it('Should call the suppliersClient when a fresh request is made', () => {
        const supplier = buildRandomSupplier();
        const getSupplierResponse = buildGetSupplierResponse(supplier);

        getSupplierMockFn.mockResolvedValue(getSupplierResponse);
        const testSupplierId = '12345';
        setupComponent(testSupplierId, { state: undefined }, { params: { supplierId: testSupplierId } });

        return waitFor(() => expect(getSupplierMockFn).toHaveBeenCalledWith(testSupplierId));
    });

    it('Should not call the SuppliersClient when the Supplier comes from the location state', () => {
        const supplier: Supplier = buildRandomSupplier();
        memoryHistory.push({
            state: supplier,
            pathname: '/suppliers/12345',
        });

        setupComponent('12345', { state: supplier }, { params: {  } });

        return waitFor(() => expect(getSupplierMockFn).not.toHaveBeenCalled());
    });
    
    it('Should display error message from server', () => {
        const expectedErrorMessage = 'There was an error. You dead';

        getSupplierMockFn.mockRejectedValue({
            errorMessage: expectedErrorMessage,
            supplier: null,
        });

        setupComponent('12345', { state: null }, { params: { supplierId: '12345' }});

        return waitFor(() => {
            expect(getSupplierMockFn).toHaveBeenCalled();
            expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
        });
    });

    function setupComponent(supplierId: string, location: any, match: any) {
        render(
            <Router history={memoryHistory}>
                <Route>
                    <SupplierDetailView history={memoryHistory} location={location} match={match}/>
                </Route>
            </Router>
        );
    }

});