import {
  AppDefinition,
  AppType,
} from 'models';
import { ModuleBuilder } from './ModuleBuilder';
import { WebApiModuleBuilder } from './WebApiModuleBuilder';
import { WebAppModuleBuilder } from './WebAppModuleBuilder';

/**
 * Defines the Module Builder Factory.
 */
export class ModuleBuilderFactory {
  public getModuleBuilder(appDefinition: AppDefinition): ModuleBuilder {
    const {
      appType,
    } = appDefinition;

    switch (appType) {
      case AppType.WebApp:
        return new WebAppModuleBuilder(appDefinition);
      default:
        return new WebApiModuleBuilder(appDefinition);
    }
  }
}
