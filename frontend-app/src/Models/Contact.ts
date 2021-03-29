/**
 * Defines a Contact for the Supplier.
 */
export interface Contact {
    id: string;
    contactType: ContactType;
    phoneNumber: string;
    emailAddress: string;
    contactFirstName: string;
    contactLastName: string;
}

/**
 * Defines the Contact Types.
 */
export enum ContactType {
    Returns = 'Returns',
    SalesRep = 'SalesRep',
}