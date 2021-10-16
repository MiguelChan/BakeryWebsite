import {
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';

/**
 * Defines the AccounsTable Header.
 * @returns
 */
export const AccountsTableHeader: React.FunctionComponent = () => (
  <TableRow>
    <TableCell>
      Id
    </TableCell>
    <TableCell>
      Nombre de cuenta
    </TableCell>
    <TableCell>
      Tipo de Cuenta
    </TableCell>
  </TableRow>
);
