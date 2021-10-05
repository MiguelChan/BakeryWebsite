import express from 'express';
import {
  WebAppModule,
  WebApplication,
} from '@mgl/shared-components';
import debug from 'debug';

const logger: debug.IDebugger = debug('accounts:Module');

/**
 * Installs the {AccountsWebApiModule}.
 *
 * This module is meant to be used for holding all the required configuration and setup for the Accounts Website.
 * This is meant to be used with {express}.
 */
export class AccountsWebApiModule implements WebAppModule {
  /**
   * Default constructor.
   * @param {express.Application} app .
   * @param {string} accountsServiceUrl The backend-service URL.
   */
  public constructor(private readonly app: express.Application, private readonly accountsServiceUrl: string) {
    logger(`Attaching into: ${accountsServiceUrl}`);
  }

  /**
   * Installs the Module.
   *
   * @param {WebApplication} app .
   */
  installModule(app: WebApplication) {
    logger(`Application: ${app}`);
  }
}
