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
} from '../../Hooks';

export interface ApplicationContext {
  useGetAccounts: () => UseGetAccountsState;
  useCreateAccount: () => UseCreateAccountState;
}

export const AccountsAppContext = React.createContext<ApplicationContext>({
  useGetAccounts: (): UseGetAccountsState => useGetAccounts(accountsClient.getAccounts),
  useCreateAccount: (): UseCreateAccountState => useCreateAccount(accountsClient.createAccount),
});
