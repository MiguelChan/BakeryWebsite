import {
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
}
