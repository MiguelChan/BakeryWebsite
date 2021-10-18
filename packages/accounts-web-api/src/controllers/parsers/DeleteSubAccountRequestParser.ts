import { DeleteSubAccountRequest } from '@mgl/shared-components';
import express from 'express';

/**
 * Parses the Delete SubAccount Request.
 * @param req .
 * @returns .
 */
export const parseDeleteSubAccountRequest = (req: express.Request): DeleteSubAccountRequest => {
  const {
    subAccountId,
  } = req.params;

  return {
    subAccountId,
  };
};
