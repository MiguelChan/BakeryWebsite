import {
  Container,
} from 'inversify';
import express from 'express';
import debug from 'debug';
import {
  SupplierService,
} from '../services';
import {
  Types,
} from './DITypes';
import {
  SuppliersMiddleware,
} from '../middlewares';
import {
  SuppliersController,
} from '../controllers';
import {
  SuppliersRoutes,
} from '../routes/SuppliersRoutes';
import {
  SupplierServiceImpl,
} from '../services/impl';
import { isNullOrUndefined } from './ObjectUtils';
import { CommonRoutesConfig } from '../routes/CommonRouteConfig';

const logger: debug.IDebugger = debug('app:InversifyContainer');

export class InversifyContainer {
  private readonly container: Container;

  private readonly routesTypes: symbol[] = [
    Types.SuppliersRoutes,
  ];

  constructor(private readonly app: express.Application, private readonly suppliersServiceUrl: string) {
    if (isNullOrUndefined(suppliersServiceUrl)) {
      throw new Error('SuppliersServiceUrl is not defined');
    }

    this.container = new Container();
    this.configureContainer();

    logger('Using %s as SuppliersService URL', this.suppliersServiceUrl);
    logger('InversifyContainer Configured');
  }

  public getContainer(): Container {
    return this.container;
  }

  public getAppRoutes(): CommonRoutesConfig[] {
    return this.routesTypes.map((currentRoute: symbol) => this.container.get<CommonRoutesConfig>(currentRoute));
  }

  private configureContainer() {
    logger('Configuring DI Container');
    this.container.bind<express.Application>(Types.Application).toConstantValue(this.app);
    this.container.bind<SupplierService>(Types.SupplierService).to(SupplierServiceImpl);
    this.container.bind<SuppliersMiddleware>(Types.SuppliersMiddleware).to(SuppliersMiddleware);
    this.container.bind<SuppliersController>(Types.SuppliersController).to(SuppliersController);
    this.container.bind<SuppliersRoutes>(Types.SuppliersRoutes).to(SuppliersRoutes);
    this.container.bind<string>(Types.SupplierServiceUrl).toConstantValue(this.suppliersServiceUrl);
  }
}
