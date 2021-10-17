import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountResponse,
  GetAccountsResponse,
} from '@mgl/shared-components';
import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';
import {
  accountsClient,
} from './AccountsClient';

jest.mock('axios');

describe('AccountsClient', () => {
  const mockGetFn = axios.get as jest.Mock;
  const mockPostFn = axios.post as jest.Mock;

  afterEach(() => {
    mockGetFn.mockClear();
    mockPostFn.mockClear();
  });

  describe('getAccounts', () => {
    it('Should get the Accounts', () => {
      const expectedResponse = {
        discriminator: 'Response',
      };

      const axiosResponse: AxiosResponse = {
        data: expectedResponse,
      } as any;

      mockGetFn.mockResolvedValueOnce(axiosResponse);

      return accountsClient.getAccounts().then((result: GetAccountsResponse) => {
        expect(result).toStrictEqual(expectedResponse);
        expect(mockGetFn).toHaveBeenCalledWith('/api/accounts');
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedError: AxiosError = {
        discrminator: 'SomeSome',
      } as any;

      mockGetFn.mockRejectedValueOnce(expectedError);

      return accountsClient.getAccounts().catch((error: any) => {
        expect(error).toEqual(expectedError);
        expect(mockGetFn).toHaveBeenCalledWith('/api/accounts');
      });
    });
  });

  describe('createAccount', () => {
    it('Should create the Account', () => {
      const expectedRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'miguel',
      };

      const expectedResponse: CreateAccountResponse = {
        accountId: 'SomeSome',
        message: null,
        success: true,
      };

      const axiosResponse = buildAxiosResponse(expectedResponse);
      mockPostFn.mockResolvedValueOnce(axiosResponse);

      return accountsClient.createAccount(expectedRequest).then((response: CreateAccountResponse) => {
        expect(expectedResponse).toStrictEqual(response);
        expect(mockPostFn).toHaveBeenCalledWith('/api/accounts', expectedRequest);
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'miguel',
      };

      const expectedError = new Error('Something Went Wrong');
      mockPostFn.mockRejectedValueOnce(expectedError);

      return accountsClient.createAccount(expectedRequest).catch((error: any) => {
        expect(error).toStrictEqual(expectedError);
        expect(mockPostFn).toHaveBeenCalledWith('/api/accounts', expectedRequest);
      });
    });
  });

  describe('getAccount', () => {
    it('Should get a Single Account', () => {
      const expectedAccountId = 'AnAccountId';
      const expectedResponse: GetAccountResponse = {
        disc: 'Discriminator',
      } as any;

      const axiosResponse = buildAxiosResponse(expectedResponse);
      mockGetFn.mockResolvedValueOnce(axiosResponse);

      return accountsClient.getAccount(expectedAccountId).then((response: GetAccountResponse) => {
        expect(response).toStrictEqual(expectedResponse);
        expect(mockGetFn).toHaveBeenCalledWith(`/api/accounts/${expectedAccountId}`);
      });
    });

    it('Should handle errors gracefully', () => {
      const expectedAccountId = 'AnAccountId';
      const expectedError = new Error('Something went wrong');

      mockGetFn.mockRejectedValueOnce(expectedError);

      return accountsClient.getAccount(expectedAccountId).catch((error: any) => {
        expect(error).toStrictEqual(expectedError);
        expect(mockGetFn).toHaveBeenCalledWith(`/api/accounts/${expectedAccountId}`);
      });
    });
  });

  const buildAxiosResponse = <T> (object: T): AxiosResponse<T> => {
    const axiosResponse: AxiosResponse<T> = {
      data: object,
    } as any;
    return axiosResponse;
  };
});
