import debug from 'debug';
import {
  injectable,
} from 'inversify';
import {
  AppDefinition,
} from 'models';
import {
  createDirectory,
  FileSystemStructure,
} from 'utils';
import {
  Handler,
} from './Handler';

const logger: debug.IDebugger = debug('folderStructureHandler');

/**
 * Handler that handles the creation of the FolderStructure for a given project.
 */
// ToDo: Input correct File Path
@injectable()
export class FolderStructureHandler implements Handler {
  /**
   * Default constructor.
   * @param {FileSystemStructure} fileSystem The fileSystem to be used against this Module.
   */
  public constructor(private readonly fileSystem: FileSystemStructure) {
    logger('Creating FolderStructureHandler for FileSystem: %j', fileSystem);
  }

  /**
   * Handles the creation of the FolderStructure.
   *
   * @param {AppDefinition} appDefinition The app definition.
   */
  async handle(appDefinition: AppDefinition): Promise<void> {
    logger(appDefinition);
    this.createFileSystem(this.fileSystem, 'samples');
  }

  private createFileSystem(currentNode: FileSystemStructure, currentPath: string): void {
    Object.keys(currentNode).forEach((currentLeaf) => {
      const currentFolder = `${currentPath}/${currentLeaf}`;
      logger('Attempting to Create: ', currentFolder);
      createDirectory(process.cwd(), currentFolder);
      const newNode = currentNode[currentLeaf] as FileSystemStructure;
      this.createFileSystem(newNode, currentFolder);
    });
  }
}
