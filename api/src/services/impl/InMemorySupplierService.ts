import debug from 'debug';
import { injectable } from 'inversify';
import {
  Supplier,
} from '../../models';
import {
  SupplierService,
} from '../SupplierService';

const logger: debug.IDebugger = debug('app:InMemorySupplierService');

/**
 * The Supplier Service.
 * Within this class we can access all the data from the Supplier Service.
 */
@injectable()
export class InMemorySupplierService implements SupplierService {
  private readonly suppliers: Supplier[];

  constructor() {
    this.suppliers = [];
  }

  public getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  public createSupplier(supplier: Supplier): void {
    const newSupplier: Supplier = {
      ...supplier,
      id: `${this.suppliers.length + 1}`,
    };
    this.suppliers.push(newSupplier);
  }

  public deleteSupplier(supplierId: string): void {
    const foundIndex = this.suppliers.findIndex((currentSupplier: Supplier) => currentSupplier.id === supplierId);

    this.suppliers.splice(foundIndex, 1);
  }

  public editSupplier(supplier: Supplier): void {
    const foundIndex = this.suppliers.findIndex((currentSupplier: Supplier) => currentSupplier.id === supplier.id);

    this.suppliers[foundIndex] = supplier;
  }

  public getSupplier(supplierId: string): Supplier {
    logger.log(`Trying to Fetch Supplier for Id: ${supplierId}`);
    const foundElement = this.suppliers.filter((currentSupplier: Supplier) => currentSupplier.id === supplierId).pop();
    if (foundElement === undefined) {
      throw new Error('Not Found');
    }
    return foundElement;
  }
}
