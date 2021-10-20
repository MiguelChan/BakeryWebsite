import { PutAccountRequest } from '@mgl/shared-components';
import { parsePutAccountRequest } from 'controllers/parsers';
import express from 'express';
import { createMockRequest } from '../../utils/ExpressUtils';

describe('PutAccountRequestParser', () => {
  it('Should return the PutAccountRequest', () => {
    const expectedRequest: PutAccountRequest = {
      updatedAccount: {} as any,
      updatingUser: 'SomeSme',
    };

    const mockReq: express.Request = createMockRequest();
    mockReq.body = expectedRequest;

    const request = parsePutAccountRequest(mockReq);

    expect(request).toEqual(expectedRequest);
  });
});
