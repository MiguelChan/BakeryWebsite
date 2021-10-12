import { PackageJsonHandler } from 'engine/handlers';
import {
  AppDefinition,
  AppType,
} from 'models';
import {
  createDirectory,
  createFile,
} from 'utils';

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  createDirectory: jest.fn(),
  createFile: jest.fn(),
}));

describe('PackageJsonHandler', () => {
  const TEST_APP_NAME = 'AnAppName';
  const TEST_VERSION = 'V1.0.0';
  const TEST_DESCRIPTION = 'Description';

  const mockCreateDirectoryFn = createDirectory as jest.Mock;
  const mockCreateFileFn = createFile as jest.Mock;

  let packageJsonHandler: PackageJsonHandler;

  beforeEach(() => {
    packageJsonHandler = new PackageJsonHandler();
  });

  afterEach(() => {
    mockCreateDirectoryFn.mockClear();
    mockCreateFileFn.mockClear();
  });

  const buildAppDefinition = (appType: AppType): AppDefinition => ({
    appName: TEST_APP_NAME,
    version: TEST_VERSION,
    appDescription: TEST_DESCRIPTION,
    appType,
  });

  it('Should throw an Exception when using the WebApp package', async () => {
    const appDefinition = buildAppDefinition(AppType.WebApp);

    try {
      await packageJsonHandler.handle(appDefinition);
    } catch (exception: any) {
      expect(exception.message).toEqual('Not implemented');
    }
  });

  it('Should create the package.json file for the WebApi', async () => {
    const expectedWorkingDir = 'a/working/directory';
    const appDefinition = buildAppDefinition(AppType.WebApi);

    mockCreateDirectoryFn.mockReturnValueOnce(expectedWorkingDir);

    await packageJsonHandler.handle(appDefinition);

    expect(mockCreateDirectoryFn).toHaveBeenCalledWith(expect.anything(), 'samples');
    expect(mockCreateFileFn).toHaveBeenCalledWith(expectedWorkingDir, 'package.json', expect.anything());
  });
});
