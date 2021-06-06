import {
  Supplier,
} from '../models';

export interface GetSuppliersDto {
  suppliers: Supplier[];
  totalElements: number;
  errorMessage?: string;
}
