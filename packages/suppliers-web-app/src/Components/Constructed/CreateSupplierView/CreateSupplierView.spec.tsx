import React from 'react';
import { CreateSupplierView } from "./CreateSupplierView";
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import { 
    NAME_TEST_ID,
    PHONE_NUMBER_TEST_ID,
} from "../../Composites";
import { suppliersClient } from "../../../Clients";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

jest.mock('../../../Clients');

describe('CreateSupplierView', () => {

    const mockCreateSupplierFn = suppliersClient.createSupplier as jest.Mock;
    const memoryHistory = createMemoryHistory();

    it('Should call the suppliersClient when a create is requested', () => {
        mockCreateSupplierFn.mockResolvedValue({});

        setupComponent();
        setupSupplier();

        return waitFor(() => {
            expect(mockCreateSupplierFn).toHaveBeenCalled();
            expect(memoryHistory.location.pathname).toBe('/suppliers');
        });
    });

    it('Should display error message upon suppliersClient failure', () => {
        const expectedErrorMessage = 'SomeRandomErrorMessage';
        mockCreateSupplierFn.mockRejectedValue({
            errorMessage: expectedErrorMessage,
        });

        setupComponent();
        setupSupplier();

        return waitFor(() => {
            expect(mockCreateSupplierFn).toHaveBeenCalled();
            expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
        });
    });

    function typeValue(testId: string, valueToType: string) {
        const inputElement = screen.getByTestId(testId).querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: valueToType } });
    }

    function setupSupplier() {
        typeValue(NAME_TEST_ID, 'SomeRandomName');
        typeValue(PHONE_NUMBER_TEST_ID, 'SomeRandomPhoneNumber');

        fireEvent.click(screen.getByText('Crear Proveedor'));
        expect(screen.getByText(/.*Contactos no agregados.*/)).toBeInTheDocument();
        fireEvent.click(screen.getByText('Aceptar'));
    }

    function setupComponent() {
        render(
            <Router history={memoryHistory}>
                <CreateSupplierView />
            </Router>
        );
    }
});