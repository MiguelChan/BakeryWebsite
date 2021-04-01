import { Supplier } from "../../../Models";

/**
 * Defines the {GetSupplierResponse}.
 */
export interface GetSupplierResponse {
    supplier: Supplier;
    errorMessage?: string;
}