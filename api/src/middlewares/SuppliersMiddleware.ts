import express from 'express';
import debug from 'debug';
import {
  CreateSupplierDto,
} from '../dtos';

const logger: debug.IDebugger = debug('app:SuppliersController');

/**
 * Defines the Middlewayer layer for the Suppliers Controllers.
 */
class SuppliersMiddleware {
  /**
     * Validates whether the request has the required attributes. Otherwise, return a BadRequest Status Code (400).
     * @param req .
     * @param res .
     * @param next .
     */
  public async validateRequiredFieldsForCreate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    logger('Validating Request for CreateSupplier');
    const createSupplierRequest: CreateSupplierDto = req.body;
    if (req.body && SuppliersMiddleware.isValidCreateRequest(createSupplierRequest)) {
      next();
    } else {
      logger('Invalid Request Found. Return a BadRequest StatusCode');
      res.status(400).send({
        error: 'El nombre del proveedor y el telefono son requeridos.',
      });
    }
  }

  /**
     * Extracts the {supplierId} and places it in the req.body.
     * @param req .
     * @param res .
     * @param next .
     */
  public async extractSupplierId(req: express.Request, res: express.Response, next: express.NextFunction) {
    logger('Extracting SupplierId from Request');
    req.body.id = req.params.supplierId;
    next();
  }

  private static isValidCreateRequest = (createSupplierRequest: CreateSupplierDto): boolean => {
    const {
      supplier,
    } = createSupplierRequest;

    return supplier != null
      && (supplier.name !== null && supplier.name !== '')
      && (supplier.phoneNumber !== null && supplier.phoneNumber !== '');
  };
}

export default new SuppliersMiddleware();
