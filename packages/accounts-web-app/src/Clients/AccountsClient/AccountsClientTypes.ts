import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountResponse,
  GetAccountResponse,
  GetAccountsResponse,
  PutAccountRequest,
  PutAccountResponse,
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

/**
 * Defines the Method signature of the "DeleteAccount" API.
 */
export type DeleteAccountApiFn = (accountId: string) => Promise<DeleteAccountResponse>;

/**
 * Defines the Method signature of the "PutAccount" API.
 */
export type PutAccountApiFn = (putAccountRequest: PutAccountRequest) => Promise<PutAccountResponse>;
