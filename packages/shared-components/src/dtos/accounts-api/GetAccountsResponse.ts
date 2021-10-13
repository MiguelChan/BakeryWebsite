import { Account } from '../../models/accounts-api/Account';

/**
 * DTO that represents the response of fetching the Accounts.
 */
export interface GetAccountsResponse {
  accounts: Account[];
}
