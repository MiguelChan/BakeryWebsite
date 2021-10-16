import React from 'react';
import {
  Account,
} from '@mgl/shared-components';
import {
  TableCell,
  TableRow,
} from '@mui/material';

export interface AccountRowProps {
  account: Account;
}

/**
 * Defines a row that is meant to be used to displaying an {Account}.
 *
 * @param {Account} account The account to use.
 *
 * @returns
 */
export const AccountRow: React.FunctionComponent<AccountRowProps> = ({
  account,
}) => {
  const {
    accountType,
    id,
    title,
  } = account;

  return (
    <TableRow>
      <TableCell>
        {id}
      </TableCell>
      <TableCell>
        {title}
      </TableCell>
      <TableCell>
        {accountType}
      </TableCell>
    </TableRow>
  );
};
