import express from 'express';
import { SuppliersController } from '../../src/controllers';
import { CreateSupplierDto, GetSuppliersDto } from '../../src/dtos';
import { Contact, ContactType, Supplier } from '../../src/models';
import { SupplierService } from '../../src/services';
import { createMockRequest, createMockResponse } from '../utils/ExpressUtils';

jest.mock('../../src/services');

describe('SuppliersController', () => {
  let suppliersController: SuppliersController;
  let mockSuppliersService: SupplierService;

  function buildRandomContact(): Contact {
    return {
      contactFirstName: 'ContactFirstName',
      contactLastName: 'ContactLastName',
      contactType: ContactType.Returns,
      emailAddress: 'emailAddress',
      id: '',
      phoneNumber: 'PhoneNumber',
    };
  }

  function buildRandomSupplier(): Supplier {
    return {
      addressLine1: 'AddressLine1',
      addressLine2: 'AddressLine2',
      contacts: [],
      id: '',
      name: 'Name',
      phoneNumber: 'PhoneNumber',
    };
  }

  beforeEach(() => {
    mockSuppliersService = {
      createSupplier: jest.fn(),
      deleteSupplier: jest.fn(),
      editSupplier: jest.fn(),
      getSupplier: jest.fn(),
      getSuppliers: jest.fn(),
    };

    suppliersController = new SuppliersController(mockSuppliersService);
  });

  describe('CreateSupplier', () => {
    function buildCreateSupplierDto(): CreateSupplierDto {
      const supplier: Supplier = buildRandomSupplier();
      const contact: Contact = buildRandomContact();

      return {
        contacts: [contact],
        supplier,
      };
    }

    it('Should call the SuppliersService when a Create is Requested', () => {
      const createSupplierDto = buildCreateSupplierDto();
      const mockRequest: express.Request = createMockRequest();
      mockRequest.body = createSupplierDto;

      const mockResponse: express.Response = createMockResponse();

      suppliersController.createSupplier(mockRequest, mockResponse);

      const expectedNewSupplier: Supplier = {
        ...createSupplierDto.supplier,
        contacts: createSupplierDto.contacts,
      };

      expect(mockSuppliersService.createSupplier).toHaveBeenCalledWith(expectedNewSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith({});
    });

    it('Should return an error code when the SupplierService fails', () => {
      const createSupplierDto: CreateSupplierDto = buildCreateSupplierDto();
      const mockRequest: express.Request = createMockRequest();
      mockRequest.body = createSupplierDto;

      const mockResponse: express.Response = createMockResponse();

      (mockSuppliersService.createSupplier as jest.Mock).mockImplementation(() => { throw new Error('SomeSome'); });

      suppliersController.createSupplier(mockRequest, mockResponse);

      const expectedNewSupplier: Supplier = {
        ...createSupplierDto.supplier,
        contacts: createSupplierDto.contacts,
      };

      expect(mockSuppliersService.createSupplier).toHaveBeenCalledWith(expectedNewSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('GetSuppliers', () => {
    it('Should pass default pageSize and pageNumber when such params do not exist', () => {
      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      const getSuppliersDto: GetSuppliersDto = {
        suppliers: [],
        totalElements: 100,
      };
      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => getSuppliersDto);

      suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(0, 50);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(getSuppliersDto);
    });

    it('Should use pageSize and pageNumber from the provided URL params', () => {
      const mockRequest: express.Request = createMockRequest();
      mockRequest.query.pageSize = '100';
      mockRequest.query.pageNumber = '200';

      const mockResponse: express.Response = createMockResponse();

      const getSuppliersDto: GetSuppliersDto = {
        suppliers: [],
        totalElements: 100,
      };

      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => getSuppliersDto);

      suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(200, 100);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(getSuppliersDto);
    });

    it('Should return error StatusCode when the Service fails', () => {
      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => {
        throw new Error('SomeSome');
      });

      suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(0, 50);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
