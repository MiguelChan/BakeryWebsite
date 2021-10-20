import {
  Account,
} from '../../models';

/**
 * DTO for editting an Account.
 */
export interface PutAccountRequest {
  updatedAccount: Account;
  updatingUser: string;
}
