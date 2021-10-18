import {
  inject,
  injectable,
} from 'inversify';
import express from 'express';
import { AccountsController } from 'controllers';
import { Types } from 'utils';
import { CommonRoutesConfig } from './CommonRoutesConfig';

/**
 * Defines the Routes for the Accounts.
 */
@injectable()
export class AccountsRoutes extends CommonRoutesConfig {
  constructor(
  @inject(Types.Application) app: express.Application,
    @inject(Types.AccountsController) private readonly accountsController: AccountsController,
  ) {
    super(app, 'AccountsRoutes');
  }

  public configureRoutes(): express.Application {
    this.app.route('/api/accounts').get(this.accountsController.getAccounts);
    this.app.route('/api/accounts').post(this.accountsController.createAccount);
    this.app.route('/api/accounts/:accountId').get(this.accountsController.getAccount);
    this.app.route('/api/accounts/:accountId').delete(this.accountsController.deleteAccount);

    return this.app;
  }
}
