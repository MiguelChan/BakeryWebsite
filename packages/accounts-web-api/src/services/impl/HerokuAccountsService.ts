import {
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
