import React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import { AccountsTable, AccountsTableProps } from './AccountsTable';
import { AccountType } from '@mgl/shared-components';

describe('AccountsTable', () => {

  const setupComponent = (args: AccountsTableProps): RenderResult => (
    render(<AccountsTable {...args} />)
  );

  it('Should display the AccountsTable', () => {
    const props: AccountsTableProps = {
      accounts: [
        {
          accountType: AccountType.Expenses,
          id: 'AnId',
          subAccounts: [],
          title: 'This is a title 1'
        },
        {
          accountType: AccountType.Capital,
          id: 'AnId2',
          subAccounts: [],
          title: 'This is a title 2'
        },
        {
          accountType: AccountType.Entry,
          id: 'AnId3',
          subAccounts: [],
          title: 'This is a title 3'
        },
      ],
    };

    const component = setupComponent(props);
    expect(component.container).toMatchSnapshot();
  });
});