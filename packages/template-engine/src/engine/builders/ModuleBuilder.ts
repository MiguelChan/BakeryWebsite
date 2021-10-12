import {
  AppDefinition,
} from 'models';

export interface ModuleBuilder {
  buildModule(appDefinition: AppDefinition): void;
}
