import { 
    ContactType,
} from "../models";

/**
 * Defines the Create Contact DTO.
 */
export interface CreateContactDto {
    contactType: ContactType;
    phoneNumber: string;
    emailAddress: string;
    contactFirstName: string;
    contactLastName: string;
}