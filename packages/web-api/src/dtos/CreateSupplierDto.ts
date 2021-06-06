import {
  Contact,
  Supplier,
} from '../models';

/**
 * Defines the DTO for Creating a Supplier.
 */
export interface CreateSupplierDto {
  supplier: Supplier;
  contacts: Contact[];
}
