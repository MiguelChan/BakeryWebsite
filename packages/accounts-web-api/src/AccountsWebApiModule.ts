import express from 'express';
import {
  WebAppModule,
  WebApplication,
} from '@mgl/shared-components';
import debug from 'debug';
import {
  InversifyContainer,
} from 'utils';
import { CommonRoutesConfig } from 'routes';

const logger: debug.IDebugger = debug('accounts:Module');

/**
 * Installs the {AccountsWebApiModule}.
 *
 * This module is meant to be used for holding all the required configuration and setup for the Accounts Website.
 * This is meant to be used with {express}.
 */
export class AccountsWebApiModule implements WebAppModule {
  private readonly inversifyContainer: InversifyContainer;

  /**
   * Default constructor.
   * @param {express.Application} app .
   * @param {string} accountsServiceUrl The backend-service URL.
   */
  public constructor(private readonly app: express.Application, private readonly accountsServiceUrl: string) {
    logger(`Attaching into: ${accountsServiceUrl}`);
    this.inversifyContainer = new InversifyContainer(app, accountsServiceUrl);
  }

  /**
   * Installs the Module.
   *
   * @param {WebApplication} app .
   */
  installModule(app: WebApplication) {
    logger('Configuring Routes for Application: %j', app);
    const currentRoutes: CommonRoutesConfig[] = this.inversifyContainer.getAppRoutes();
    currentRoutes.forEach((currentRoute: CommonRoutesConfig) => {
      logger('Configuring Route: %s', currentRoute.getName());
      currentRoute.configureRoutes();
    });
  }
}
