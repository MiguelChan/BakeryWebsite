import express from 'express';

export const createMockRequest = (): express.Request => {
  const request: any = {
    body: {},
    params: {},
    query: {},
  };
  return request;
};

export const createMockResponse = (): express.Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.sendStatus = jest.fn().mockReturnThis();
  res.body = {};
  return res;
};
