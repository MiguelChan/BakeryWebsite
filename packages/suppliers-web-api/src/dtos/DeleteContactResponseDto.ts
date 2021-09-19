import {
  Contact,
} from 'models';

/**
 * DTO for the response of deleting a contact.
 */
export interface DeleteContactResponseDto {
  contact: Contact;
  deleted: boolean;
}
