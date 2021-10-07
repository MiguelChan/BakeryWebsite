import {
  ModuleBuilderFactory,
} from 'engine/builders';
import {
  AppDefinition,
  AppType,
} from 'models';

// const appDefBuilder: AppDefinitionBuilder = new AppDefinitionBuilder();
// appDefBuilder.fetchAppDefinition().then((result: AppDefinition) => {
//   const moduleBuilderFactory = new ModuleBuilderFactory();
//   const moduleBuilder = moduleBuilderFactory.getModuleBuilder(result);
//   moduleBuilder.buildModule();
// });
const appDefinition: AppDefinition = {
  appName: '@mgl/test-test',
  appType: AppType.WebApi,
  appDescription: '',
  version: '1.1.0',
};

const moduleBuilderFactory = new ModuleBuilderFactory();
const moduleBuilder = moduleBuilderFactory.getModuleBuilder(appDefinition);
moduleBuilder.buildModule();
