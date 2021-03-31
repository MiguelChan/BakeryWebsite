import { GetSuppliersDto } from '../dtos';
import {
  Supplier,
} from '../models';

/**
 * The Supplier Service interface.
 */
export interface SupplierService {

  /**
   * Gets the Suppliers.
   *
   * @param {number} pageNumber The page number.
   * @param {number} pageSize The size of the page.
   *
   * @returns {Supplier[]} a List of Suppliers.
   */
  getSuppliers(pageNumber: number, pageSize: number): GetSuppliersDto;

  /**
   * Creates a Supplier.
   * @param {Supplier} supplier The supplier to create.
   */
  createSupplier(supplier: Supplier): void;

  /**
   * Deletes a Supplier.
   * @param {string} supplierId The id of the supplier to delete.
   */
  deleteSupplier(supplierId: string): void;

  /**
   * Edits a Supplier.
   * @param {Supplier} supplier The supplier to edit.
   */
  editSupplier(supplier: Supplier): void;

  /**
   * Gets a Supplier.
   * @param {string} supplierId The supplierId to fetch.
   */
  getSupplier(supplierId: string): Supplier;

}
