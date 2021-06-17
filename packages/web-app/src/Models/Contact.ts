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

/**
 * Parses a ContacType to its user-friendly-name.
 * @param contactType .
 * @returns The user friendly name.
 */
export const contactTypeParser = (contactType: ContactType): string => {
    switch (contactType) {
        case ContactType.Returns:
            return 'Devoluciones';
        case ContactType.SalesRep:
            return 'Representante de Ventas';
        default:
            return 'Not Supported';
    }
};