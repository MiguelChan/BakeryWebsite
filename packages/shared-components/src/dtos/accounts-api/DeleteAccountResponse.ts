import {
  Account,
} from '../../models';

/**
 * DTO for deleting an Account.
 */
export interface DeleteAccountResponse {
  deletedAccount: Account;
  success: boolean;
  message?: string;
}
