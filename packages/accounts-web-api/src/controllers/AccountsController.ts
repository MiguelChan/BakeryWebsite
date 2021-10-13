import express from 'express';
import debug from 'debug';
import {
  GetAccountsRequest,
  GetAccountsResponse,
} from '@mgl/shared-components';
import { AccountsService } from 'services';
import {
  inject,
  injectable,
} from 'inversify';
import {
  Types,
} from 'utils';

const logger: debug.IDebugger = debug('accounts:app:AccountsController');

/**
 * The Controller for all your accounts needs.
 */
@injectable()
export class AccountsController {
  constructor(@inject(Types.AccountsService) private readonly accountsService: AccountsService) {
    logger('Initializing Accounts Controller');
    this.getAccounts = this.getAccounts.bind(this);
  }

  /**
   * Gets the Accounts from the Backend.
   *
   * @param req .
   * @param res .
   */
  async getAccounts(req: express.Request, res: express.Response) {
    // The request is empty.
    const getAccountsRequest: GetAccountsRequest = {};

    try {
      const response: GetAccountsResponse = await this.accountsService.getAccounts(getAccountsRequest);
      logger('Got a Response from the Service: %j', response);
      res.json(response);
    } catch (exception: any) {
      logger('Got an error from the Service: %s', exception.message);
      res.json({
        error: exception.message,
      }).status(500);
    }
  }
}
