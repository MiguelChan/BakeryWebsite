import express from 'express';
import { SuppliersController } from '../../src/controllers';
import {
  BaseResponseDto,
  CreateSupplierDto,
  DeleteSupplierResponseDto,
  GetSupplierResponseDto,
  GetSuppliersDto,
} from '../../src/dtos';
import { DeleteContactResponseDto } from '../../src/dtos/DeleteContactResponseDto';
import { EditSupplierRequestDto } from '../../src/dtos/EditSupplierRequestDto';
import { Contact, ContactType, Supplier } from '../../src/models';
import { SupplierService } from '../../src/services';
import { createMockRequest, createMockResponse } from '../utils/ExpressUtils';

jest.mock('../../src/services');

describe('SuppliersController', () => {
  let suppliersController: SuppliersController;
  let mockSuppliersService: SupplierService;

  function buildRandomContact(): Contact {
    return {
      firstName: 'ContactFirstName',
      lastName: 'ContactLastName',
      contactType: ContactType.Returns,
      emailAddress: 'emailAddress',
      id: '',
      phoneNumber: 'PhoneNumber',
    };
  }

  function buildRandomSupplier(): Supplier {
    return {
      lineAddress1: 'AddressLine1',
      lineAddress2: 'AddressLine2',
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
      deleteContact: jest.fn(),
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

    it('Should call the SuppliersService when a Create is Requested', async () => {
      const createSupplierDto = buildCreateSupplierDto();
      const mockRequest: express.Request = createMockRequest();
      mockRequest.body = createSupplierDto;
      const expectedSupplierId: string = '12345';

      const mockResponse: express.Response = createMockResponse();
      (mockSuppliersService.createSupplier as jest.Mock).mockResolvedValueOnce(expectedSupplierId);

      await suppliersController.createSupplier(mockRequest, mockResponse);

      const expectedNewSupplier: Supplier = {
        ...createSupplierDto.supplier,
        contacts: createSupplierDto.contacts,
      };

      expect(mockSuppliersService.createSupplier).toHaveBeenCalledWith(expectedNewSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith({
        supplierId: expectedSupplierId,
      });
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
    it('Should pass default pageSize and pageNumber when such params do not exist', async () => {
      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      const getSuppliersDto: GetSuppliersDto = {
        suppliers: [],
        totalElements: 100,
      };
      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => getSuppliersDto);

      await suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(0, 50);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(getSuppliersDto);
    });

    it('Should use pageSize and pageNumber from the provided URL params', async () => {
      const mockRequest: express.Request = createMockRequest();
      mockRequest.query.pageSize = '100';
      mockRequest.query.pageNumber = '200';

      const mockResponse: express.Response = createMockResponse();

      const getSuppliersDto: GetSuppliersDto = {
        suppliers: [],
        totalElements: 100,
      };

      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => getSuppliersDto);

      await suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(200, 100);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(getSuppliersDto);
    });

    it('Should return error StatusCode when the Service fails', async () => {
      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      (mockSuppliersService.getSuppliers as jest.Mock).mockImplementation(() => {
        throw new Error('SomeSome');
      });

      await suppliersController.getSuppliers(mockRequest, mockResponse);

      expect(mockSuppliersService.getSuppliers).toHaveBeenCalledWith(0, 50);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('GetSupplier', () => {
    it('Should get the Supplier from the SuppliersService', async () => {
      const testSupplierId = '12345';
      const supplier: Supplier = buildRandomSupplier();

      (mockSuppliersService.getSupplier as jest.Mock).mockImplementation(() => supplier);

      const mockRequest: express.Request = createMockRequest();
      mockRequest.body.id = testSupplierId;
      const mockResponse: express.Response = createMockResponse();

      await suppliersController.getSupplier(mockRequest, mockResponse);

      const expectedDto: GetSupplierResponseDto = {
        supplier,
      };

      expect(mockSuppliersService.getSupplier).toHaveBeenCalledWith(testSupplierId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(expectedDto);
    });

    it('Should return an error response if the SupplierService fails', async () => {
      const testSupplierId = '12345';

      (mockSuppliersService.getSupplier as jest.Mock).mockImplementation(() => {
        throw new Error('lololol');
      });

      const mockRequest: express.Request = createMockRequest();
      mockRequest.body.id = testSupplierId;
      const mockResponse: express.Response = createMockResponse();

      await suppliersController.getSupplier(mockRequest, mockResponse);

      expect(mockSuppliersService.getSupplier).toHaveBeenCalledWith(testSupplierId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('PutSupplier', () => {
    it('Should put the Suppliers', async () => {
      const expectedSupplier: Supplier = buildRandomSupplier();
      const expectedContacts: Contact[] = [buildRandomContact()];

      const expectedEditedSupplier: Supplier = {
        ...expectedSupplier,
        contacts: [...expectedContacts],
      };

      const editSupplierRequestDto: EditSupplierRequestDto = {
        contacts: expectedContacts,
        supplier: expectedSupplier,
      };

      const mockRequest: express.Request = createMockRequest();
      mockRequest.body = editSupplierRequestDto;

      const mockResponse: express.Response = createMockResponse();

      await suppliersController.editSupplier(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith({});
      expect(mockSuppliersService.editSupplier).toHaveBeenCalledWith(expectedEditedSupplier);
    });

    it('Should return an error when the SuppliersService fails', () => {
      const expectedSupplier: Supplier = buildRandomSupplier();
      const expectedContacts: Contact[] = [buildRandomContact()];

      const editSupplierRequestDto: EditSupplierRequestDto = {
        contacts: expectedContacts,
        supplier: expectedSupplier,
      };

      const expectedEditedSupplier: Supplier = {
        ...expectedSupplier,
        contacts: [...expectedContacts],
      };

      (mockSuppliersService.editSupplier as jest.Mock).mockImplementation(() => { throw new Error('Error'); });

      const mockRequest: express.Request = createMockRequest();
      mockRequest.body = editSupplierRequestDto;

      const mockResponse: express.Response = createMockResponse();

      suppliersController.editSupplier(mockRequest, mockResponse);

      expect(mockSuppliersService.editSupplier).toHaveBeenCalledWith(expectedEditedSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('DeleteContact', () => {
    it('Should delete the Contact', async () => {
      const expectedContactId = 'contactId';
      const expectedSupplierId = 'supplierId';

      const mockRes: express.Response = createMockResponse();
      const mockReq: express.Request = createMockRequest();

      mockReq.body.id = expectedSupplierId;
      mockReq.body.contactId = expectedContactId;

      const deleteContactDto: DeleteContactResponseDto = {
        contact: {} as Contact,
        deleted: true,
      };

      (mockSuppliersService.deleteContact as jest.Mock).mockResolvedValueOnce(deleteContactDto);

      await suppliersController.deleteContact(mockReq, mockRes);

      expect(mockSuppliersService.deleteContact).toHaveBeenCalledWith(expectedContactId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(deleteContactDto);
    });

    it('Should handle exceptions gracefully', async () => {
      const expectedContactId = 'contactId';
      const expectedSupplierId = 'supplierId';

      const mockRes: express.Response = createMockResponse();
      const mockReq: express.Request = createMockRequest();

      mockReq.body.id = expectedSupplierId;
      mockReq.body.contactId = expectedContactId;

      const expectedError: Error = new Error('SomeError');
      const expectedResponse: BaseResponseDto = {
        errorMessage: JSON.stringify(expectedError),
      };

      (mockSuppliersService.deleteContact as jest.Mock).mockRejectedValueOnce(expectedError);

      try {
        await suppliersController.deleteContact(mockReq, mockRes);
      } catch (exception) {
        expect(exception).toEqual(expectedResponse);
      }

      expect(mockSuppliersService.deleteContact).toHaveBeenCalledWith(expectedContactId);
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('DeleteSupplier', () => {
    const supplierId: string = 'SomeSupplierId';

    it('Should delete the Supplier', async () => {
      const expectedResponse: DeleteSupplierResponseDto = {
        supplier: {} as Supplier,
        deleted: true,
      };

      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();

      mockReq.body.id = supplierId;

      (mockSuppliersService.deleteSupplier as jest.Mock).mockResolvedValueOnce(expectedResponse);

      await suppliersController.deleteSupplier(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith(expectedResponse);
      expect(mockSuppliersService.deleteSupplier).toHaveBeenCalledWith(supplierId);
    });

    it('Should handle errors gracefully', async () => {
      const expectedError: Error = new Error('SomeError');

      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();

      mockReq.body.id = supplierId;

      (mockSuppliersService.deleteSupplier as jest.Mock).mockRejectedValueOnce(expectedError);

      await suppliersController.deleteSupplier(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(expectedError);
      expect(mockSuppliersService.deleteSupplier).toHaveBeenCalledWith(supplierId);
    });
  });
});
