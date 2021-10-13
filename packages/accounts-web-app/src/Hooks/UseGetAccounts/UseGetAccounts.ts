import { GetAccountsResponse } from '@mgl/shared-components';
import React from 'react';
import { accountsClient, GetAccountsApiFn } from '../../Clients';
import {
  Account,
} from '@mgl/shared-components';

export interface UseGetAccountsState {
  accounts: Account[];
  isLoading: boolean;
  errorMessage?: string;
}

export type UseGetAccounts = (
  getAccountsApiFn: GetAccountsApiFn,
) => UseGetAccountsState;

/**
 * Hook for fetching the AccountsInformation.
 * 
 * @param {GetAccountsApiFn} getAccountsApiFn .
 * 
 * @returns .
 */
export function useGetAccounts(getAccountsApiFn: GetAccountsApiFn): UseGetAccountsState { 

  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  React.useEffect(() => {
    setIsLoading(true);
    getAccountsApiFn()
    .then((response: GetAccountsResponse) => {
      setAccounts(response.accounts);
    })
    .catch((error: any) => {
      setErrorMessage(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return {
    accounts,
    isLoading,
    errorMessage,
  }
};