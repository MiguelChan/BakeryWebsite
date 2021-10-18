import {
  inject,
  injectable,
} from 'inversify';
import express from 'express';
import debug from 'debug';
import { Types } from 'utils';
import { AccountsService } from 'services';
import { DeleteSubAccountResponse } from '@mgl/shared-components';
import { parseDeleteSubAccountRequest } from './parsers';

const logger: debug.IDebugger = debug('accounts:app:SubAccountsController');

@injectable()
export class SubAccountsController {
  constructor(@inject(Types.AccountsService) private readonly accountsService: AccountsService) {
    logger('Initializing SubAccounts Controller');
    this.deleteSubAccount = this.deleteSubAccount.bind(this);
  }

  async deleteSubAccount(req: express.Request, res: express.Response) {
    const deleteSubAccountRequest = parseDeleteSubAccountRequest(req);

    try {
      const response: DeleteSubAccountResponse = await this.accountsService.deleteSubAccount(deleteSubAccountRequest);
      logger('Got a response from the Server: %j', response);
      res.status(200).send(response);
    } catch (exception: any) {
      logger('Got an error from the Service: %s', exception.message);
      res.status(500).send({
        message: exception.message,
      });
    }
  }
}
