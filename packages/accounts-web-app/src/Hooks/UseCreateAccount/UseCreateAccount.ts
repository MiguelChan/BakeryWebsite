import {
  CreateAccountRequest,
  Account,
  CreateAccountResponse,
} from '@mgl/shared-components';
import React from 'react';
import { CreateAccountApiFn } from '../../Clients';
import { requestCreateAccount } from '../../Utils';

export interface UseCreateAccountState {
  isLoading: boolean;
  isAccountCreated: boolean;
  errorMessage?: string;
  requestCreateAccount: requestCreateAccount;
}

export type UseCreateAccount = (createAccountApiFn: CreateAccountApiFn) => UseCreateAccountState;

/**
 * React CustomHook for Creating An {Account}.
 *
 * @param {CreateAccountApiFn} createAccountApiFn The required API Client Method.
 *
 * @returns {UseCreateAccountState} The state of this hook.
 */
export function useCreateAccount(createAccountApiFn: CreateAccountApiFn): UseCreateAccountState {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAccountCreated, setIsAccountCreated] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [accountToCreate, setAccountToCreate] = React.useState<Account>();

  React.useEffect(() => {
    if (!isLoading) {
      return;
    }

    const createAccountRequest: CreateAccountRequest = {
      account: accountToCreate!,
      requestingUser: 'TEST_USER',
    };

    createAccountApiFn(createAccountRequest)
      .then((response: CreateAccountResponse) => {
        setIsAccountCreated(response.success);
      })
      .catch((error: any) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading, accountToCreate]);

  const requestCreateAccount = (account: Account): void => {
    setAccountToCreate(account);
    setIsLoading(true);
  };

  return {
    isLoading,
    isAccountCreated,
    errorMessage,
    requestCreateAccount,
  };
}
