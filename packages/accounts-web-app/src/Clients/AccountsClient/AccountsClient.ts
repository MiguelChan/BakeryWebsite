import { GetAccountsResponse } from "@mgl/shared-components";
import axios, { AxiosResponse } from "axios";

/**
 * AccountsClient.
 */
class AccountsClient {

  private readonly ACCOUNTS_URL = '/api/accounts';

  constructor() {
    this.getAccounts = this.getAccounts.bind(this);
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
}

export const accountsClient = new AccountsClient();