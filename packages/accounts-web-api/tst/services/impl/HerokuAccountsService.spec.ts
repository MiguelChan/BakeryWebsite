import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteSubAccountRequest,
  DeleteSubAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsResponse,
} from '@mgl/shared-components';
import axios, { AxiosResponse } from 'axios';
import { HerokuAccountsService } from 'services';

jest.mock('axios');

describe('HerokuAccountsService', () => {
  const BASE_URL = 'https://this.is.an.url.com';

  let accountsService: HerokuAccountsService;

  const mockGetFn = axios.get as jest.Mock;
  const mockPostFn = axios.post as jest.Mock;
  const mockDeleteFn = axios.delete as jest.Mock;

  beforeEach(() => {
    accountsService = new HerokuAccountsService(BASE_URL);
  });

  afterEach(() => {
    mockGetFn.mockClear();
    mockPostFn.mockClear();
    mockDeleteFn.mockClear();
  });

  const createAxiosResponse = <T> (response: T): AxiosResponse<T> => {
    const axiosResponse: Partial<AxiosResponse<T>> = {
      data: response,
    };

    return axiosResponse as any;
  };

  describe('getAccounts', () => {
    const API_ENDPOINT = `${BASE_URL}/accounts`;

    it('Should get All the Accounts', () => {
      const expectedResponse = {
        discriminator: 'ExpectedResponse',
      } as any;

      const response = createAxiosResponse<GetAccountsResponse>(expectedResponse);

      mockGetFn.mockResolvedValueOnce(response);

      return accountsService.getAccounts({}).then((result: GetAccountsResponse) => {
        expect(result).toStrictEqual(expectedResponse);
        expect(mockGetFn).toHaveBeenCalledWith(API_ENDPOINT);
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedError = {
        discriminator: 'ExpectedError',
      } as any;

      const axiosError = new Error(expectedError);

      mockGetFn.mockRejectedValueOnce(axiosError);

      return accountsService.getAccounts({}).catch((error: Error) => {
        expect(error).toEqual(axiosError);
        expect(mockGetFn).toHaveBeenCalledWith(API_ENDPOINT);
      });
    });
  });

  describe('createAccount', () => {
    const API_ENDPOINT = `${BASE_URL}/accounts`;

    it('Should create an Account', () => {
      const expectedResponse: CreateAccountResponse = {
        accountId: 'SomeSome',
        message: null,
        success: true,
      };

      const axiosResponse = createAxiosResponse(expectedResponse);

      mockPostFn.mockResolvedValueOnce(axiosResponse);

      const expectedRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'SomeSome',
      };

      return accountsService.createAccount(expectedRequest).then((response: CreateAccountResponse) => {
        expect(response).toStrictEqual(expectedResponse);
        expect(mockPostFn).toHaveBeenCalledWith(API_ENDPOINT, expectedRequest);
      });
    });

    it('Should handle erros gracefully', () => {
      const expectedError: Error = new Error('Some Error');

      mockPostFn.mockRejectedValueOnce(expectedError);

      const expectedRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'SomeSome',
      };

      return accountsService.createAccount(expectedRequest).catch((error: Error) => {
        expect(error).toEqual(expectedError);
        expect(mockPostFn).toHaveBeenCalledWith(API_ENDPOINT, expectedRequest);
      });
    });
  });

  describe('getAccount', () => {
    it('Should get a single Account', () => {
      const expectedResponse: GetAccountsResponse = {
        discriminator: 'Response',
      } as any;

      const expectedAccountId = 'SomeId';
      const expectedUrl = `${BASE_URL}/accounts/${expectedAccountId}`;
      const request: GetAccountRequest = {
        accountId: expectedAccountId,
      };

      const axiosResponse = createAxiosResponse(expectedResponse);
      mockGetFn.mockResolvedValueOnce(axiosResponse);

      return accountsService.getAccount(request).then((response: GetAccountResponse) => {
        expect(response).toStrictEqual(expectedResponse);
        expect(mockGetFn).toHaveBeenCalledWith(expectedUrl);
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedError = new Error('This is dead');
      const expectedAccountId = 'SomeAccountId';
      const expectedUrl = `${BASE_URL}/accounts/${expectedAccountId}`;
      const request: GetAccountRequest = {
        accountId: expectedAccountId,
      };

      mockGetFn.mockRejectedValueOnce(expectedError);

      return accountsService.getAccount(request).catch((error: any) => {
        expect(error).toEqual(expectedError);
        expect(mockGetFn).toHaveBeenCalledWith(expectedUrl);
      });
    });
  });

  describe('deleteAccount', () => {
    const TEST_ACCOUNT_ID = 'SomeAccountId';
    const EXPECTED_DELETE_URL = `${BASE_URL}/accounts/${TEST_ACCOUNT_ID}`;

    it('Should delete the Account', () => {
      const request: DeleteAccountRequest = {
        accountId: TEST_ACCOUNT_ID,
      };

      const expectedResponse: DeleteAccountResponse = {
        deletedAccount: {} as any,
        success: true,
      };

      const axiosResponse = createAxiosResponse(expectedResponse);
      mockDeleteFn.mockResolvedValueOnce(axiosResponse);

      return accountsService.deleteAccount(request).then((response: DeleteAccountResponse) => {
        expect(response).toStrictEqual(expectedResponse);
        expect(mockDeleteFn).toHaveBeenCalledWith(EXPECTED_DELETE_URL);
      });
    });

    it('Should handle errors gracefully', () => {
      const request: DeleteAccountRequest = {
        accountId: TEST_ACCOUNT_ID,
      };

      const expectedError = new Error('Something went wrong');
      mockDeleteFn.mockRejectedValueOnce(expectedError);

      return accountsService.deleteAccount(request).catch((error: any) => {
        expect(error).toEqual(expectedError);
        expect(mockDeleteFn).toHaveBeenCalledWith(EXPECTED_DELETE_URL);
      });
    });
  });

  describe('deleteSubAccont', () => {
    const TEST_SUBACCOUNT_ID = 'SomeId';
    const TEST_EXPECTED_URL = `${BASE_URL}/subAccounts/${TEST_SUBACCOUNT_ID}`;
    const TEST_REQUEST: DeleteSubAccountRequest = {
      subAccountId: TEST_SUBACCOUNT_ID,
    };

    it('Should delete the SubAccount', () => {
      const expectedResponse: DeleteSubAccountResponse = {
        deletedSubAccount: {} as any,
        success: true,
      };

      const axiosResponse = createAxiosResponse(expectedResponse);
      mockDeleteFn.mockResolvedValueOnce(axiosResponse);

      return accountsService.deleteSubAccount(TEST_REQUEST).then((response: DeleteSubAccountResponse) => {
        expect(response).toStrictEqual(expectedResponse);
        expect(mockDeleteFn).toHaveBeenCalledWith(TEST_EXPECTED_URL);
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedError = new Error('An error has occurred');

      mockDeleteFn.mockRejectedValueOnce(expectedError);

      return accountsService.deleteSubAccount(TEST_REQUEST).catch((error: any) => {
        expect(error).toEqual(expectedError);
        expect(mockDeleteFn).toHaveBeenCalledWith(TEST_EXPECTED_URL);
      });
    });
  });
});
