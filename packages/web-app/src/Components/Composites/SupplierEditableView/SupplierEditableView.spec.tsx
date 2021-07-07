import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    OnEditSupplierClickedListener,
    SupplierEditableView,
} from './SupplierEditableView';
import { NAME_TEST_ID, PHONE_NUMBER_TEST_ID } from '..';
import { Supplier } from '../../../Models';

describe('SupplierEditableView', () => {

    const mockOnEditSupplierClickListener = jest.fn();

    afterEach(() => {
        mockOnEditSupplierClickListener.mockClear();
    });

    it('Should display the sections for Editable Views', () => {
        setupComponent(mockOnEditSupplierClickListener);

        screen.getByText(/Nombre de Proveedor/i);
        screen.getByText(/Nombre completo/i);
        // screen.getByText(/Agregar Nuevo Contacto/i);
        screen.getByText(/Crear Proveedor/);
    });

    it('Should not create a Supplier when either the name or phone numbers are missing', () => {
        setupComponent(mockOnEditSupplierClickListener);
        fireEvent.click(screen.getByText('Crear Proveedor'));

        expect(screen.getByText(/.*Atributos Requeridos.*/)).toBeInTheDocument();
        expect(mockOnEditSupplierClickListener).not.toHaveBeenCalled();
    });

    it('Should show contacts missing dialog when no contacts are added', () => {
        setupComponent(mockOnEditSupplierClickListener);
        typeValue(NAME_TEST_ID, 'SomeRandomName');
        typeValue(PHONE_NUMBER_TEST_ID, 'SomeRandomPhoneNumber');

        fireEvent.click(screen.getByText('Crear Proveedor'));

        expect(screen.getByText(/.*Contactos no agregados.*/)).toBeInTheDocument();
        expect(mockOnEditSupplierClickListener).not.toHaveBeenCalled();
    });

    it('Should call the onEditSupplierClickListener', () => {
        setupComponent(mockOnEditSupplierClickListener);
        typeValue(NAME_TEST_ID, 'SomeRandomName');
        typeValue(PHONE_NUMBER_TEST_ID, 'SomeRandomPhoneNumber');

        fireEvent.click(screen.getByText('Crear Proveedor'));
        expect(screen.getByText(/.*Contactos no agregados.*/)).toBeInTheDocument();
        fireEvent.click(screen.getByText('Aceptar'));

        const expectedSupplier: Supplier = {
            lineAddress1: '',
            lineAddress2: '',
            contacts: [],
            id: '',
            name: 'SomeRandomName',
            phoneNumber: 'SomeRandomPhoneNumber',
        };

        expect(mockOnEditSupplierClickListener).toHaveBeenCalledWith(expectedSupplier, []);
    });

    it('Should display the error message when provided', () => {
        const errorMessage = 'Something went really wrong. Sorry';
        setupComponent(mockOnEditSupplierClickListener, errorMessage);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    function typeValue(testId: string, valueToType: string) {
        const inputElement = screen.getByTestId(testId).querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: valueToType } });
    }

    function setupComponent(onEditSupplierClickListener: OnEditSupplierClickedListener, errorMessage?: string) {
        render(
            <SupplierEditableView 
                isPerformingAsyncOperation={false}
                onEditSupplierClickedListener={onEditSupplierClickListener}
                errorMessage={errorMessage}
            />
        );
    }
});