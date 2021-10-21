import React from 'react';
import {
  Account,
  PutAccountRequest,
  PutAccountResponse,
} from '@mgl/shared-components';
import { PutAccountApiFn } from '../../Clients';

export interface UseEditAccountState {
  isLoading: boolean;
  errorMessage?: string;
  submitEditAccount: (account: Account) => void;
  isAccountEdited: boolean;
}

export type UseEditAccount = (putAccountApiFn: PutAccountApiFn) => UseEditAccountState;

/**
 * React CustomHook to be used when putting/editting an Acount.
 *
 * @param putAccountApiFn .
 * @returns .
 */
export function useEditAccount(putAccountApiFn: PutAccountApiFn): UseEditAccountState {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [accountToEdit, setAccountToEdit] = React.useState<Account>();
  const [isAccountEdited, setAccountEdited] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLoading) {
      return;
    }

    const subAccounts = accountToEdit.subAccounts || [];
    const curatedSubAccounts = subAccounts.map((currentSubAccount) => {
      if (!currentSubAccount.id.startsWith('sbacct')) {
        return {
          ...currentSubAccount,
          id: null,
        };
      }
      return currentSubAccount;
    });

    const curatedAccount: Account = {
      ...accountToEdit,
      subAccounts: curatedSubAccounts,
    };

    const putAccountRequest: PutAccountRequest = {
      updatedAccount: curatedAccount,
      updatingUser: 'system',
    };

    putAccountApiFn(putAccountRequest).then((response: PutAccountResponse) => {
      setAccountEdited(response.success);
    }).catch((error: any) => {
      setAccountEdited(false);
      setErrorMessage(error.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, accountToEdit]);

  const submitEditAccount = (account: Account): void => {
    setAccountToEdit(account);
    setIsLoading(true);
  };

  return {
    isAccountEdited,
    isLoading,
    submitEditAccount,
    errorMessage,
  };
}
