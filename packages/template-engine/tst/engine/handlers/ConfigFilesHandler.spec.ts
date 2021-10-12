import {
  ConfigFilesHandler,
} from 'engine/handlers';
import {
  AppDefinition,
  AppType,
} from 'models';

import path from 'path';
import readline from 'readline';
import fs from 'fs';
import { IndexableType } from 'utils';

jest.mock('path');
jest.mock('readline');
jest.mock('fs');

describe('ConfigFilesHandler', () => {
  const TEST_APP_DEF: AppDefinition = {
    appName: '',
    appType: AppType.WebApi,
    version: '',
    appDescription: '',
  };

  const mockResolveFn = path.resolve as jest.Mock;
  const mockCreateReadStreamFn = fs.createReadStream as jest.Mock;
  const mockCreateWriteStreamFn = fs.createWriteStream as jest.Mock;
  const mockCreateInterfaceFn = readline.createInterface as jest.Mock;

  afterEach(() => {
    mockResolveFn.mockClear();
    mockCreateReadStreamFn.mockClear();
    mockCreateWriteStreamFn.mockClear();
    mockCreateInterfaceFn.mockClear();
  });

  it('Should do nothing when the provided TemplateFiles are empty', async () => {
    const filesHandler = new ConfigFilesHandler({});

    await filesHandler.handle(TEST_APP_DEF);

    expect(mockResolveFn).not.toHaveBeenCalled();
    expect(mockCreateReadStreamFn).not.toHaveBeenCalled();
    expect(mockCreateWriteStreamFn).not.toHaveBeenCalled();
    expect(mockCreateInterfaceFn).not.toHaveBeenCalled();
  });

  it('Should create the Configuration Files when provided', async () => {
    const templateName = 'aTemplateName';
    const outputName = 'aTemplateName.json';

    const configFiles: IndexableType = {
      aTemplateName: outputName,
    };

    const expectedOutputFilePath = 'a/path/to/someWhere';
    mockResolveFn.mockReturnValue(expectedOutputFilePath);

    const expectedTemplatedDir = 'a/path/to/some/template';
    mockResolveFn.mockReturnValue(expectedTemplatedDir);

    const expectedTemplateReadLine = {};
    mockCreateInterfaceFn.mockReturnValue(expectedTemplateReadLine);

    const filesHandler = new ConfigFilesHandler(configFiles);

    await filesHandler.handle(TEST_APP_DEF);

    expect(mockResolveFn).toHaveBeenNthCalledWith(1, expect.anything(), 'samples', outputName);
    expect(mockResolveFn).toHaveBeenLastCalledWith(expect.anything(), templateName);
    expect(mockCreateReadStreamFn).toHaveBeenCalledWith(expectedTemplatedDir);
  });
});
