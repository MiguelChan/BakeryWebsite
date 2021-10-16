import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { Table } from '@mui/material';
import {
  Account,
  AccountType,
} from '@mgl/shared-components';
import {
  AccountRow,
  AccountRowProps,
} from './AccountRow';

export default {
  title: 'Components/Blocks/AccountRow',
  component: AccountRow,
  decorators: [
    (Story) => (
      <Table>
        <tbody>
          <Story />
        </tbody>
      </Table>
    ),
  ],
} as Meta;

const Template: Story<AccountRowProps> = (args) => <AccountRow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  account: {
    accountType: AccountType.Expenses,
    id: 'ThisIsAnId',
    subAccounts: [],
    title: 'Cuenta de gastos',
  } as Account,
};
