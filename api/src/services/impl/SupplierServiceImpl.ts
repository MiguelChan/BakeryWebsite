import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import { GetSuppliersDto } from '../../dtos';
import { Supplier } from '../../models';
import { Types } from '../../utils';
import { SupplierService } from '../SupplierService';

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
          reject(JSON.stringify(error));
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
        accept(response.data.supplierId);
      }).catch((error: AxiosError) => {
        reject(JSON.stringify(error));
      });
    });

    const response = await makeCall;

    return response.supplierId;
  }

  deleteSupplier(supplierId: string): Promise<void> {
    throw new Error(`Method not implemented.: ${supplierId}`);
  }

  editSupplier(supplier: Supplier): Promise<void> {
    throw new Error(`Method not implemented.: ${supplier}`);
  }

  getSupplier(supplierId: string): Promise<Supplier> {
    throw new Error(`Method not implemented: ${supplierId}`);
  }
}
