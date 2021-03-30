import axios, { AxiosError, AxiosResponse } from "axios";
import { Contact, ContactType, Supplier } from "../../Models";
import { CreateSupplierRequest } from "./Requests";
import { CreateSupplierResponse } from "./Responses";
import { suppliersClient } from "./SuppliersClient";

jest.mock('axios');

describe('SuppliersClient', () => {

    const SUPPLIERS_URL = '/api/suppliers';

    const mockPostFn = axios.post as jest.Mock;

    afterEach(() => {
        mockPostFn.mockClear();
    });

    describe('Create Supplier', () => {

        it('Should create the Supplier', () => {
            const supplier: Supplier = buildRandomSupplier();
            const contact: Contact = buildRandomContact();

            const createSupplierRequest: CreateSupplierRequest = {
                contacts: [contact],
                supplier: supplier,
            };

            const axiosResponse: Partial<AxiosResponse<CreateSupplierResponse>> = {
                data: {},
            };
            mockPostFn.mockResolvedValue(axiosResponse);

            return suppliersClient.createSupplier(supplier, [contact]).then((createSupplierResponse: CreateSupplierResponse) => {
                expect(mockPostFn).toHaveBeenCalledWith(SUPPLIERS_URL, createSupplierRequest);
                expect(createSupplierResponse).not.toBeNull();
                expect(createSupplierResponse.errorMessage).toBeUndefined();
            });
        });

        it('Should return generic error message when server is fails', () => {
            const supplier: Supplier = buildRandomSupplier();
            const contact: Contact = buildRandomContact();

            const createSupplierRequest: CreateSupplierRequest = {
                contacts: [contact],
                supplier: supplier,
            };

            const axiosError: Partial<AxiosError<CreateSupplierResponse>> = {
                response: {
                    status: 500,
                } as any,
            };

            mockPostFn.mockRejectedValue(axiosError);

            return suppliersClient.createSupplier(supplier, [contact]).catch((createSupplierResponse: CreateSupplierResponse) => {
                expect(mockPostFn).toHaveBeenLastCalledWith(SUPPLIERS_URL, createSupplierRequest);
                expect(createSupplierResponse).not.toBeNull();
                expect(createSupplierResponse.errorMessage).toBeDefined();
                expect(createSupplierResponse.errorMessage).not.toBeNull();
            });
        });

        it('Should return error message from the Server', () => {
            const supplier: Supplier = buildRandomSupplier();
            const contact: Contact = buildRandomContact();

            const createSupplierRequest: CreateSupplierRequest = {
                contacts: [contact],
                supplier: supplier,
            };

            const axiosError: Partial<AxiosError<CreateSupplierResponse>> = {
                response: {
                    data: {
                        errorMessage: 'An error occured',
                    },
                } as any,
            };

            mockPostFn.mockRejectedValue(axiosError);

            return suppliersClient.createSupplier(supplier, [contact]).catch((createSupplierResponse: CreateSupplierResponse) => {
                expect(mockPostFn).toHaveBeenCalledWith(SUPPLIERS_URL, createSupplierRequest);
                expect(createSupplierResponse).not.toBeNull();
                expect(createSupplierResponse.errorMessage).toBeDefined();
                expect(createSupplierResponse.errorMessage).toBe(axiosError.response!.data.errorMessage);
            });
        });

    });

    function buildRandomSupplier(): Supplier {
        return {
            contacts: [],
            addressLine1: 'AddressLine1',
            addressLine2: 'AddressLine2',
            id: '',
            name: 'Name',
            phoneNumber: 'PhoneNumber',
        };
    }

    function buildRandomContact(): Contact {
        return {
            contactFirstName: 'contactFirstName',
            contactLastName: 'contactLastName',
            contactType: ContactType.Returns,
            emailAddress: 'emailAddress',
            id: '',
            phoneNumber: 'PhoneNumber',
        };
    }

});