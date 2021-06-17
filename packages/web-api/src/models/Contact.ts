/**
 * Defines a Contact for the Supplier.
 */
export interface Contact {
  id: string;
  contactType: ContactType;
  phoneNumber: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
}

/**
 * Defines the Contact Types.
 */
export enum ContactType {
  Returns = 'RETURNS',
  SalesRep = 'SALES_REP',
}
