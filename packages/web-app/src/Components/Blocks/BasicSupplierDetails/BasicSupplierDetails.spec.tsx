import {
    render,
    screen,
} from '@testing-library/react';
import { 
    Supplier,
} from '../../../Models';
import { 
    BasicSupplierDetails,
} from './BasicSupplierDetails';

describe('BasicSupplierDetails', () => {

    function setupRandomSupplier(): Supplier {
        return {
            lineAddress1: 'AddressLine1',
            lineAddress2: 'AddressLine2',
            contacts: [],
            id: '',
            name: 'Name',
            phoneNumber: 'PhoneNumber',
        };
    }

    it('Should display the Supplier information', () => {
        const supplier: Supplier = setupRandomSupplier();
        setupComponent(supplier);

        expect(screen.getByDisplayValue(supplier.lineAddress1)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.lineAddress2)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.phoneNumber)).toBeInTheDocument();
    })


    function setupComponent(supplier: Supplier) {
        render(
            <BasicSupplierDetails supplier={supplier} />
        );
    }
});