import express from 'express';
import { GetAccountRequest } from '@mgl/shared-components';

/**
 * Gets the {GetAccountRequest} from the express.Request and returns it.
 *
 * @param {express.Request} req The request.
 *
 * @returns The {GetAccountRequest}.
 */
export const parseGetAccountRequest = (req: express.Request): GetAccountRequest => {
  const { accountId } = req.params;
  return {
    accountId,
  };
};
