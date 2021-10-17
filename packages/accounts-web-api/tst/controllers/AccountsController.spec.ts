import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountsResponse,
} from '@mgl/shared-components';
import { AccountsController } from 'controllers';
import { AccountsService } from 'services';
import express from 'express';
import {
  parseGetAccountRequest,
} from 'controllers/parsers';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

jest.mock('controllers/parsers');

describe('AccountsController', () => {
  let accountsController: AccountsController;

  const mockAccountsService: AccountsService = {
    getAccounts: jest.fn(),
    createAccount: jest.fn(),
    getAccount: jest.fn(),
  };

  const mockGetAccountsFn = mockAccountsService.getAccounts as jest.Mock;
  const mockCreateAccountFn = mockAccountsService.createAccount as jest.Mock;
  const mockGetAccountFn = mockAccountsService.getAccount as jest.Mock;

  beforeEach(() => {
    accountsController = new AccountsController(mockAccountsService);
  });

  afterEach(() => {
    mockGetAccountsFn.mockClear();
    mockCreateAccountFn.mockClear();
    mockGetAccountFn.mockClear();
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

  describe('createAccount', () => {
    it('Should create the Account', () => {
      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();

      const expectedCreateAccountRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'someSome',
      };

      mockReq.body = expectedCreateAccountRequest;

      const expectedResponse: CreateAccountResponse = {
        accountId: 'SomeSome',
        message: null,
        success: true,
      };

      mockCreateAccountFn.mockResolvedValueOnce(expectedResponse);

      return accountsController.createAccount(mockReq, mockRes).then(() => {
        expect(mockCreateAccountFn).toHaveBeenCalledWith(expectedCreateAccountRequest);
        expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
      });
    });

    it('Should handle errors gracefully', () => {
      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();

      const expectedRequest: CreateAccountRequest = {
        account: {} as any,
        requestingUser: 'someSome',
      };

      mockReq.body = expectedRequest;

      const expectedErrorMessage = 'This is an error';
      const exception = new Error(expectedErrorMessage);

      mockCreateAccountFn.mockRejectedValueOnce(exception);

      return accountsController.createAccount(mockReq, mockRes).then(() => {
        expect(mockCreateAccountFn).toHaveBeenCalledWith(expectedRequest);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: expectedErrorMessage,
        });
        expect(mockRes.status).toHaveBeenCalledWith(500);
      });
    });
  });

  describe('getAccount', () => {
    const mockParseGetAccountRequestFn = parseGetAccountRequest as jest.Mock;

    afterEach(() => {
      mockParseGetAccountRequestFn.mockClear();
    });

    it('Should get a Single Account', async () => {
      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();
      const expectedGetAccountRequest = {
        discriminator: 'Discriminator',
      } as any;

      const expectedResponse = {
        discr: 'Rsponse',
      };

      mockParseGetAccountRequestFn.mockReturnValueOnce(expectedGetAccountRequest);
      mockGetAccountFn.mockResolvedValueOnce(expectedResponse);

      await accountsController.getAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(expectedResponse);
    });

    it('Should handle errors gracefully', async () => {
      const mockReq: express.Request = createMockRequest();
      const mockRes: express.Response = createMockResponse();
      const expectedGetAccountRequest = {
        discriminator: 'Discriminator',
      } as any;
      const expectedErrorMessage = 'ThisIsError';

      mockParseGetAccountRequestFn.mockReturnValueOnce(expectedGetAccountRequest);
      mockGetAccountFn.mockRejectedValueOnce(new Error(expectedErrorMessage));

      await accountsController.getAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: expectedErrorMessage,
      });
    });
  });
});
