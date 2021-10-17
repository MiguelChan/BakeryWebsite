import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { CreateAccountsPage } from './CreateAccountsPage';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import {
  UseCreateAccountState,
  UseGetAccountsState,
} from '../../../Hooks';

export default {
  title: 'Components/Pages/CreateAccountPage',
  component: CreateAccountsPage,
} as Meta;

export interface AppContext {
  appContext: ApplicationContext;
}

const Template: Story<AppContext> = ({ appContext }) => (
  <AccountsAppContext.Provider value={appContext}>
    <CreateAccountsPage />
  </AccountsAppContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({}) as any,
    useCreateAccount: (): UseCreateAccountState => ({
      isAccountCreated: false,
      isLoading: false,
      requestCreateAccount: (account: any): void => {
        console.info('Requesting Creationg of Account: %s', JSON.stringify(account));
      },
      errorMessage: undefined,
    }),
  },
};

export const Loading = Template.bind({});
Loading.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({}) as any,
    useCreateAccount: (): UseCreateAccountState => ({
      isAccountCreated: false,
      isLoading: true,
      requestCreateAccount: (account: any): void => {
        console.info('Requesting Creationg of Account: %s', JSON.stringify(account));
      },
      errorMessage: undefined,
    }),
  },
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({}) as any,
    useCreateAccount: (): UseCreateAccountState => ({
      isAccountCreated: false,
      isLoading: false,
      requestCreateAccount: (account: any): void => {
        console.info('Requesting Creationg of Account: %s', JSON.stringify(account));
      },
      errorMessage: 'El sistema se ha caido y ya no funciona',
    }),
  },
};

export const WithSuccessfulCreation = Template.bind({});
WithSuccessfulCreation.args = {
  appContext: {
    useGetAccounts: (): UseGetAccountsState => ({}) as any,
    useCreateAccount: (): UseCreateAccountState => ({
      isAccountCreated: true,
      isLoading: false,
      requestCreateAccount: (account: any): void => {
        console.info('Requesting Creationg of Account: %s', JSON.stringify(account));
      },
      errorMessage: undefined,
    }),
  },
};
