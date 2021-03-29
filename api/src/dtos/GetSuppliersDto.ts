import { 
    Supplier,
} from "../models";
import { 
    Nullable,
} from "../utils";

export interface GetSupplierDto {
    suppliers: Supplier[];
    paginationCursor: Nullable<string>;
    pageNumber: number;
}