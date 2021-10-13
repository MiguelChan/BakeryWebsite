import { AccountType } from './AccountType';
import { SubAccount } from './SubAccount';

/**
 * Defines the levels for an Account.
 */
export interface Account {
  id: string;
  title: string;
  accountType: AccountType;
  subAccounts: SubAccount[];
}
