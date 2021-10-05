import { 
    Paper, 
    Table, 
    TableBody, 
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { 
    Supplier,
} from '../../../Models';
import { 
    OnSupplierClickedListener, 
    SuppliersTableHeader, 
    SuppliersTableRow,
} from '../../Blocks';

export type OnPageChangedListener = (currentPage: number, nextPage: number) => void;

interface Properties {
    suppliers: Supplier[];
    onSupplierClickedListener: OnSupplierClickedListener;
    onPageChangedListener: OnPageChangedListener;
    totalSuppliers: number;
    currentPage: number;
}

/**
 * Defines the Supplier Table.
 * @param suppliers The suppliers to display.
 * @param onSupplierClickedListener Called whenever a supplier is clicked.
 */
export const SuppliersTable: React.FunctionComponent<Properties> = ({
    suppliers,
    totalSuppliers,
    currentPage,
    onSupplierClickedListener,
    onPageChangedListener,
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

    if (totalSuppliers === 0) {
        return (
            <Paper>
                <Typography variant='body2'>No hay proveedores disponibles. Favor de crear uno.</Typography>
            </Paper>
        );
    }

    function internalOnPageChangedListener(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
        onPageChangedListener(currentPage, newPage);
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label='suppliers table'>
                <SuppliersTableHeader />
                <TableBody>
                    {renderSuppliers()}
                </TableBody>
                <TableFooter>
                    {totalSuppliers >= 50 &&
                        <TableRow>
                            <TablePagination
                                count={totalSuppliers} 
                                rowsPerPageOptions={[50]}
                                rowsPerPage={50}
                                page={currentPage}
                                onPageChange={internalOnPageChangedListener}
                            />
                        </TableRow>
                    }
                </TableFooter>
            </Table>
        </TableContainer>
    );

};