import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import debug from 'debug';
import { GetSuppliersDto } from '../../dtos';
import { Supplier } from '../../models';
import { Types } from '../../utils';
import { SupplierService } from '../SupplierService';

const logger: debug.IDebugger = debug('app:SupplierServiceImpl');

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
        logger('--RESPONSE FROM AXIOS--');
        logger(JSON.stringify(response));
        logger('--RESPONSE FROM AXIOS--');
        accept(response.data.supplierId);
      }).catch((error: AxiosError) => {
        logger('--ERROR FROM AXIOS--');
        logger(JSON.stringify(error));
        reject(error);
        logger('--ERROR FROM AXIOS--');
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
