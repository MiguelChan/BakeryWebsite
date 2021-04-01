import {
    GetSuppliersResponse,
    suppliersClient,
} from '../../../Clients/SuppliersClient';
import { Supplier } from '../../../Models';
import {
    render,
    screen,
    waitFor
} from '@testing-library/react';
import { ViewSuppliers } from './ViewSuppliers';
jest.mock('../../../Clients/SuppliersClient');

describe('ViewSuppliers', () => {

    const mockGetSuppliersFn = suppliersClient.getSuppliers as jest.Mock;

    function buildSuppliersResponse(suppliers: Supplier[] = [], totalElements: number = 0, errorMessage?: string): GetSuppliersResponse {
        return {
            suppliers: suppliers,
            totalElements: totalElements,
            errorMessage: errorMessage,
        };
    }

    function setupComponent() {
        render(
            <ViewSuppliers />
        );
    }

    it('Should display empty message when no Suppliers exist', async () => {
        const suppliersResponse = buildSuppliersResponse();
        mockGetSuppliersFn.mockResolvedValue(suppliersResponse);

        setupComponent();
        await waitFor(() => expect(mockGetSuppliersFn).toHaveBeenCalledTimes(1));

        expect(screen.getByText(/.*No hay proveedores disponibles.*/)).toBeInTheDocument();
    });

    it('Should display the Add Provider button', async () => {
        const suppliersResponse = buildSuppliersResponse();
        mockGetSuppliersFn.mockResolvedValue(suppliersResponse);

        setupComponent();
        await waitFor(() => expect(mockGetSuppliersFn).toHaveBeenCalledTimes(1));

        expect(screen.getByText(/Agregar Proveedor/g)).toBeInTheDocument();
        expect(screen.getByText(/Exportar Lista de Proveedores/g)).toBeInTheDocument();
    });

});