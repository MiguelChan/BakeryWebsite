import { AppDefinition } from 'models';
import { ModuleBuilder } from './ModuleBuilder';

export class WebAppModuleBuilder implements ModuleBuilder {
  public constructor(private readonly appDefinition: AppDefinition) {
  }

  buildModule(): void {
    throw new Error('Method not implemented.');
  }
}
