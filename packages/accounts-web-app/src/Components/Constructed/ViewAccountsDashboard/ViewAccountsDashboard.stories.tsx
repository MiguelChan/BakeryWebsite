import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountType } from '@mgl/shared-components';
import {
  ViewAccountsDashboard,
  ViewAccountsDashboardProps,
} from './ViewAccountsDashboard';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { UseGetAccountsState } from '../../../Hooks';

export default {
  title: 'Components/Constructed/ViewAccountsDashboard',
  component: ViewAccountsDashboard,
} as Meta;

const Template: Story<ViewAccountsDashboardProps & ApplicationContext> = (props) => (
  <AccountsAppContext.Provider value={{ ...props }}>
    <ViewAccountsDashboard />
  </AccountsAppContext.Provider>
);

export const LoadingTable = Template.bind({});
LoadingTable.args = {
  useGetAccounts: (): UseGetAccountsState => ({
    accounts: [],
    isLoading: true,
  }),
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  useGetAccounts: (): UseGetAccountsState => ({
    accounts: [],
    isLoading: false,
  }),
};

export const WithData = Template.bind({});
WithData.args = {
  useGetAccounts: (): UseGetAccountsState => ({
    accounts: [
      {
        accountType: AccountType.Entry,
        id: 'SomeIdSOmeId',
        subAccounts: [],
        title: 'Una cuenta',
      },
    ],
    isLoading: false,
  }),
};

export const WithErrorMessages = Template.bind({});
WithErrorMessages.args = {
  useGetAccounts: (): UseGetAccountsState => ({
    accounts: [],
    isLoading: false,
    errorMessage: 'Something went wrong',
  }),
};
