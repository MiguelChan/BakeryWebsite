import {
  Account,
} from '../../models';

/**
 * Defines the request for creating An Account.
 */
export interface CreateAccountRequest {
  requestingUser: string;
  account: Account;
}
