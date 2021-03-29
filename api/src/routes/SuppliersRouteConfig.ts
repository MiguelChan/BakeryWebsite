import {
    CommonRoutesConfig,
} from './CommonRouteConfig';
import express from 'express';
import SuppliersController from '../controllers/SuppliersController';
import SuppliersMiddleware from '../middlewares/SuppliersMiddleware';

/**
 * Defines the Routes for the Suppliers.
 */
export class SuppliersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'SuppliersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/api/suppliers')
            .get(SuppliersController.getSuppliers)
            .post(
                SuppliersMiddleware.validateRequiredFieldsForCreate,
                SuppliersController.createSupplier,
            );

        this.app.param('supplierId', SuppliersMiddleware.extractSupplierId);
        this.app.route('/api/suppliers/:supplierId')
            .get(SuppliersController.getSupplier)
            .put(SuppliersController.editSupplier)
            .delete(SuppliersController.deleteSupplier);

        return this.app;
    }

}