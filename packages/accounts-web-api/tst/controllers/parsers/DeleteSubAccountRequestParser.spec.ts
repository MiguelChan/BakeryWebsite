import { parseDeleteSubAccountRequest } from 'controllers/parsers';
import express from 'express';
import { createMockRequest } from '../../utils/ExpressUtils';

describe('DeleteSubAccountRequestParser', () => {
  it('Should parse the DeleteSubAccountRequest', () => {
    const expectedSubAccountId = 'SomeId';

    const mockReq: express.Request = createMockRequest();
    mockReq.params.subAccountId = expectedSubAccountId;

    const request = parseDeleteSubAccountRequest(mockReq);

    expect(request.subAccountId).toEqual(expectedSubAccountId);
  });
});
