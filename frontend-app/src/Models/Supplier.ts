import { 
    Contact,
 } from "./Contact";

/**
 * Defines a Supplier.
 */
export interface Supplier {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    contacts: Contact[];
    phoneNumber: string;
}