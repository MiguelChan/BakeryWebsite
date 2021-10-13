import { GetAccountsResponse } from '@mgl/shared-components';
import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  accountsClient,
} from './AccountsClient';

jest.mock('axios');

describe('AccountsClient', () => {

  const mockGetFn = axios.get as jest.Mock;
  
  afterEach(() => {
    mockGetFn.mockClear();
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
});