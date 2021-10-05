import { 
    TableCell, 
    TableHead,
    TableRow,
} from '@mui/material';
import * as React from 'react';

/**
 * Defines the SuppliersTable Header.
 */
export const SuppliersTableHeader: React.FunctionComponent = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Nombre
                </TableCell>
                <TableCell>
                    Direccion
                </TableCell>
                <TableCell>
                    Numero de Contactos
                </TableCell>
            </TableRow>
        </TableHead>
    );
};