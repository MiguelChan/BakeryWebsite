import {
  Contact,
} from './Contact';

/**
 * Defines the Supplier.
 */
export interface Supplier {
  id: string;
  name: string;
  lineAddress1: string;
  lineAddress2: string;
  contacts: Contact[];
  phoneNumber: string;
}
