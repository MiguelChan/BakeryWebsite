import { Contact } from "../../../Models";

/**
 * Request for editing contacts.
 */
export interface EditContactRequest {
    contact: Contact;
}