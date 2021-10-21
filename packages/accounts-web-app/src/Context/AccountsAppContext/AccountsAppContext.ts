import React from 'react';
import {
  accountsClient,
  GetAccountsApiFn,
} from '../../Clients';
import {
  useGetAccounts,
  useCreateAccount,
  UseGetAccountsState,
  UseCreateAccountState,
  UseGetAccountState,
  useGetAccount,
  UseEditAccountState,
  useEditAccount,
} from '../../Hooks';

export interface ApplicationContext {
  useGetAccounts: () => UseGetAccountsState;
  useCreateAccount: () => UseCreateAccountState;
  useGetAccount: () => UseGetAccountState;
  useEditAccount: () => UseEditAccountState;
}

export const AccountsAppContext = React.createContext<ApplicationContext>({
  useGetAccounts: (): UseGetAccountsState => useGetAccounts(accountsClient.getAccounts),
  useCreateAccount: (): UseCreateAccountState => useCreateAccount(accountsClient.createAccount),
  useGetAccount: (): UseGetAccountState => useGetAccount(accountsClient.getAccount),
  useEditAccount: (): UseEditAccountState => useEditAccount(accountsClient.updateAccount),
});
