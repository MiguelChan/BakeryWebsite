import {
  inject,
  injectable,
} from 'inversify';
import {
  AppDefinition,
  AppType,
} from 'models';
import {
  Types,
} from 'src/di/InversifyContainer';
import {
  ModuleBuilder,
} from './ModuleBuilder';
import {
  WebAppModuleBuilder,
} from './WebAppModuleBuilder';

/**
 * Defines the Module Builder Factory.
 */
@injectable()
export class ModuleBuilderFactory {
  public constructor(
    @inject(Types.WebApiModuleBuilder) private readonly webApiModuleBuilder: ModuleBuilder,
  ) {
  }

  public getModuleBuilder(appDefinition: AppDefinition): ModuleBuilder {
    const {
      appType,
    } = appDefinition;

    switch (appType) {
      case AppType.WebApp:
        return new WebAppModuleBuilder(appDefinition);
      default:
        return this.webApiModuleBuilder;
    }
  }
}
