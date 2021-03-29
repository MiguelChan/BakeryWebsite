import { 
    Contact,
} from ".";

/**
 * Defines the Supplier.
 */
export interface Supplier {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    contacts: Contact[];
    phoneNumber: string;
}