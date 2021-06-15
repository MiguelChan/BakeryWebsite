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

const logger: debug.IDebugger = debug('app:InversifyContainer');

export class InversifyContainer {
  private readonly container: Container;

  constructor(private readonly app: express.Application) {
    this.container = new Container();
    this.configureContainer();
  }

  public getContainer(): Container {
    return this.container;
  }

  private configureContainer() {
    logger('Configuring DI Container');
    this.container.bind<express.Application>(Types.Application).toConstantValue(this.app);
    this.container.bind<SupplierService>(Types.SupplierService).to(SupplierServiceImpl);
    this.container.bind<SuppliersMiddleware>(Types.SuppliersMiddleware).to(SuppliersMiddleware);
    this.container.bind<SuppliersController>(Types.SuppliersController).to(SuppliersController);
    this.container.bind<SuppliersRoutes>(Types.SuppliersRoutes).to(SuppliersRoutes);
    // ToDo: Replace with Env-Var
    this.container.bind<string>(Types.SupplierServiceUrl)
      .toConstantValue('https://mgl-bakery-service.herokuapp.com/api');
  }
}
