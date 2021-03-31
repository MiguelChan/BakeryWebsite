import express from 'express';
import { inject, injectable } from 'inversify';
import {
  CommonRoutesConfig,
} from './CommonRouteConfig';
import {
  SuppliersController,
} from '../controllers';
import {
  SuppliersMiddleware,
} from '../middlewares';
import { Types } from '../utils';

/**
 * Defines the Routes for the Suppliers.
 */
@injectable()
export class SuppliersRoutes extends CommonRoutesConfig {
  /**
   * Default constructor.
   * @param {express.Application} app The application.
   * @param {SuppliersController} suppliersController The controller for these routes.
   */
  constructor(
  @inject(Types.Application) app: express.Application,
    @inject(Types.SuppliersController) private readonly suppliersController: SuppliersController,
    @inject(Types.SuppliersMiddleware) private readonly suppliersMiddleware: SuppliersMiddleware,
  ) {
    super(app, 'SuppliersRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/api/suppliers')
      .get(this.suppliersController.getSuppliers)
      .post(
        this.suppliersMiddleware.validateRequiredFieldsForCreate,
        this.suppliersController.createSupplier,
      );

    this.app.param('supplierId', this.suppliersMiddleware.extractSupplierId);
    this.app.route('/api/suppliers/:supplierId')
      .get(this.suppliersController.getSupplier)
      .put(this.suppliersController.editSupplier)
      .delete(this.suppliersController.deleteSupplier);

    return this.app;
  }
}
