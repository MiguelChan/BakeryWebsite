import {
  parseDeleteSubAccountRequest,
} from 'controllers/parsers';
import { SubAccountsController } from 'controllers';
import { AccountsService } from 'services';
import {
  DeleteSubAccountRequest,
  DeleteSubAccountResponse,
} from '@mgl/shared-components';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

jest.mock('controllers/parsers');

describe('SubAccountsController', () => {
  let subAccountsController: SubAccountsController;
  const mockDeleteSubAccountFn = jest.fn();

  beforeEach(() => {
    const service: AccountsService = {
      createAccount: jest.fn(),
      deleteAccount: jest.fn(),
      deleteSubAccount: mockDeleteSubAccountFn,
      getAccount: jest.fn(),
      getAccounts: jest.fn(),
      putAccount: jest.fn(),
    };

    subAccountsController = new SubAccountsController(service);
  });

  afterEach(() => {
    mockDeleteSubAccountFn.mockClear();
  });

  describe('deleteSubAccount', () => {
    const mockParseDeleteSubRequestFn = parseDeleteSubAccountRequest as jest.Mock;

    afterEach(() => {
      mockParseDeleteSubRequestFn.mockClear();
    });

    it('Should delete the SubAccount', async () => {
      const expectedRequest: DeleteSubAccountRequest = {
        discrminator: 'SomeSome',
      } as any;

      const expectedResponse: DeleteSubAccountResponse = {
        discriminator: 'SomeSomeSome',
      } as any;

      const mockReq = createMockRequest();
      const mockRes = createMockResponse();

      mockParseDeleteSubRequestFn.mockReturnValueOnce(expectedRequest);
      mockDeleteSubAccountFn.mockResolvedValueOnce(expectedResponse);

      await subAccountsController.deleteSubAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(expectedResponse);
      expect(mockParseDeleteSubRequestFn).toHaveBeenCalledWith(mockReq);
      expect(mockDeleteSubAccountFn).toHaveBeenCalledWith(expectedRequest);
    });

    it('Should handle errors gracefully', async () => {
      const expectedMessage = 'An error occurred';
      const error = new Error(expectedMessage);

      const expectedRequest: DeleteSubAccountRequest = {
      } as any;

      const mockReq = createMockRequest();
      const mockRes = createMockResponse();

      mockParseDeleteSubRequestFn.mockReturnValueOnce(expectedRequest);
      mockDeleteSubAccountFn.mockRejectedValueOnce(error);

      await subAccountsController.deleteSubAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: expectedMessage,
      });
      expect(mockParseDeleteSubRequestFn).toHaveBeenCalledWith(mockReq);
      expect(mockDeleteSubAccountFn).toHaveBeenCalledWith(expectedRequest);
    });
  });
});
