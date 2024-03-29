import React from 'react';
import {
  Account,
} from '@mgl/shared-components';
import {
  Table,
  TableBody,
  TableHead,
} from '@mui/material';
import {
  AccountRow,
  AccountsTableHeader,
  OnAccountClickedListener,
} from '../../Blocks';

export interface AccountsTableProps {
  accounts: Account[];
  onAccountClickedListener?: OnAccountClickedListener;
}

/**
 * Defines the Accounts Table.
 *
 * @param {Account[]} accounts The accounts to display.
 *
 * @returns The accounts component.
 */
export const AccountsTable: React.FunctionComponent<AccountsTableProps> = ({
  accounts,
  onAccountClickedListener,
}) => {
  const renderRows = (): React.ReactElement[] => (
    accounts.map((currentAccount: Account) => (
      <AccountRow
        account={currentAccount}
        key={currentAccount.id}
        onAccountClickedListener={onAccountClickedListener}
      />
    ))
  );

  return (
    <Table stickyHeader>
      <TableHead>
        <AccountsTableHeader />
      </TableHead>
      <TableBody>
        {renderRows()}
      </TableBody>
    </Table>
  );
};
