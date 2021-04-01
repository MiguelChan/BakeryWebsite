import { 
    Supplier,
} from "../../../Models";

 /**
  * Defines the GetSupplier Response.
  */
export interface GetSuppliersResponse {
    suppliers: Supplier[];
    totalElements: number;
    errorMessage?: string;
}

/**
 * 
 * @returns An empty {GetSupplierResponse}.
 */
export const buildEmptyResponse = (): GetSuppliersResponse => {
    return {
        suppliers: [],
        totalElements: 0,
    };
}