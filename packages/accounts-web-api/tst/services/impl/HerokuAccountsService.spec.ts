import {
  GetAccountsResponse,
} from '@mgl/shared-components';
import axios, { AxiosResponse } from 'axios';
import { HerokuAccountsService } from 'services';

jest.mock('axios');

describe('HerokuAccountsService', () => {
  const BASE_URL = 'https://this.is.an.url.com';

  let accountsService: HerokuAccountsService;

  const mockGetFn = axios.get as jest.Mock;

  beforeEach(() => {
    accountsService = new HerokuAccountsService(BASE_URL);
  });

  afterEach(() => {
    mockGetFn.mockClear();
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
});
