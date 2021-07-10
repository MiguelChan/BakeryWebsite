import { Contact } from '../models';

/**
 * Request for Editing a Contact.
 */
export interface EditContactRequestDto {
  contact: Contact;
}
