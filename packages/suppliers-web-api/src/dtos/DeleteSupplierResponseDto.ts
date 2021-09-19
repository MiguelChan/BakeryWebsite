import {
  Supplier,
} from 'models';

/**
 * Defines the Response for when deleting a Supplier.
 */
export interface DeleteSupplierResponseDto {
  supplier: Supplier;
  deleted: boolean;
}
