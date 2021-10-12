import debug from 'debug';
import {
  AppDefinition,
  AppType,
} from 'models';
import {
  createDirectory,
  createFile,
} from 'utils';
import * as webApiPackageJson from '../../templates/web-api/package-template.json';
import { Handler } from './Handler';

const logger: debug.IDebugger = debug('packageJsonHandler');

/**
 * Handler that handles the creation of the package.json File of a given Module.
 */
export class PackageJsonHandler implements Handler {
  /**
   * Handles the creation of the package.json File.
   *
   * @param {AppDefinition} appDefinition The app definition.
   */
  public async handle(appDefinition: AppDefinition): Promise<void> {
    console.log("I'm currently building your package.json File, please bear with me...");
    const {
      appName,
      appDescription,
      version,
    } = appDefinition;
    const packageJson = this.getPackageJson(appDefinition.appType);
    // Let's replace the Name
    packageJson.name = appName;
    packageJson.version = version;
    packageJson.description = appDescription;
    delete packageJson.default;

    const workingDir = createDirectory(process.cwd(), 'samples');
    createFile(workingDir, 'package.json', JSON.stringify(packageJson, null, 4));
    logger('Successfully created package.json path at: %s', workingDir);
  }

  private getPackageJson(appType: AppType): any {
    switch (appType) {
      case AppType.WebApi:
        return {
          ...webApiPackageJson,
        };
      default:
        throw new Error('Not implemented');
    }
  }
}
