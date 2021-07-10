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
    EditSupplierRequest,
} from "./Requests";
import { EditContactRequest } from "./Requests/EditContactRequest";
import { 
    CreateSupplierResponse,
    GetSuppliersResponse,
    EditSupplierResponse,
    GetSupplierResponse,
    DeleteContactResponse,
    DeleteSupplierResponse,
} from "./Responses";
import { EditContactResponse } from "./Responses/EditContactResponse";

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
    public getSuppliers(pageNumber: number = 0, pageSize: number = 50): Promise<GetSuppliersResponse> {
        return new Promise((accept, reject) => {
            axios.get(this.SUPPLIERS_URL, {
                params: {
                    pageSize,
                    pageNumber,
                },
            }).then((response: AxiosResponse<GetSuppliersResponse>) => {
                const supplierResponse: GetSuppliersResponse = response.data;
                accept(supplierResponse);
            }).catch((error: AxiosError<GetSuppliersResponse>) => {
                const getSuppliersResponse: GetSuppliersResponse = error.response!.data;
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

    /**
     * Gets a {Supplier} based-off the provided {supplierId}.
     * @param supplierId  .
     * @returns .
     */
    public getSupplier(supplierId: string): Promise<GetSupplierResponse> {
        return new Promise((accept, reject) => {
            const apiUrl: string = `${this.SUPPLIERS_URL}/${supplierId}`;
            axios.get(apiUrl).then((axiosResponse: AxiosResponse<GetSupplierResponse>) => {
                accept(axiosResponse.data);
            }).catch((axiosError: AxiosError<GetSupplierResponse>) => {
                reject(axiosError.response?.data);
            });
        });
    }

    /**
     * Edits the given {Supplier} in the backend.
     * @param editedSupplier .
     * @param editedContacts .
     * @returns .
     */
    public editSupplier(editedSupplier: Supplier, editedContacts: Contact[]): Promise<EditSupplierResponse> {
        return new Promise((accept, reject) => {
            const newUrl = `${this.SUPPLIERS_URL}/${editedSupplier.id}`;
            const editSupplierRequest: EditSupplierRequest = {
                contacts: editedContacts,
                supplier: editedSupplier,
            };

            axios.put(newUrl, editSupplierRequest).then((response: AxiosResponse<EditSupplierResponse>) => {
                accept(response.data);
            }).catch((error: AxiosError<EditSupplierResponse>) => {
                reject(error.response?.data);
            });
        });
    }

    /**
     * Deletes a Contact.
     * @param {string} supplierId  .
     * @param {string} contactId .
     * @returns A Promise.
     */
    public deleteContact(supplierId: string, contactId: string): Promise<DeleteContactResponse> {
        return new Promise((accept, reject) => {
            const newUrl = `${this.SUPPLIERS_URL}/${supplierId}/contacts/${contactId}`;
            axios.delete(newUrl).then((response: AxiosResponse<DeleteContactResponse>) => {
                accept(response.data);
            }).catch((error: AxiosError) => {
                reject(error.response?.data);
            });
        });
    }

    /**
     * Deletes a Supplier.
     * @param {string} supplierId  .
     * 
     * @returns a Promise.
     */
    public deleteSupplier(supplierId: string): Promise<DeleteSupplierResponse> {
        return new Promise((accept, reject) => {
            const url = `${this.SUPPLIERS_URL}/${supplierId}`;
            axios.delete(url).then((response: AxiosResponse<DeleteSupplierResponse>) => {
                accept(response.data);
            }).catch((error: AxiosError) => {
                reject(error);
            });
        });
    }

    public editContact(supplierId: string, contact: Contact): Promise<EditContactResponse> {
        return new Promise((accept, reject) => {
            const editContactRequest: EditContactRequest = {
                contact,
            };

            const url = `${this.SUPPLIERS_URL}/${supplierId}/contacts/${contact.id}`;
            axios.put(url, editContactRequest).then((response: AxiosResponse<EditContactResponse>) => {
                accept(response.data);
            }).catch((error: AxiosError) => {
                reject(error);
            });
        });
    }
}

export const suppliersClient: SuppliersClient = new SuppliersClient();