import {
  SubAccount,
} from '../../models';

/**
 * DTO that is replied when an SubAccount is deleted.
 */
export interface DeleteSubAccountResponse {
  deletedSubAccount: SubAccount;
  success: boolean;
  message?: string;
}
