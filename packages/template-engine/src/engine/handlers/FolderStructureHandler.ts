import { 
  AppDefinition, AppType,
} from "models";
import { 
  createDirectory,
  FileSystemStructure,
  IndexableType,
} from "utils";

// ToDo: Input correct File Path
export class FolderStructureHandler {

  private readonly webApiFolderStructure: FileSystemStructure = {
    src: {
      controllers: {
      },
      middlewares: {
      },
      models: {
      },
      routes: {
      },
      services: {
      },
      utils: {
      },
    },
    tst: {
      controllers: {
      },
      middlewares: {
      },
      models: {
      },
      routes: {
      },
      services: {
      },
      utils: {
      },
    },
  };

  public buildFolderStructure(appDefinition: AppDefinition): void {
    const fileSystem = this.getFileSystemStructure(appDefinition.appType);
    this.createFileSystem(fileSystem, 'samples');
  }

  private createFileSystem(currentNode: FileSystemStructure, currentPath: string): void {
    Object.keys(currentNode).forEach((currentLeaf) => {
      const currentFolder = `${currentPath}/${currentLeaf}`;
      console.info('Attempting to Create: ', currentFolder);
      createDirectory(process.cwd(), currentFolder);
      const newNode = currentNode[currentLeaf] as FileSystemStructure;
      this.createFileSystem(newNode, currentFolder);
    });
  }

  private getFileSystemStructure(appType: AppType): FileSystemStructure {
    switch (appType) {
      case AppType.WebApi:
        return this.webApiFolderStructure;
      default:
        throw new Error('Not Implemented');
    }
  }
}