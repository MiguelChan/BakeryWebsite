import React from 'react';
import { accountsClient, GetAccountsApiFn } from '../../Clients';
import { useGetAccounts, UseGetAccountsState } from '../../Hooks';

export interface ApplicationContext {
  useGetAccounts: () => UseGetAccountsState;
}

export const AccountsAppContext = React.createContext<ApplicationContext>({
  useGetAccounts: (): UseGetAccountsState => {
    return useGetAccounts(accountsClient.getAccounts);
  },
});