import axios, { AxiosError, AxiosResponse } from "axios";
import { Contact, ContactType, Supplier } from "../../Models";
import { CreateSupplierRequest } from "./Requests";
import { EditSupplierRequest } from "./Requests/EditSupplierRequest";
import { CreateSupplierResponse, GetSuppliersResponse } from "./Responses";
import { EditSupplierResponse } from "./Responses/EditSupplierResponse";
import { GetSupplierResponse } from "./Responses/GetSupplierResponse";
import { suppliersClient } from "./SuppliersClient";

jest.mock('axios');

describe('SuppliersClient', () => {

    const SUPPLIERS_URL = '/api/suppliers';

    const mockPostFn = axios.post as jest.Mock;
    const mockGetFn = axios.get as jest.Mock;
    const mockPutFn = axios.put as jest.Mock;

    afterEach(() => {
        mockPostFn.mockClear();
        mockGetFn.mockClear();
        mockPutFn.mockClear();
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

        it('Should return generic error message when server is fails', async () => {
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


            try {
                await suppliersClient.createSupplier(supplier, [contact]);
            } catch (createSupplierResponse) {
            } finally {
                expect(mockPostFn).toHaveBeenLastCalledWith(SUPPLIERS_URL, createSupplierRequest);
            }
        });

        it('Should return error message from the Server', async () => {
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

            try {
                await suppliersClient.createSupplier(supplier, [contact]);
            } catch (createSupplierResponse) {
            } finally {
                expect(mockPostFn).toHaveBeenCalledWith(SUPPLIERS_URL, createSupplierRequest);
            }
        });

    });

    describe('Get Suppliers', () => {

        it('Should return the Suppliers from the Server with default values', () => {
            const mockGetSuppliersResponse: GetSuppliersResponse = {
                suppliers: [],
                totalElements: 100,
            };

            const axiosResponse: AxiosResponse<GetSuppliersResponse> = buildAxiosResponse(mockGetSuppliersResponse);

            mockGetFn.mockResolvedValue(axiosResponse);

            return suppliersClient.getSuppliers().then((suppliersResponse: GetSuppliersResponse) => {
                expect(mockGetFn).toHaveBeenLastCalledWith(SUPPLIERS_URL, {
                    params: {
                        pageSize: 50,
                        pageNumber: 0,
                    },
                });

                expect(suppliersResponse).toBe(mockGetSuppliersResponse);
            });
        });

        it('Should return the Suppliers from the Server with the provided values', () => {
            const mockGetSuppliersResponse: GetSuppliersResponse = {
                suppliers: [],
                totalElements: 100,
            };

            const axiosResponse: AxiosResponse<GetSuppliersResponse> = buildAxiosResponse(mockGetSuppliersResponse);

            mockGetFn.mockResolvedValue(axiosResponse);

            return suppliersClient.getSuppliers(100, 1200).then((suppliersResponse: GetSuppliersResponse) => {
                expect(mockGetFn).toHaveBeenCalledWith(SUPPLIERS_URL, {
                    params: {
                        pageSize: 1200,
                        pageNumber: 100,
                    },
                });
                expect(suppliersResponse).toBe(mockGetSuppliersResponse);
            });
        });

        it('Should send error message when it occurs', async () => {
            const axiosResponse: AxiosError<GetSuppliersResponse> = {
                response: {
                    data: {
                        errorMessage: 'SomeSome'
                    } as any,
                } as any,
            } as any;

            mockGetFn.mockRejectedValue(axiosResponse);

            try {
                await suppliersClient.getSuppliers(100, 100);
            } catch {
            } finally {
                expect(mockGetFn).toHaveBeenCalledWith(SUPPLIERS_URL, {
                    params: {
                        pageSize: 100,
                        pageNumber: 100,
                    },
                });
            }
        });
    });

    describe('Get a Single Supplier', () => {

        it('Should return a Single Supplier', () => {
            const testSupplierId = '12345';

            const expectedSupplier: Supplier = buildRandomSupplier();
            const mockGetSupplierResponse: GetSupplierResponse = {
                supplier: expectedSupplier,
            };

            const axiosResponse = buildAxiosResponse(mockGetSupplierResponse);

            mockGetFn.mockResolvedValue(axiosResponse);

            return suppliersClient.getSupplier(testSupplierId).then((getSupplierResponse: GetSupplierResponse) => {
                expect(mockGetFn).toHaveBeenCalledWith(`${SUPPLIERS_URL}/${testSupplierId}`);
                expect(getSupplierResponse).toEqual(mockGetSupplierResponse);
            });
        });

        it('Should return the error message from the Server', async () => {
            const testSupplierId = '12345';

            const axiosResponse: AxiosError<GetSuppliersResponse> = {
                response: {
                    data: {
                        errorMessage: 'SomeSome'
                    } as any,
                } as any,
            } as any;

            mockGetFn.mockRejectedValue(axiosResponse);

            try {
                await suppliersClient.getSupplier(testSupplierId);
            } catch {
            } finally {
                expect(mockGetFn).toHaveBeenCalledWith(`${SUPPLIERS_URL}/${testSupplierId}`);
            }
        });

    });

    describe('Edit a Supplier', () => {

        it('Should call the suppliersClient for updating the Supplier', () => {
            const expectedSupplier: Supplier = buildRandomSupplier();
            const expectedContacts: Contact[] = [];

            const expectedEditSupplierRequest: EditSupplierRequest = {
                contacts: expectedContacts,
                supplier: expectedSupplier,
            };

            const expectedEditSupplierResponse: EditSupplierResponse = {};
            const axiosResponse: AxiosResponse<EditSupplierRequest> = buildAxiosResponse(expectedEditSupplierResponse);

            mockPutFn.mockResolvedValue(axiosResponse);

            return suppliersClient.editSupplier(expectedSupplier, expectedContacts).then((editSupplierResponse: EditSupplierResponse) => {
                expect(mockPutFn).toHaveBeenCalledWith(`${SUPPLIERS_URL}/${expectedSupplier.id}`, expectedEditSupplierRequest);
                expect(editSupplierResponse).toEqual(expectedEditSupplierResponse);
            });
        });

        it('Should return the error response when the server fails', async () => {
            const expectedSupplier: Supplier = buildRandomSupplier();
            const expectedContacts: Contact[] = [];

            const expectedEditSupplierRequest: EditSupplierRequest = {
                contacts: expectedContacts,
                supplier: expectedSupplier,
            };

            const axiosResponse: AxiosError<EditSupplierResponse> = {
                response: {
                    data: {
                        errorMessage: 'SomeSome'
                    } as any,
                } as any,
            } as any;

            mockPutFn.mockRejectedValue(axiosResponse);

            try {
                await suppliersClient.editSupplier(expectedSupplier, expectedContacts);
            } catch {
            } finally {
                expect(mockPutFn).toHaveBeenCalledWith(`${SUPPLIERS_URL}/${expectedSupplier.id}`, expectedEditSupplierRequest);
            }
        });
    });

    function buildAxiosResponse(data: any): AxiosResponse {
        return {
            data: data,
        } as any;
    }

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