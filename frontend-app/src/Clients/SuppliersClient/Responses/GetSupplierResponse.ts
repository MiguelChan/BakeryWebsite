import { 
    Supplier,
} from "../../../Models";
import { 
    Nullable,
} from "../../../Utils";

 /**
  * Defines the GetSupplier Response.
  */
export interface GetSupplierResponse {
    suppliers: Supplier[];
    totalElements: number;
    errorMessage?: string;
}

/**
 * 
 * @returns An empty {GetSupplierResponse}.
 */
export const buildEmptyResponse = (): GetSupplierResponse => {
    return {
        suppliers: [],
        totalElements: 0,
    };
}