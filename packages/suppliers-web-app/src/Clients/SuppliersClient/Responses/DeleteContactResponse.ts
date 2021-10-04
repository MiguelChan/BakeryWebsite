import { Contact } from "../../../Models";

/**
 * Delete Contact Response.
 */
export interface DeleteContactResponse {
    contact: Contact;
    deleted: boolean;
}