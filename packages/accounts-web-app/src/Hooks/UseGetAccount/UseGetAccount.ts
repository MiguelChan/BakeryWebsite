import React from 'react';
import {
  Account,
  GetAccountResponse,
} from '@mgl/shared-components';
import { GetAccountApiFn } from '../../Clients';

export interface UseGetAccountState {
  isLoading: boolean;
  errorMessage?: string;
  account: Account | null;
  getAccount: (accountId: string) => void;
}

export type UseGetAccount = (getAccountApiFn: GetAccountApiFn) => UseGetAccountState;

/**
 * Gets a single Account from the Backend.
 *
 * @param {GetAccountApiFn} getAccountApiFn The implementation of the get Account API.
 *
 * @returns The state.
 */
export function useGetAccount(getAccountApiFn: GetAccountApiFn): UseGetAccountState {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [account, setAccount] = React.useState<Account>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [accountId, setAccountId] = React.useState<string>();

  React.useEffect(() => {
    if (!isLoading) {
      return;
    }

    getAccountApiFn(accountId).then((response: GetAccountResponse) => {
      setAccount(response.account);
    }).catch((error: any) => {
      setErrorMessage(error.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading]);

  const requestGetAccount = (accountId: string): void => {
    setAccountId(accountId);
    setIsLoading(true);
  };

  return {
    account,
    isLoading,
    errorMessage,
    getAccount: requestGetAccount,
  };
}
