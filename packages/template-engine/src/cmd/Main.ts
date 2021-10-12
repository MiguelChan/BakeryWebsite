import {
  Types,
} from 'di';
import {
  ModuleBuilder,
  ModuleBuilderFactory,
} from 'engine/builders';
import {
  inject,
  injectable,
} from 'inversify';
import {
  AppDefinition,
} from 'models';
import {
  AppDefinitionBuilder,
} from 'cmd';

/**
 * Main entry point of our CLI.
 */
@injectable()
export class Main {
  constructor(
    @inject(Types.AppDefBuilder) private readonly appDefinitionBuilder: AppDefinitionBuilder,
    @inject(Types.ModuleBuilderFactory) private readonly moduleBuilderFactory: ModuleBuilderFactory,
  ) {

  }

  public async runApp(): Promise<void> {
    const appDefinition: AppDefinition = await this.appDefinitionBuilder.fetchAppDefinition();
    const moduleBuilder: ModuleBuilder = this.moduleBuilderFactory.getModuleBuilder(appDefinition);
    moduleBuilder.buildModule(appDefinition);
  }
}
