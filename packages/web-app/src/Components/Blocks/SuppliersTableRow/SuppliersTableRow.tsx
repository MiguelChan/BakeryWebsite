import * as React from 'react';
import { 
    TableCell, 
    TableRow,
} from '@material-ui/core';
import { 
    Supplier,
} from '../../../Models';

export type OnSupplierClickedListener = (supplier: Supplier) => void;

interface Properties {
    supplier: Supplier;
    onSupplierClickedListener: OnSupplierClickedListener;
}

/**
 * Defines a TableRow that holds a Supplier.
 * @param {Supplier} supplier The supplier to display data for.
 */
export const SuppliersTableRow: React.FunctionComponent<Properties> = ({
    supplier,
    onSupplierClickedListener,
}) => {

    /**
     * Formats the address.
     * @param supplier .
     * @returns .
     */
    function formatAddress(supplier: Supplier): string {
        return `${supplier.addressLine1} ${supplier.addressLine2}`;
    }

    return (
        <TableRow hover onClick={() => onSupplierClickedListener(supplier)}>
            <TableCell>{supplier.name}</TableCell>
            <TableCell>{formatAddress(supplier)}</TableCell>
            <TableCell>{supplier.contacts.length}</TableCell>
        </TableRow>
    );
};