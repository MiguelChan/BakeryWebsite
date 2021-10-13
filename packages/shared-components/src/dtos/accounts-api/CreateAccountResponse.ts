/**
 * Defines the Response for creating an Account.
 */
export interface CreateAccountResponse {
  success: boolean;
  accountId: string | null;
  message: string | null;
}
