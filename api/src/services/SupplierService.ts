import debug from 'debug';
import {
  Supplier,
} from '../models';

const logger: debug.IDebugger = debug('app:SupplierService');

/**
 * The Supplier Service.
 * Within this class we can access all the data from the Supplier Service.
 */
export class SupplierService {
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

/**
 * The singleton for the Supplier Service.
 */
export const supplierService: SupplierService = new SupplierService();
