import { InversifyContainer } from 'utils';
import express from 'express';
import { CommonRoutesConfig } from 'routes';

describe('InversifyContainer', () => {
  const SERVICE_URL = 'someServiceUrl.com';
  let app: express.Application;

  beforeEach(() => {
    app = jest.fn().mockReturnThis() as any;
  });

  it('Should start-up the whole application', () => {
    const container: InversifyContainer = new InversifyContainer(app, SERVICE_URL);
    const appRoutes: CommonRoutesConfig[] = container.getAppRoutes();

    const appRouteStringSet = new Set(appRoutes.map((currentRoute: CommonRoutesConfig) => currentRoute.getName()));

    expect(appRouteStringSet.has('AccountsRoutes')).toBeTruthy();
    expect(appRouteStringSet.has('SubAccountsRoutes')).toBeTruthy();
  });
});
