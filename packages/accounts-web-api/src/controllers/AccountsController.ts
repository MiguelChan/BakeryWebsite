import express from 'express';
import debug from 'debug';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
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
import {
  parseGetAccountRequest,
} from 'controllers/parsers';

const logger: debug.IDebugger = debug('accounts:app:AccountsController');

/**
 * The Controller for all your accounts needs.
 */
@injectable()
export class AccountsController {
  constructor(@inject(Types.AccountsService) private readonly accountsService: AccountsService) {
    logger('Initializing Accounts Controller');
    this.getAccounts = this.getAccounts.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
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

  /**
   * Creates the Account from the provided parameters.
   *
   * @param {express.Request} req .
   * @param {express.Response} res .
   */
  async createAccount(req: express.Request, res: express.Response) {
    const createAccountRequest: CreateAccountRequest = req.body;

    try {
      const response: CreateAccountResponse = await this.accountsService.createAccount(createAccountRequest);
      logger('Got a response from the Service: %j', response);
      res.json(response);
    } catch (exception: any) {
      logger('Got an error from the Service: %s', exception.message);
      res.json({
        message: exception.message,
      }).status(500);
    }
  }

  /**
   * Gets a Single Account
   *
   * @param req .
   * @param res .
   */
  async getAccount(req: express.Request, res: express.Response) {
    const getAccountRequest: GetAccountRequest = parseGetAccountRequest(req);

    try {
      const response: GetAccountResponse = await this.accountsService.getAccount(getAccountRequest);
      logger('Got a Response from thee Service %j', response);
      res.status(200).send(response);
    } catch (exception: any) {
      logger('Got an error from the Service: %s', exception.message);
      res.status(500).send({
        message: exception.message,
      });
    }
  }
}
