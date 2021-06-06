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
            addressLine1: 'AddressLine1',
            addressLine2: 'AddressLine2',
            contacts: [],
            id: '',
            name: 'Name',
            phoneNumber: 'PhoneNumber',
        };
    }

    it('Should display the Supplier information', () => {
        const supplier: Supplier = setupRandomSupplier();
        setupComponent(supplier);

        expect(screen.getByDisplayValue(supplier.addressLine1)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.addressLine2)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(supplier.phoneNumber)).toBeInTheDocument();
    })


    function setupComponent(supplier: Supplier) {
        render(
            <BasicSupplierDetails supplier={supplier} />
        );
    }
});