import {
  CreateAccountRequest,
  CreateAccountResponse,
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
