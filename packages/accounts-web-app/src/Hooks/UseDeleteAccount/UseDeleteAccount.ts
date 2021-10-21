import { DeleteAccountResponse } from '@mgl/shared-components';
import React from 'react';
import { DeleteAccountApiFn } from '../../Clients';

export interface UseDeleteAccountState {
  isLoading: boolean;
  isAccountDeleted: boolean;
  errorMessage?: string;
  requestDeleteAccount: (accountId: string) => void;
}

export type UseDeleteAccount = (deleteAccountApiFn: DeleteAccountApiFn) => UseDeleteAccountState;

export function useDeleteAccount(deleteAccountApiFn: DeleteAccountApiFn): UseDeleteAccountState {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [accountId, setAccountId] = React.useState<string>();
  const [isAccountDeleted, setIsAccountDeleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLoading) {
      return;
    }

    deleteAccountApiFn(accountId).then((response: DeleteAccountResponse) => {
      setIsAccountDeleted(response.success);
    }).catch((error: any) => {
      setErrorMessage(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }, [isLoading, accountId]);

  const requestDeleteAccount = (accountId: string): void => {
    setAccountId(accountId);
    setLoading(true);
  };

  return {
    isLoading,
    errorMessage,
    isAccountDeleted,
    requestDeleteAccount,
  };
}
