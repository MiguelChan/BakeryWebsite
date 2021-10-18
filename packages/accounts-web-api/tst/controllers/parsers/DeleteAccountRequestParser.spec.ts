import express from 'express';
import { parseDeleteAccountRequest } from 'controllers/parsers';
import { createMockRequest } from '../../utils/ExpressUtils';

describe('DeleteAccountRequestParser', () => {
  it('Should create the DeleteAccountRequest', () => {
    const expectedAccountId = 'SomeAccountId';

    const mockReq: express.Request = createMockRequest();
    mockReq.params.accountId = expectedAccountId;

    const request = parseDeleteAccountRequest(mockReq);

    expect(request.accountId).toEqual(expectedAccountId);
  });
});
