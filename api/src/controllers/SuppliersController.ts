import express from 'express';
import debug from 'debug';
import {
  inject,
  injectable,
} from 'inversify';
import {
  SupplierService,
} from '../services';
import {
  Supplier,
} from '../models';
import {
  GetSuppliersDto,
} from '../dtos/GetSuppliersDto';
import {
  CreateSupplierDto,
  CreateSupplierResponseDto,
  GetSupplierResponseDto,
} from '../dtos';
import {
  Types,
} from '../utils/DITypes';
import {
  parseIntegerNumber,
} from '../utils/ObjectUtils';
import { BaseResponseDto } from '../dtos/BaseResponseDto';
import { EditSupplierRequestDto } from '../dtos/EditSupplierRequestDto';

const logger: debug.IDebugger = debug('app:SuppliersController');

/**
 * Defines the Suppliers Controller.
 */
@injectable()
export class SuppliersController {
  private readonly DEFAULT_PAGE_NUMBER = 0;

  private readonly DEFAULT_PAGE_SIZE = 50;

  constructor(@inject(Types.SupplierService) private readonly suppliersService: SupplierService) {
    // Need to add this binding statements 'cause ExpressJS loses the reference to "this".
    this.getSuppliers = this.getSuppliers.bind(this);
    this.createSupplier = this.createSupplier.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
    this.editSupplier = this.editSupplier.bind(this);
    this.getSupplier = this.getSupplier.bind(this);
  }

  /**
   * Gets a List of {Supplier}.
   * @param req .
   * @param res .
   */
  async getSuppliers(req: express.Request, res: express.Response) {
    logger('Retrieving Suppliers');

    const pageNumber: number = parseIntegerNumber(req.query.pageNumber, this.DEFAULT_PAGE_NUMBER);
    const pageSize: number = parseIntegerNumber(req.query.pageSize, this.DEFAULT_PAGE_SIZE);

    try {
      const getSuppliersDto: GetSuppliersDto = this.suppliersService.getSuppliers(pageNumber, pageSize);
      res.status(200).send(getSuppliersDto);
    } catch (exception) {
      res.status(500).send({
        errorMessage: 'Un error interno ha occurrido. Intenta de nuevo mas tarde',
      });
    }
  }

  /**
     * Creates a Single Supplier.
     * @param req .
     * @param res .
     */
  async createSupplier(req: express.Request, res: express.Response) {
    logger('CreatingSupplier');
    const createSupplierResponse: CreateSupplierResponseDto = {};

    try {
      const createSupplierDto: CreateSupplierDto = req.body;
      const newSupplier: Supplier = {
        ...createSupplierDto.supplier,
        contacts: [...createSupplierDto.contacts],
      };
      this.suppliersService.createSupplier(newSupplier);
      res.status(201).send(createSupplierResponse);
    } catch (exception) {
      createSupplierResponse.errorMessage = exception;
      res.status(500).send(createSupplierResponse);
    }
  }

  async deleteSupplier(req: express.Request, res: express.Response) {
    try {
      this.suppliersService.deleteSupplier(req.body.supplierId);
      res.status(201).send({ status: 'Deleted' });
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  async editSupplier(req: express.Request, res: express.Response) {
    try {
      const request: EditSupplierRequestDto = req.body;

      const {
        contacts,
        supplier,
      } = request;

      const supplierToEdit: Supplier = {
        ...supplier,
        contacts: [...contacts],
      };

      this.suppliersService.editSupplier(supplierToEdit);
      res.status(201).send({});
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  /**
   * Gets a single Supplier given its SupplierId.
   * @param req .
   * @param res .
   */
  async getSupplier(req: express.Request, res: express.Response) {
    const supplierId: string = req.body.id;
    logger('Getting Supplier for Id: {}', supplierId);
    try {
      const foundSupplier: Supplier = this.suppliersService.getSupplier(supplierId);
      const getSupplierDto: GetSupplierResponseDto = {
        supplier: foundSupplier,
      };

      res.status(200).send(getSupplierDto);
    } catch (exception) {
      const errorMessage: BaseResponseDto = {
        errorMessage: JSON.stringify(exception),
      };
      res.status(500).send(errorMessage);
    }
  }
}
