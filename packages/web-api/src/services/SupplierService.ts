import {
  DeleteSupplierResponseDto,
  GetSuppliersDto,
  DeleteContactResponseDto,
  EditContactResponseDto,
  EditSupplierResponseDto,
} from '../dtos';
import {
  Contact,
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
  getSuppliers(pageNumber: number, pageSize: number): Promise<GetSuppliersDto>;

  /**
   * Creates a Supplier.
   * @param {Supplier} supplier The supplier to create.
   */
  createSupplier(supplier: Supplier): Promise<string>;

  /**
   * Deletes a Supplier.
   * @param {string} supplierId The id of the supplier to delete.
   */
  deleteSupplier(supplierId: string): Promise<DeleteSupplierResponseDto>;

  /**
   * Edits a Supplier.
   * @param {Supplier} supplier The supplier to edit.
   */
  editSupplier(supplier: Supplier): Promise<EditSupplierResponseDto>;

  /**
   * Gets a Supplier.
   * @param {string} supplierId The supplierId to fetch.
   */
  getSupplier(supplierId: string): Promise<Supplier>;

  /**
   * Deletes the contact.
   * @param {string} contactId The id of the contact to delete.
   */
  deleteContact(contactId: string): Promise<DeleteContactResponseDto>;

  /**
   * Edits a Contact.
   *
   * @param {Contact} contact The contact to edit.
   */
  editContact(contact: Contact): Promise<EditContactResponseDto>;

}
