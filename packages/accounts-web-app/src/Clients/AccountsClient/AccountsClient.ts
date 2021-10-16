import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountsResponse,
} from '@mgl/shared-components';
import axios, { AxiosResponse } from 'axios';

/**
 * AccountsClient.
 */
class AccountsClient {
  private readonly ACCOUNTS_URL = '/api/accounts';

  constructor() {
    this.getAccounts = this.getAccounts.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  /**
   * Gets the Accounts from the Server.
   * @returns .
   */
  public getAccounts(): Promise<GetAccountsResponse> {
    return new Promise<GetAccountsResponse>((accept, reject) => {
      axios.get(this.ACCOUNTS_URL).then((response: AxiosResponse<GetAccountsResponse>) => {
        accept(response.data);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  /**
   * Creates an Account in the Service.
   *
   * @param {CreateAccountRequest} createAccountRequest .
   *
   * @return The Promise.
   */
  public createAccount(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
    return new Promise<CreateAccountResponse>((accept, reject) => {
      axios.post(this.ACCOUNTS_URL, createAccountRequest)
        .then((response: AxiosResponse<CreateAccountResponse>) => {
          accept(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export const accountsClient = new AccountsClient();
