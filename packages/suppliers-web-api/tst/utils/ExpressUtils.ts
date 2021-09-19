export const createMockRequest = () => {
  const request: any = {
    body: {},
    params: {},
    query: {},
  };
  return request;
};

export const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn();
  res.json = jest.fn();
  res.body = {};
  return res;
};
