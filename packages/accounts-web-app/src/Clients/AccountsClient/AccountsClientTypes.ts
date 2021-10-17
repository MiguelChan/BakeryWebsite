import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountResponse,
  GetAccountsResponse,
} from '@mgl/shared-components';

/**
 * Defines the Method signature of the "GetAccounts" API.
 */
export type GetAccountsApiFn = () => Promise<GetAccountsResponse>;

/**
 * Defines the method signature of the "CreateAccount" API.
 */
export type CreateAccountApiFn = (createAccountRequest: CreateAccountRequest) => Promise<CreateAccountResponse>;

/**
 * Defines the method signature of the "GetAccount" API.
 */
export type GetAccountApiFn = (accountId: string) => Promise<GetAccountResponse>;
