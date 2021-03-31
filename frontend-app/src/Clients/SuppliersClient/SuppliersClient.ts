import axios, { 
    AxiosError, 
    AxiosResponse,
} from "axios";
import { 
    Contact, 
    Supplier,
} from "../../Models";
import { 
    CreateSupplierRequest,
} from "./Requests";
import { 
    CreateSupplierResponse,
    GetSupplierResponse,
} from "./Responses";

/**
 * Defines the Client for all the Suppliers Operations.
 */
class SuppliersClient {

    private readonly SUPPLIERS_URL = '/api/suppliers';

    /**
     * Gets the Suppliers given the pagination data.
     * @param pageNumber The pageNumber.
     * @param pageSize The pageSize
     * @returns A Promise to be fulfilled.
     */
    public getSuppliers(pageNumber: number = 0, pageSize: number = 50): Promise<GetSupplierResponse> {
        return new Promise((accept, reject) => {
            axios.get(this.SUPPLIERS_URL, {
                params: {
                    pageSize,
                    pageNumber,
                },
            }).then((response: AxiosResponse<GetSupplierResponse>) => {
                const supplierResponse: GetSupplierResponse = response.data;
                accept(supplierResponse);
            }).catch((error: AxiosError<GetSupplierResponse>) => {
                const getSuppliersResponse: GetSupplierResponse = error.response!.data;
                reject(getSuppliersResponse);
            });
        });
    }

    /**
     * Creates a new Supplier with is corresponding Contacts.
     * @param newSupplier The supplier to create.
     * @param newContacts The contacts to create.
     */
    public createSupplier(newSupplier: Supplier, newContacts: Contact[]): Promise<CreateSupplierResponse> {
        return new Promise((accept, reject) => {
            const createSupplierRequest: CreateSupplierRequest = {
                contacts: newContacts,
                supplier: newSupplier,
            };

            axios.post(this.SUPPLIERS_URL, createSupplierRequest).then((response: AxiosResponse<CreateSupplierResponse>) => {
                const createResponse: CreateSupplierResponse = response.data;
                accept(createResponse);
            }).catch((error: AxiosError<CreateSupplierResponse>) => {
                let createResponse: CreateSupplierResponse = {};
                if (error.response!.status >= 500) {
                    // Error from Server.
                    createResponse = {
                        errorMessage: 'Hubo un error en el servidor. Intentelo mas tarde',
                    };
                } else {
                    createResponse = error.response!.data;
                }

                reject(createResponse);
            });
        });
    }

}

export const suppliersClient: SuppliersClient = new SuppliersClient();