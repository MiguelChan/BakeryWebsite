import {
  CreateAccountRequest,
  CreateAccountResponse,
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

  beforeEach(() => {
    accountsService = new HerokuAccountsService(BASE_URL);
  });

  afterEach(() => {
    mockGetFn.mockClear();
    mockPostFn.mockClear();
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
});
