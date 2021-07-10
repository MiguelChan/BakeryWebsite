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
  DeleteSupplierResponseDto,
  EditContactRequestDto,
  EditContactResponseDto,
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
import { DeleteContactResponseDto } from '../dtos/DeleteContactResponseDto';

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
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);
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
      const getSuppliersDto: GetSuppliersDto = await this.suppliersService.getSuppliers(pageNumber, pageSize);
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
    const createSupplierResponse: CreateSupplierResponseDto = {
      supplierId: '',
    };

    try {
      const createSupplierDto: CreateSupplierDto = req.body;
      const newSupplier: Supplier = {
        ...createSupplierDto.supplier,
        contacts: [...createSupplierDto.contacts],
      };
      const supplierId = await this.suppliersService.createSupplier(newSupplier);
      createSupplierResponse.supplierId = supplierId;
      res.status(201).send(createSupplierResponse);
    } catch (exception) {
      createSupplierResponse.errorMessage = exception;
      res.status(500).send(createSupplierResponse);
    }
  }

  async deleteSupplier(req: express.Request, res: express.Response) {
    const supplierId: string = req.body.id;
    logger('Attempting to Delete Supplier: %s', supplierId);
    try {
      const response: DeleteSupplierResponseDto = await this.suppliersService.deleteSupplier(supplierId);
      res.status(201).send(response);
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

      await this.suppliersService.editSupplier(supplierToEdit);
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
    logger('Getting Supplier for Id: %s', supplierId);
    try {
      const foundSupplier: Supplier = await this.suppliersService.getSupplier(supplierId);
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

  /**
   * Deletes a Contact from a given Supplier.
   * @param req .
   * @param res .
   */
  async deleteContact(req: express.Request, res: express.Response) {
    const supplierId = req.body.id;
    const { contactId } = req.body;
    logger('Attempting to Delete Contact: %s for Supplier: %s', contactId, supplierId);

    try {
      const response: DeleteContactResponseDto = await this.suppliersService.deleteContact(contactId);
      res.status(200).send(response);
    } catch (exception) {
      logger('Error while trying to Delete Supplier: %j', exception);
      const errorMessage: BaseResponseDto = {
        errorMessage: JSON.stringify(exception),
      };
      res.status(500).send(errorMessage);
    }
  }

  async editContact(req: express.Request, res: express.Response) {
    const supplierId = req.body.id;
    const {
      contact,
    } = req.body as EditContactRequestDto;

    logger('Attempting to Edit Contact: %s for Supplier: %s', contact.id, supplierId);

    try {
      const response: EditContactResponseDto = await this.suppliersService.editContact(contact);
      res.status(200).send(response);
    } catch (exception) {
      logger('Error while trying to EditContact: %j', exception);
      const errorMessage: BaseResponseDto = {
        errorMessage: JSON.stringify(exception),
      };
      res.status(500).send(errorMessage);
    }
  }
}
