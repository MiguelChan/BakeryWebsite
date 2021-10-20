import {
  Account,
} from '../../models';

/**
 * The response used when updating an Account.
 */
export interface PutAccountResponse {
  success: boolean;
  updatedAccount: Account;
  message?: string;
}
