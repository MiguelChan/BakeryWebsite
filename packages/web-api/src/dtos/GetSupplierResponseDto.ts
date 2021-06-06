import { Supplier } from '../models';
import { BaseResponseDto } from './BaseResponseDto';

/**
 * Defines the DTO for Getting a single supplier.
 */
export interface GetSupplierResponseDto extends BaseResponseDto {
  supplier: Supplier;
}
