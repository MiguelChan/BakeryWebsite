import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountResponse,
  GetAccountResponse,
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
    this.getAccount = this.getAccount.bind(this);
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

  /**
   * Gets the Account from the Service.
   *
   * @param {string} accountId The account id.
   * @returns The promise.
   */
  public getAccount(accountId: string): Promise<GetAccountResponse> {
    return new Promise<GetAccountResponse>((accept, reject) => {
      const url = `${this.ACCOUNTS_URL}/${accountId}`;
      axios.get(url).then((response: AxiosResponse) => {
        accept(response.data);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  /**
   * Deletes an Account from the Service.
   * 
   * @param accountId .
   * @returns .
   */
  public deleteAccount(accountId: string): Promise<DeleteAccountResponse> {
    return new Promise<DeleteAccountResponse>((accept, reject) => {
      const url = `${this.ACCOUNTS_URL}/${accountId}`;
      axios.delete(url).then((response: AxiosResponse<DeleteAccountResponse>) => {
        accept(response.data);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}

export const accountsClient = new AccountsClient();
