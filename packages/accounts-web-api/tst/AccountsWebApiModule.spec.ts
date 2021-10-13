import { Express } from 'jest-express/lib/express';
import express from 'express';
import { AccountsWebApiModule } from '../src/AccountsWebApiModule';

describe('AccountsWebApiModule', () => {
  it('Should setup the application', () => {
    const app: express.Application = new Express() as any;
    const serviceUrl = 'someUrl.com';

    const module = new AccountsWebApiModule(app, serviceUrl);

    module.installModule(app);
  });
});
