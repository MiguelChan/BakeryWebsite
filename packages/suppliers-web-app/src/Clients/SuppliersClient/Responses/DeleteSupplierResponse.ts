import { Supplier } from "../../../Models";

/**
 * DTO for Deleting a Supplier.
 */
export interface DeleteSupplierResponse {
    supplier: Supplier;
    deleted: boolean;
}