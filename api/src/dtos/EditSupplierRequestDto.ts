import { Contact, Supplier } from '../models';

export interface EditSupplierRequestDto {
  supplier: Supplier;
  contacts: Contact[];
}
