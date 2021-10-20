import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteSubAccountRequest,
  DeleteSubAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse,
  PutAccountRequest,
  PutAccountResponse,
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
    this.createAccount = this.createAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
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

  getAccount(getAccountRequest: GetAccountRequest): Promise<GetAccountResponse> {
    logger('Attempting to Fetch Account with Params: %j', getAccountRequest);

    return new Promise<GetAccountResponse>((accept, reject) => {
      const {
        accountId,
      } = getAccountRequest;
      const fullUrl = `${this.baseUrl}/accounts/${accountId}`;

      axios.get(fullUrl).then((response: AxiosResponse<GetAccountResponse>) => {
        logger('Got response: %j', response.data);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got an error: %s', error.message);
        reject(error);
      });
    });
  }

  deleteAccount(deleteAccountRequest: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    logger('Attempting to delete Account with Params: %j', deleteAccountRequest);
    return new Promise<DeleteAccountResponse>((accept, reject) => {
      const {
        accountId,
      } = deleteAccountRequest;
      const fullUrl = `${this.baseUrl}/accounts/${accountId}`;

      axios.delete(fullUrl).then((response: AxiosResponse<DeleteAccountResponse>) => {
        logger('Got a response: %j', response.data);
        accept(response.data);
      }).catch((error: any) => {
        logger('Got an error: %s', error.message);
        reject(error);
      });
    });
  }

  deleteSubAccount(deleteSubAccountRequest: DeleteSubAccountRequest): Promise<DeleteSubAccountResponse> {
    logger('Attempting to delete SubAccount with Params: %j', deleteSubAccountRequest);
    return new Promise<DeleteSubAccountResponse>((accept, reject) => {
      const {
        subAccountId,
      } = deleteSubAccountRequest;
      const fullUrl = `${this.baseUrl}/subAccounts/${subAccountId}`;

      axios.delete(fullUrl).then((response: AxiosResponse<DeleteSubAccountResponse>) => {
        logger('Got a response: %j', response.data);
        accept(response.data);
      }).catch((error: any) => {
        logger('Got an error from the Service: %s', error.message);
        reject(error);
      });
    });
  }

  putAccount(putAccountRequest: PutAccountRequest): Promise<PutAccountResponse> {
    logger('Attempting to put Account with Params: %j', putAccountRequest);

    return new Promise<PutAccountResponse>((accept, reject) => {
      const fullUrl = `${this.baseUrl}/accounts`;

      axios.put(fullUrl, putAccountRequest).then((response: AxiosResponse<PutAccountResponse>) => {
        logger('Got response from the Server: %j', response.data);
        accept(response.data);
      }).catch((error: any) => {
        logger('Got an error from the Service: %s', error.message);
        reject(error);
      }).finally(() => {
        logger('Completed call to PutAccount');
      });
    });
  }
}
