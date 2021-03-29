import axios, { 
    AxiosError,
    AxiosResponse
} from 'axios';
import { 
    GetSupplierResponse,
 } from './responses';

/**
 * Defines the API Client.
 */
class APIClient {

    private readonly SUPPLIERS_URL = '/api/suppliers';

    /**
     * Gets the Supplier.
     * @param pageNumber The pageNumber.
     * @param pageSize The pageSize.
     * @returns A Promise.
     */
    public getSuppliers(pageNumber: number = 0, pageSize: number = 50): Promise<GetSupplierResponse> {
        return new Promise((accept, reject) => {
            axios.get(this.SUPPLIERS_URL).then((response: AxiosResponse<GetSupplierResponse>) => {
                const supplierResponse: GetSupplierResponse = response.data;
                console.debug(JSON.stringify(supplierResponse));
                accept(supplierResponse);
            }).catch((error: AxiosError) => {
                console.error(error.message);
                reject(error.message);
            });
        });
    }

}

export const apiClient: APIClient = new APIClient();