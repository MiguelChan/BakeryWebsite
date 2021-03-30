import {
  supplierService,
} from '../../src/services/SupplierService';
import {
  Contact,
  ContactType,
  Supplier,
} from '../../src/models';
import SuppliersController from '../../src/controllers/SuppliersController';
import {
  CreateSupplierDto,
} from '../../src/dtos';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

jest.mock('../../src/services/SupplierService');

describe('SuppliersController', () => {
  const getSuppliersMockFn = supplierService.getSuppliers as jest.Mock;

  afterEach(() => {
    getSuppliersMockFn.mockClear();
  });

  function buildRandomSupplier(): Supplier {
    return {
      addressLine1: 'AddressLine1',
      addressLine2: 'AddressLine2',
      contacts: [],
      id: '',
      name: '',
      phoneNumber: '',
    };
  }

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

  describe('CreateSupplier', () => {
    const createSupplierMockFn = supplierService.createSupplier as jest.Mock;

    afterEach(() => {
      createSupplierMockFn.mockClear();
    });

    it('Should call the SuppliersService when a Create is Requested', () => {
      const supplier: Supplier = buildRandomSupplier();
      const contact: Contact = buildRandomContact();

      const createSupplierDto: CreateSupplierDto = {
        contacts: [contact],
        supplier,
      };

      const mockRequest = createMockRequest();
      mockRequest.body = createSupplierDto;

      const mockResponse = createMockResponse();

      SuppliersController.createSupplier(mockRequest, mockResponse);

      const expectedNewSupplier: Supplier = {
        ...supplier,
        contacts: [contact],
      };

      expect(createSupplierMockFn).toHaveBeenCalledWith(expectedNewSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith({});
    });

    it('Should return an error code when the Service fails', () => {
      const supplier: Supplier = buildRandomSupplier();
      const contact: Contact = buildRandomContact();

      const createSupplierDto: CreateSupplierDto = {
        contacts: [contact],
        supplier,
      };

      const mockRequest = createMockRequest();
      mockRequest.body = createSupplierDto;

      const mockResponse = createMockResponse();

      createSupplierMockFn.mockImplementation(() => { throw new Error('SomeSome'); });

      SuppliersController.createSupplier(mockRequest, mockResponse);

      const expectedNewSupplier: Supplier = {
        ...supplier,
        contacts: [contact],
      };
      expect(createSupplierMockFn).toHaveBeenCalledWith(expectedNewSupplier);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
