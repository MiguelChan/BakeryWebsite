import { 
    Paper, 
    Table, 
    TableBody, 
    TableContainer,
    Typography,
} from '@material-ui/core';
import * as React from 'react';
import { 
    Supplier,
} from '../../../Models';
import { 
    OnSupplierClickedListener, 
    SuppliersTableHeader, 
    SuppliersTableRow,
} from '../../Blocks';

interface Properties {
    suppliers: Supplier[];
    onSupplierClickedListener: OnSupplierClickedListener;
}

/**
 * Defines the Supplier Table.
 * @param suppliers The suppliers to display.
 * @param onSupplierClickedListener Called whenever a supplier is clicked.
 */
export const SuppliersTable: React.FunctionComponent<Properties> = ({
    suppliers,
    onSupplierClickedListener,
}) => {
    
    function renderSuppliers() {
        return suppliers.map((currentSupplier: Supplier) => {
            return (
                <SuppliersTableRow 
                    supplier={currentSupplier}
                    onSupplierClickedListener={onSupplierClickedListener}
                    key={currentSupplier.id}
                />
            );
        });
    }

    if (suppliers.length === 0) {
        return (
            <Paper>
                <Typography variant='body2'>No hay proveedores disponibles. Favor de crear uno.</Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label='suppliers table'>
                <SuppliersTableHeader />
                <TableBody>
                    {renderSuppliers()}
                </TableBody>
            </Table>
        </TableContainer>
    );

};