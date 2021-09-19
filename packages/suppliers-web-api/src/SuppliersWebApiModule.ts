import express from 'express';
import {
  WebAppModule,
  WebApplication,
} from '@mgl/shared-components';
import debug from 'debug';
import { CommonRoutesConfig } from 'routes';
import {
  InversifyContainer,
} from './utils/InversifyContainer';

const logger: debug.IDebugger = debug('suppliers:Module');

/**
 * Installs the {SuppliersWebApiModule}.
 *
 * This module is meant to be used for holding all the required configuration and setup-for the Suppliers Website.
 *
 * This is meant to be used with {express}.
 */
export class SuppliersWebApiModule implements WebAppModule {
  private readonly inversifyContainer: InversifyContainer;

  public constructor(private readonly app: express.Application, private readonly suppliersServiceUrl: string) {
    this.inversifyContainer = new InversifyContainer(app, suppliersServiceUrl);
  }

  /**
   * Installs the module.
   *
   * @param {WebApplication} app .
   */
  installModule(app: WebApplication) {
    logger('Configuring WebApplication', app);
    const routes: Array<CommonRoutesConfig> = this.inversifyContainer.getAppRoutes();
    routes.forEach((currentRoute: CommonRoutesConfig) => {
      currentRoute.configureRoutes();
      logger(`Routes configured for: ${currentRoute.getName()}`);
    });
  }
}
