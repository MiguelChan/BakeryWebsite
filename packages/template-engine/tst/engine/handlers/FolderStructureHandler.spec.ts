import { FolderStructureHandler } from 'engine/handlers';
import {
  AppDefinition,
  AppType,
} from 'models';
import {
  createDirectory,
  FileSystemStructure,
} from 'utils';

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  createDirectory: jest.fn(),
}));

describe('FolderStructureHandler', () => {
  const TEST_APP_DEF: AppDefinition = {
    appName: '',
    appType: AppType.WebApi,
    version: '',
    appDescription: '',
  };

  const mockCreateDirectoryFn = createDirectory as jest.Mock;

  afterEach(() => {
    mockCreateDirectoryFn.mockClear();
  });

  it('Should do nothing when the provided FileSystem is empty', async () => {
    const folderHandler = new FolderStructureHandler({});

    await folderHandler.handle(TEST_APP_DEF);

    expect(mockCreateDirectoryFn).not.toHaveBeenCalled();
  });

  it('Should create the provided FileSystem', async () => {
    const fileSystem: FileSystemStructure = {
      src: {
        controllers: {},
      },
      tst: {
        controllers: {},
      },
    };

    const folderHandler = new FolderStructureHandler(fileSystem);

    await folderHandler.handle(TEST_APP_DEF);

    expect(mockCreateDirectoryFn).toHaveBeenNthCalledWith(1, expect.anything(), 'samples/src');
    expect(mockCreateDirectoryFn).toHaveBeenNthCalledWith(2, expect.anything(), 'samples/src/controllers');
    expect(mockCreateDirectoryFn).toHaveBeenNthCalledWith(3, expect.anything(), 'samples/tst');
    expect(mockCreateDirectoryFn).toHaveBeenNthCalledWith(4, expect.anything(), 'samples/tst/controllers');
  });
});
