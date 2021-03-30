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
    paginationCursor: Nullable<string>;
    pageNumber: number;
}

/**
 * 
 * @returns An empty {GetSupplierResponse}.
 */
export const buildEmptyResponse = (): GetSupplierResponse => (
    {
        suppliers: [],
        paginationCursor: null,
        pageNumber: 0,
    }
);