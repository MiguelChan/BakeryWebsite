import { SubAccountsController } from 'controllers';
import express from 'express';
import {
  inject,
  injectable,
} from 'inversify';
import { Types } from 'utils';
import { CommonRoutesConfig } from './CommonRoutesConfig';

/**
 * Defines the Routes for the SubAccounts.
 */
@injectable()
export class SubAccountsRoutes extends CommonRoutesConfig {
  constructor(
  @inject(Types.Application) app: express.Application,
    @inject(Types.SubAccountsController) private readonly subAccountsController: SubAccountsController,
  ) {
    super(app, 'SubAccountsRoutes');
  }

  public configureRoutes(): express.Application {
    this.app.route('/api/subAccounts/:subAccountId').delete(this.subAccountsController.deleteSubAccount);
    return this.app;
  }
}
