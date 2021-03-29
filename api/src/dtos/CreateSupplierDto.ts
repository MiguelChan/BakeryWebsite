import { 
    CreateContactDto,
} from "./CreateContactDto";

/**
 * Defines the DTO for Creating a Supplier.
 */
export interface CreateSupplierDto {
    name: string;
    addressLine1: string;
    addressLine2: string;
    contacts: CreateContactDto[];
    phoneNumber: string;
}