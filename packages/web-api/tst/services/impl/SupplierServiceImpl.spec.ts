import axios, { AxiosResponse } from 'axios';
import { SupplierService } from '../../../src/services';
import { SupplierServiceImpl } from '../../../src/services/impl';
import { GetSuppliersDto } from '../../../src/dtos';
import { Contact, Supplier } from '../../../src/models';
import { DeleteContactResponseDto } from '../../../src/dtos/DeleteContactResponseDto';

jest.mock('axios');

describe('SupplierServiceImpl', () => {
  const SERVICE_URL = 'http://someUrl.com';

  let supplierService: SupplierService;

  const axiosGetFn = axios.get as jest.Mock;
  const axiosPostFn = axios.post as jest.Mock;
  const axiosDeleteFn = axios.delete as jest.Mock;

  beforeEach(() => {
    supplierService = new SupplierServiceImpl(SERVICE_URL);
  });

  afterEach(() => {
    axiosGetFn.mockClear();
    axiosPostFn.mockClear();
    axiosDeleteFn.mockClear();
  });

  describe('getSuppliers', () => {
    it('Should get the Suppliers', async () => {
      const pageNumber = 100;
      const pageSize = 20;

      const expectedResponse: GetSuppliersDto = {
        suppliers: [],
        totalElements: 100,
      };

      const axiosResponse: Partial<AxiosResponse> = {
        data: expectedResponse,
      };

      axiosGetFn.mockResolvedValueOnce(axiosResponse);

      const response: GetSuppliersDto = await supplierService.getSuppliers(pageNumber, pageSize);

      expect(response).toEqual(expectedResponse);
      expect(axiosGetFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers`, {
        params: {
          pageNumber,
          pageSize,
        },
      });
    });

    it('Should return catch the error when it occurs', () => {
      const pageNumber = 100;
      const pageSize = 20;

      const expectedError: Error = new Error('SomeSome');

      axiosGetFn.mockRejectedValueOnce(expectedError);

      return supplierService.getSuppliers(pageNumber, pageSize).catch((error) => {
        expect(error).toEqual(expectedError);
        expect(axiosGetFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers`, {
          params: {
            pageNumber,
            pageSize,
          },
        });
      });
    });
  });

  describe('createSuppliers', () => {
    it('Should create a Supplier', async () => {
      const supplier: Supplier = {} as Supplier;
      const expectedSupplierId: string = '12345';

      const axiosResponse: Partial<AxiosResponse> = {
        data: {
          supplierId: expectedSupplierId,
        },
      };

      const expectedRequest = {
        supplier,
      };

      axiosPostFn.mockResolvedValueOnce(axiosResponse);

      const supplierId: string = await supplierService.createSupplier(supplier);

      expect(supplierId).toEqual(expectedSupplierId);
      expect(axiosPostFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers`, expectedRequest);
    });

    it('Should handle the error when server fails', () => {
      const supplier: Supplier = {} as Supplier;

      const expectedError: Error = new Error('SomeSome');

      const expectedRequest = {
        supplier,
      };

      axiosPostFn.mockRejectedValueOnce(expectedError);

      return supplierService.createSupplier(supplier).catch((error) => {
        expect(error).toEqual(expectedError);
        expect(axiosPostFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers`, expectedRequest);
      });
    });
  });

  describe('getSupplier', () => {
    it('Should get the Supplier', async () => {
      const supplierId: string = '12345';
      const expectedSupplier: Supplier = {} as Supplier;

      const axiosResponse: Partial<AxiosResponse> = {
        data: {
          supplier: expectedSupplier,
        },
      };

      axiosGetFn.mockResolvedValueOnce(axiosResponse);

      const supplier: Supplier = await supplierService.getSupplier(supplierId);

      expect(supplier).toEqual(expectedSupplier);
      expect(axiosGetFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers/${supplierId}`);
    });

    it('Should handle the Error when the Server fails', () => {
      const supplierId: string = '12345';

      const expectedError: Error = new Error('SomeSome');

      axiosGetFn.mockRejectedValueOnce(expectedError);

      return supplierService.getSupplier(supplierId).catch((error) => {
        expect(error).toEqual(expectedError);
        expect(axiosGetFn).toHaveBeenCalledWith(`${SERVICE_URL}/suppliers/${supplierId}`);
      });
    });
  });

  describe('deleteContact', () => {
    it('Should delete the Contact', () => {
      const expectedContactId = 'SomeContactId';
      const url = `${SERVICE_URL}/contacts/${expectedContactId}`;

      const expectedResponse: DeleteContactResponseDto = {
        contact: {} as Contact,
        deleted: true,
      };

      const axiosResponse: Partial<AxiosResponse> = {
        data: expectedResponse,
      };

      axiosDeleteFn.mockResolvedValueOnce(axiosResponse);

      return supplierService.deleteContact(expectedContactId).then((response: DeleteContactResponseDto) => {
        expect(response).toEqual(expectedResponse);
        expect(axiosDeleteFn).toHaveBeenCalledWith(url);
      });
    });

    it('Should bubble up exception when found', () => {
      const expectedContactId = 'SomeContactId';
      const url = `${SERVICE_URL}/contacts/${expectedContactId}`;

      const expectedError: Error = new Error('SomeError');

      axiosDeleteFn.mockRejectedValueOnce(expectedError);

      return supplierService.deleteContact(expectedContactId).catch((error) => {
        expect(error).toEqual(expectedError);
        expect(axiosDeleteFn).toHaveBeenCalledWith(url);
      });
    });
  });
});
