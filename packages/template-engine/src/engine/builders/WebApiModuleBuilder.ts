import {
  Handler,
} from 'engine/handlers';
import {
  inject,
  injectable,
} from 'inversify';
import {
  AppDefinition,
} from 'models';
import {
  ModuleBuilder,
} from 'engine/builders';
import {
  Types,
} from '../../di/InversifyContainer';

// ToDo: Add dependency Injection
@injectable()
export class WebApiModuleBuilder implements ModuleBuilder {
  private readonly handlers: Handler[];

  constructor(
  @inject(Types.PackageJsonHandler) packageJsonHandler: Handler,
    @inject(Types.WebApiFolderHandler) webApiFolderHandler: Handler,
    @inject(Types.WebApiConfigHandler) configFilesHandler: Handler,
    @inject(Types.MainModuleHandler) mainModuleHandler: Handler,
  ) {
    this.handlers = [
      packageJsonHandler,
      webApiFolderHandler,
      configFilesHandler,
      mainModuleHandler,
    ];
  }

  buildModule(appDefinition: AppDefinition): void {
    this.handlers.forEach((currentHandler: Handler) => currentHandler.handle(appDefinition));
  }
}
