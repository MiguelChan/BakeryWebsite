import {
  AppDefinitionBuilder,

  Main,
} from 'cmd';
import debug from 'debug';
import {
  ModuleBuilder,
  ModuleBuilderFactory,
  WebApiModuleBuilder,
} from 'engine/builders';
import {
  ConfigFilesHandler,
  FolderStructureHandler,
  Handler,
  PackageJsonHandler,
  MainModuleHandler,
} from 'engine/handlers';
import {
  Container,
} from 'inversify';
import {
  FileSystemStructure,
  IndexableType,
} from 'utils';

const logger: debug.IDebugger = debug('inversifyContainer');

export const Types = {
  Main: Symbol.for('MainApp'),
  AppDefBuilder: Symbol.for('AppDefinitionBuilder'),
  ModuleBuilderFactory: Symbol.for('ModuleBuilderFactory'),
  WebApiConfigHandler: Symbol.for('WebApiConfigHandler'),
  WebApiFolderHandler: Symbol.for('WebApiFolderHandler'),
  PackageJsonHandler: Symbol.for('PackageJsonHandler'),
  MainModuleHandler: Symbol.for('MainModuleHandler'),
  WebApiModuleBuilder: Symbol.for('WebApiModuleBuilder'),
};

/**
 * Dependency Injection Container.
 */
export class InversifyContainer {
  private readonly WEB_API_CONFIG_FILES: IndexableType = {
    'src/templates/web-api/BabelConfig.template': 'babel.config.js',
    'src/templates/web-api/EsLint.template': '.eslintrc.js',
    'src/templates/web-api/JestConfig.template': 'jest.config.js',
    'src/templates/web-api/tsconfig-template.json': 'tsconfig.json',
  };

  private readonly WEB_API_FOLDER_STRUCTURE: FileSystemStructure = {
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

  private readonly container: Container;

  constructor() {
    logger('Initializing Application Container');
    this.container = new Container();
    this.configureContainer();
  }

  public getApp(): Main {
    return this.container.get<Main>(Main);
  }

  private configureContainer(): void {
    this.container.bind<Main>(Types.Main).to(Main);
    this.container.bind<AppDefinitionBuilder>(Types.AppDefBuilder).to(AppDefinitionBuilder);
    this.container.bind<ModuleBuilderFactory>(Types.ModuleBuilderFactory).to(ModuleBuilderFactory);

    const webApiConfigFilesHandler: Handler = new ConfigFilesHandler(this.WEB_API_CONFIG_FILES);
    this.container.bind<Handler>(Types.WebApiConfigHandler).toConstantValue(webApiConfigFilesHandler);

    const webApiFolderHandler = new FolderStructureHandler(this.WEB_API_FOLDER_STRUCTURE);
    this.container.bind<Handler>(Types.WebApiFolderHandler).toConstantValue(webApiFolderHandler);

    this.container.bind<Handler>(Types.MainModuleHandler).to(MainModuleHandler);
    this.container.bind<Handler>(Types.PackageJsonHandler).to(PackageJsonHandler);

    this.container.bind<ModuleBuilder>(Types.WebApiModuleBuilder).to(WebApiModuleBuilder);
  }
}
