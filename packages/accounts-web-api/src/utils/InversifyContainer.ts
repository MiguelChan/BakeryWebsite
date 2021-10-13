import { Container } from 'inversify';
import express from 'express';
import debug from 'debug';
import { isNullOrUndefined } from '@mgl/shared-components';
import { AccountsController } from 'controllers';
import {
  AccountsRoutes,
  CommonRoutesConfig,
} from 'routes';
import {
  AccountsService,
  HerokuAccountsService,
} from 'services';
import { Types } from './DITypes';

const logger: debug.IDebugger = debug('accounts:app:InversifyContainer');

/**
 * DI Container.
 */
export class InversifyContainer {
  private readonly container: Container;

  private readonly routesTypes: symbol[] = [
    Types.AccountsRoutes,
  ];

  constructor(private readonly app: express.Application, private readonly accountServiceUrl: string) {
    if (isNullOrUndefined(accountServiceUrl)) {
      throw new Error('AccountsServiceURL is not defined');
    }

    this.container = new Container();
    this.configureContainer();

    logger('Using %s as AccountsServiceURL', this.accountServiceUrl);
    logger('InversifyContainer Configured');
  }

  public getAppRoutes(): CommonRoutesConfig[] {
    return this.routesTypes.map((currentRoute: symbol) => this.container.get<CommonRoutesConfig>(currentRoute));
  }

  private configureContainer(): void {
    logger('Configuring Container');
    this.container.bind<AccountsController>(Types.AccountsController).to(AccountsController);
    this.container.bind<express.Application>(Types.Application).toConstantValue(this.app);
    this.container.bind<AccountsRoutes>(Types.AccountsRoutes).to(AccountsRoutes);
    this.container.bind<string>(Types.AccountsServiceUrl).toConstantValue(this.accountServiceUrl);
    this.container.bind<AccountsService>(Types.AccountsService).to(HerokuAccountsService);
  }
}
