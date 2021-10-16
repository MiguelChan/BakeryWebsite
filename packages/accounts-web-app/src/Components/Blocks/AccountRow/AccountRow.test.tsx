import React from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react';
import {
  Account,
  AccountType,
} from '@mgl/shared-components';
import { Table } from '@mui/material';
import { AccountRow } from './AccountRow';

describe('AccountRow', () => {
  function setupComponent(account: Account): RenderResult {
    return render(
      <Table>
        <tbody>
          <AccountRow account={account} />
        </tbody>
      </Table>,
    );
  }

  it('Should display the AccountInformation', () => {
    const fakeAccount: Account = {
      accountType: AccountType.Expenses,
      id: 'ThisIsAnId',
      subAccounts: [],
      title: 'This is an account',
    };

    const result = setupComponent(fakeAccount);

    expect(result.container).toMatchSnapshot();
  });
});
