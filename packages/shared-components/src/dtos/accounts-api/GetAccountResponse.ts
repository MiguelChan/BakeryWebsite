import { Account } from '../../models';

/**
 * DTO for a Single Account.
 */
export interface GetAccountResponse {
  account: Account | null;
}
