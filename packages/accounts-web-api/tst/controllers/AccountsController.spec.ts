import { GetAccountsResponse } from '@mgl/shared-components';
import { AccountsController } from 'controllers';
import { AccountsService } from 'services';
import express from 'express';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

describe('AccountsController', () => {
  let accountsController: AccountsController;

  const mockAccountsService: AccountsService = {
    getAccounts: jest.fn(),
  };

  const mockGetAccountsFn = mockAccountsService.getAccounts as jest.Mock;

  beforeEach(() => {
    accountsController = new AccountsController(mockAccountsService);
  });

  afterEach(() => {
    mockGetAccountsFn.mockClear();
  });

  describe('getAccounts', () => {
    it('Should get the Accounts', () => {
      const getAccountsResponse: GetAccountsResponse = {
        discriminator: 'somesome',
      } as any;

      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      mockGetAccountsFn.mockResolvedValueOnce(getAccountsResponse);

      return accountsController.getAccounts(mockRequest, mockResponse).then(() => {
        expect(mockGetAccountsFn).toHaveBeenCalledWith({});
        expect(mockResponse.json).toHaveBeenCalledWith(getAccountsResponse);
      });
    });

    it('Should handle erros gracefully', () => {
      const mockRequest: express.Request = createMockRequest();
      const mockResponse: express.Response = createMockResponse();

      const expectedErrorMessage = 'Something went wrong';
      const error = new Error(expectedErrorMessage);

      mockGetAccountsFn.mockRejectedValueOnce(error);

      return accountsController.getAccounts(mockRequest, mockResponse).catch(() => {
        expect(mockGetAccountsFn).toHaveBeenCalledWith({});
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: expectedErrorMessage,
        });
      });
    });
  });
});
