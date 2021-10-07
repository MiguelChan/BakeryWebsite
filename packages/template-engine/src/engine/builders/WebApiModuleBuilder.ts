import {
  PackageJsonHandler,
  FolderStructureHandler,
} from 'engine/handlers';
import {
  AppDefinition,
} from 'models';
import { ConfigFilesHandler } from '../handlers/ConfigFilesHandler';
import { MainModuleHandler } from '../handlers/MainModuleHandler';
import {
  ModuleBuilder,
} from './ModuleBuilder';

// ToDo: Add dependency Injection
export class WebApiModuleBuilder implements ModuleBuilder {
  private readonly packageJsonHander: PackageJsonHandler;
  private readonly fileStructureHandler: FolderStructureHandler;
  private readonly mainModuleHandler: MainModuleHandler;
  private readonly configFilesHandler: ConfigFilesHandler;

  constructor(private readonly appDefinition: AppDefinition) {
    this.packageJsonHander = new PackageJsonHandler();
    this.fileStructureHandler = new FolderStructureHandler();
    this.mainModuleHandler = new MainModuleHandler();
    this.configFilesHandler = new ConfigFilesHandler();
  }

  buildModule(): void {
    console.log('Proceeding to Build a WebAPI Module');
    this.packageJsonHander.buildPackageJson(this.appDefinition);
    this.fileStructureHandler.buildFolderStructure(this.appDefinition);
    this.mainModuleHandler.buildMainModule(this.appDefinition);
    this.configFilesHandler.buildConfigFiles(this.appDefinition);
  }
}
