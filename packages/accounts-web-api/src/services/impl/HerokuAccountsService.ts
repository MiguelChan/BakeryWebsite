import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse,
} from '@mgl/shared-components';
import {
  inject,
  injectable,
} from 'inversify';
import debug from 'debug';
import {
  Types,
} from 'utils';
import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';
import {
  AccountsService,
} from '../AccountsService';

const logger: debug.IDebugger = debug('accounts:HerokuAccountsService');

/**
 * Heroku implementation of the Accounts Service.
 */
@injectable()
export class HerokuAccountsService implements AccountsService {
  constructor(@inject(Types.AccountsServiceUrl) private readonly baseUrl: string) {
    this.getAccounts = this.getAccounts.bind(this);
  }

  createAccount(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
    logger('Attempting to create Account with Params: %j', createAccountRequest);

    return new Promise<CreateAccountResponse>((accept, reject) => {
      const fullUrl = `${this.baseUrl}/accounts`;
      logger('Attempting to call: %s', fullUrl);

      axios.post(fullUrl, createAccountRequest).then((response: AxiosResponse<CreateAccountResponse>) => {
        logger('Got a Response: %j', response);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got an error: %s', error.message);
        reject(error);
      });
    });
  }

  getAccounts(getAccountsRequest: GetAccountsRequest): Promise<GetAccountsResponse> {
    logger('Attempting to fetch Accounts with Params: %j', getAccountsRequest);

    return new Promise<GetAccountsResponse>((accept, reject) => {
      const fullUrl = `${this.baseUrl}/accounts`;
      logger('Attempting to call: %s', fullUrl);

      axios.get(fullUrl)
        .then((response: AxiosResponse<GetAccountsResponse>) => {
          logger('Got a Response: %j', response);
          accept(response.data);
        })
        .catch((error: AxiosError) => {
          logger('Got an error: %j', error);
          reject(error);
        });
    });
  }
}
