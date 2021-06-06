import { 
    Contact, 
    Supplier,
} from "../../../Models";

/**
 * Defines the Create Supplier Request.
 */
export interface CreateSupplierRequest {
    contacts: Contact[];
    supplier: Supplier;
}