import express from 'express';
import { DeleteAccountRequest } from '@mgl/shared-components';

/**
 * Parses the Delete Account Request.
 * @param req .
 * @returns .
 */
export const parseDeleteAccountRequest = (req: express.Request): DeleteAccountRequest => {
  const {
    accountId,
  } = req.params;

  return {
    accountId,
  };
};
