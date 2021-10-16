import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse,
} from '@mgl/shared-components';

/**
 * Defines the interface for the AccountsService.
 */
export interface AccountsService {
  /**
   * Retrieves the Accounts from the Backend.
   *
   * @param {GetAccountsRequest} getAccountsRequest .
   *
   * @returns {GetAccountsResponse} The response.
   */
  getAccounts(getAccountsRequest: GetAccountsRequest): Promise<GetAccountsResponse>;

  /**
   * Creates the provided Account in the Backend.
   *
   * @param {CreateAccountRequest} createAccountRequest .
   *
   * @returns {CreateAccountResponse} The response.
   */
  createAccount(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse>;
}