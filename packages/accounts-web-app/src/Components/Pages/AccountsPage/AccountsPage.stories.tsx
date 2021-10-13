import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  AccountsPage, 
  AccountsPageProps,
} from './AccountsPage';
import { 
  UseGetAccountsState,
 } from '../../../Hooks';
import { 
  AccountType,
} from '@mgl/shared-components';

export default {
  title: 'Components/Pages/AccountsPage',
  component: AccountsPage,
} as Meta;

const Template: Story<AccountsPageProps> = (args) => <AccountsPage {...args} />;

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({
      accounts: [],
      isLoading: false,
      errorMessage: undefined,
    }),
  },
};

export const LoadingTable = Template.bind({});
LoadingTable.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({
      accounts: [],
      isLoading: true,
    }),
  },
};

export const WithData = Template.bind({});
WithData.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({
      accounts: [
        {
          accountType: AccountType.Entry,
          id: 'SomeId',
          subAccounts: [],
          title: 'Some Title',
        },
      ],
      isLoading: false,
    }),
  },
};