import React from 'react';
import {
  Account,
} from '@mgl/shared-components';
import {
  TableCell,
  TableRow,
} from '@mui/material';

export type OnAccountClickedListener = (account: Account) => void;

export interface AccountRowProps {
  account: Account;
  onAccountClickedListener?: OnAccountClickedListener;
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
  onAccountClickedListener,
}) => {
  const {
    accountType,
    id,
    title,
  } = account;

  const handleClick = (): void => {
    if (onAccountClickedListener) {
      onAccountClickedListener(account);
    }
  };

  return (
    <TableRow
      onClick={handleClick}
      hover
    >
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
