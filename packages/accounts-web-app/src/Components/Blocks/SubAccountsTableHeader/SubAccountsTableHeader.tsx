import {
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

/**
 * The SubAccounts Table Header.
 *
 * @returns .
 */
export const SubAccountsTableHeader: React.FunctionComponent = () => (
  <TableHead>
    <TableRow>
      <TableCell>
        Id de Subcuenta
      </TableCell>
      <TableCell>
        Nombre de subcuenta
      </TableCell>
      <TableCell>
        <></>
      </TableCell>
    </TableRow>
  </TableHead>
);
