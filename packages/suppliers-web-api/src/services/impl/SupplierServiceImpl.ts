import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';
import {
  inject,
  injectable,
} from 'inversify';
import debug from 'debug';
import {
  DeleteSupplierResponseDto,
  EditContactRequestDto,
  EditContactResponseDto,
  EditSupplierRequestDto,
  EditSupplierResponseDto,
  GetSuppliersDto,
  DeleteContactResponseDto,
} from 'dtos';
import {
  Contact,
  Supplier,
} from 'models';
import { Types } from 'utils';
import { SupplierService } from 'services';

const logger: debug.IDebugger = debug('suppliers:app:SupplierServiceImpl');

@injectable()
export class SupplierServiceImpl implements SupplierService {
  constructor(@inject(Types.SupplierServiceUrl) private readonly suppliersServiceUrl: string) {
  }

  async getSuppliers(pageNumber: number, pageSize: number): Promise<GetSuppliersDto> {
    const makeCall: Promise<GetSuppliersDto> = new Promise((accept, reject) => {
      axios.get(`${this.suppliersServiceUrl}/suppliers`, {
        params: {
          pageNumber,
          pageSize,
        },
      })
        .then((response: AxiosResponse) => {
          accept(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });

    return makeCall;
  }

  async createSupplier(supplier: Supplier): Promise<string> {
    const createSupplierRequest = {
      supplier,
    };

    const makeCall: Promise<any> = new Promise((accept, reject) => {
      const url = `${this.suppliersServiceUrl}/suppliers`;
      axios.post(url, createSupplierRequest).then((response: AxiosResponse) => {
        logger('Got Response from Response: %j', response.data);
        accept(response.data.supplierId);
      }).catch((error: AxiosError) => {
        logger('Error from Axios: %s', error.message);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }

  async deleteSupplier(supplierId: string): Promise<DeleteSupplierResponseDto> {
    const makeCall: Promise<DeleteSupplierResponseDto> = new Promise((accept, reject) => {
      const url = `${this.suppliersServiceUrl}/suppliers/${supplierId}`;
      axios.delete(url).then((response: AxiosResponse<DeleteSupplierResponseDto>) => {
        logger('Got response from Server: %j', response.data);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got error from Server while trying to Delete Supplier: %j', error);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }

  async editSupplier(supplier: Supplier): Promise<EditSupplierResponseDto> {
    const makeCall: Promise<EditSupplierResponseDto> = new Promise((accept, reject) => {
      const url = `${this.suppliersServiceUrl}/suppliers/${supplier.id}`;
      const editSupplierRequest: EditSupplierRequestDto = {
        supplier,
      };

      axios.put(url, editSupplierRequest).then((response: AxiosResponse<EditSupplierResponseDto>) => {
        logger('Got response from Server: %s', response.data);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got an error while trying to Update the Supplier: %j', error);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }

  async getSupplier(supplierId: string): Promise<Supplier> {
    const makeCall: Promise<any> = new Promise((accept, reject) => {
      const url = `${this.suppliersServiceUrl}/suppliers/${supplierId}`;
      axios.get(url).then((response: AxiosResponse) => {
        logger('Got Response from Server: %j', response.data);
        accept(response.data.supplier);
      }).catch((error: AxiosError) => {
        logger('Got error from Server: %j', error);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }

  async deleteContact(contactId: string): Promise<DeleteContactResponseDto> {
    logger('DeleteContact for: %s', contactId);
    const makeCall: Promise<DeleteContactResponseDto> = new Promise((accept, reject) => {
      const url = `${this.suppliersServiceUrl}/contacts/${contactId}`;
      axios.delete(url).then((response: AxiosResponse<DeleteContactResponseDto>) => {
        logger('Got response from Server: %s', response.data);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got error from the Server: %s', error);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }

  async editContact(contact: Contact): Promise<EditContactResponseDto> {
    logger('Editing Contact: %s', contact.id);

    const makeCall: Promise<EditContactResponseDto> = new Promise((accept, reject) => {
      const editContactRequest: EditContactRequestDto = {
        contact,
      };

      const url = `${this.suppliersServiceUrl}/contacts/${contact.id}`;
      axios.put(url, editContactRequest).then((response: AxiosResponse<EditContactResponseDto>) => {
        logger('Got response from Server: %s', response.data);
        accept(response.data);
      }).catch((error: AxiosError) => {
        logger('Got error from Server: %j', error);
        reject(error);
      });
    });

    const response = await makeCall;

    return response;
  }
}
