import express from 'express';
import { parseGetAccountRequest } from 'controllers/parsers';
import {
  createMockRequest,
} from '../../utils/ExpressUtils';

describe('GetAccountRequestParser', () => {
  it('Should parse the request', () => {
    const expectedAccountId = 'ThisIsAnAccountId';

    const mockRequest: express.Request = createMockRequest();
    mockRequest.params.accountId = expectedAccountId;

    const getAccountRequest = parseGetAccountRequest(mockRequest);

    expect(getAccountRequest.accountId).toEqual(expectedAccountId);
  });
});
