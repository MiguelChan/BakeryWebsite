import express from 'express';
import { PutAccountRequest } from '@mgl/shared-components';

/**
 * Gets the PutAccountRequest from the express Request.
 *
 * @param req .
 * @returns .
 */
export const parsePutAccountRequest = (req: express.Request): PutAccountRequest => req.body as PutAccountRequest;
