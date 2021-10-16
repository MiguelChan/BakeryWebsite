import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountType } from '@mgl/shared-components';
import {
  AccountsTable,
  AccountsTableProps,
} from './AccountsTable';

export default {
  title: 'Components/Composites/AccountsTable',
  component: AccountsTable,
} as Meta;

const Template: Story<AccountsTableProps> = (args) => <AccountsTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  accounts: [
    {
      accountType: AccountType.Expenses,
      id: 'AnId',
      subAccounts: [],
      title: 'This is a title 1',
    },
    {
      accountType: AccountType.Capital,
      id: 'AnId2',
      subAccounts: [],
      title: 'This is a title 2',
    },
    {
      accountType: AccountType.Entry,
      id: 'AnId3',
      subAccounts: [],
      title: 'This is a title 3',
    },
  ],
};
