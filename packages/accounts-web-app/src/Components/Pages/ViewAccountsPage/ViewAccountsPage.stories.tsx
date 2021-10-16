import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountType } from '@mgl/shared-components';
import { ViewAccountsPage } from './ViewAccountsPage';
import { UseGetAccountsState } from '../../../Hooks';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { ViewAccountsDashboard } from '../../Constructed';

export default {
  title: 'Components/Pages/ViewAccountsPage',
  component: ViewAccountsPage,
} as Meta;

interface Context {
  appContext: ApplicationContext;
}

const Template: Story<Context> = ({ appContext }) => (
  <AccountsAppContext.Provider value={appContext}>
    <ViewAccountsPage />
  </AccountsAppContext.Provider>
);

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
