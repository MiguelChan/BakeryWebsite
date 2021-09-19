import express from 'express';
import debug from 'debug';
import { injectable } from 'inversify';
import {
  CreateSupplierDto,
} from 'dtos';

const logger: debug.IDebugger = debug('suppliers:app:SuppliersController');

/**
 * Defines the Middlewayer layer for the Suppliers Controllers.
 */
@injectable()
export class SuppliersMiddleware {
  constructor() {
    this.validateRequiredFieldsForCreate = this.validateRequiredFieldsForCreate.bind(this);
    this.extractSupplierId = this.extractSupplierId.bind(this);
    this.isValidCreateRequest = this.isValidCreateRequest.bind(this);
  }

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
    if (req.body && this.isValidCreateRequest(createSupplierRequest)) {
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

  /**
   * Extracts the {contactId} and places it in the req.body.
   * @param req .
   * @param res .
   * @param next .
   */
  public async extractContactId(req: express.Request, res: express.Response, next: express.NextFunction) {
    logger('Extracting ContactId from Request');
    req.body.contactId = req.params.contactId;
    next();
  }

  private isValidCreateRequest(createSupplierRequest: CreateSupplierDto): boolean {
    const {
      supplier,
    } = createSupplierRequest;

    return supplier != null
      && (supplier.name !== null && supplier.name !== '')
      && (supplier.phoneNumber !== null && supplier.phoneNumber !== '');
  }
}
