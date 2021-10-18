import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteSubAccountRequest,
  DeleteSubAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
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

  /**
   * Gets the Account from the Service.
   *
   * @param {GetAccountRequest} getAccountRequest The request for fetching the Account.
   *
   * @returns {GetAccountResponse} The response.
   */
  getAccount(getAccountRequest: GetAccountRequest): Promise<GetAccountResponse>;

  /**
   * Deletes an account from the Service.
   * @param {DeleteAccountRequest} deleteAccountRequest The request for deletting the account.
   *
   * @returns {DeleteAccountResponse} The response.
   */
  deleteAccount(deleteAccountRequest: DeleteAccountRequest): Promise<DeleteAccountResponse>;

  /**
   * Deletes a single {SubAccount} from the Service.
   *
   * @param {DeleteSubAccountRequest} deleteSubAccountRequest The request.
   *
   * @returns {DeleteSubAccountResponse} The response.
   */
  deleteSubAccount(deleteSubAccountRequest: DeleteSubAccountRequest): Promise<DeleteSubAccountResponse>;
}
