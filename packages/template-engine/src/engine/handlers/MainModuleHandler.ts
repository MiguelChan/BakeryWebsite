import { AppDefinition } from 'models';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
import _ from 'lodash';
import debug from 'debug';
import { createFile } from 'utils';
import { injectable } from 'inversify';
import { Handler } from './Handler';

const logger: debug.IDebugger = debug('mainModuleHandler');

/**
 * Class that creates the Main Entry point of our Module.
 */
@injectable()
export class MainModuleHandler implements Handler {
  private readonly ModuleNameToken = '<ModuleName>';

  private readonly EntryPointTemplateDir = 'src/templates/web-api/EntryPointTemplate.template';

  private readonly IndexTsTemplateDir = 'src/templates/web-api/EntryPointIndex.template';

  public async handle(appDefinition: AppDefinition): Promise<void> {
    logger('Creating Module for AppDefinition: %j', appDefinition);

    const {
      appName,
    } = appDefinition;

    const moduleName = this.getModuleName(appName);
    const mainEntryPointPath = createFile(
      path.resolve(process.cwd(), 'samples', 'src'),
      `${moduleName}WebApiModule.ts`,
      '',
    );
    const indexTsPath = createFile(path.resolve(process.cwd(), 'samples', 'src'), 'index.ts', '');
    this.writeFile(mainEntryPointPath, moduleName, this.EntryPointTemplateDir);
    this.writeFile(indexTsPath, moduleName, this.IndexTsTemplateDir);
  }

  private async writeFile(filePath: string, moduleName: string, templateToRead: string): Promise<void> {
    const templateDir = path.resolve(process.cwd(), templateToRead);
    const templateFileStream = fs.createReadStream(templateDir);
    const templateReadLine = readline.createInterface({
      input: templateFileStream,
      crlfDelay: Infinity,
    });

    const outputFile = fs.createWriteStream(filePath, {
      flags: 'w',
    });

    for await (const currentLine of templateReadLine) {
      const tokenizedLine = this.replaceToken(currentLine, this.ModuleNameToken, moduleName);
      outputFile.write(tokenizedLine);
      outputFile.write('\n');
    }

    outputFile.close();
    templateReadLine.close();
  }

  private replaceToken(currentLine: string, tokenName: string, stringToReplace: string): string {
    if (currentLine.includes(tokenName)) {
      return currentLine.replace(tokenName, stringToReplace);
    }
    return currentLine;
  }

  private getModuleName(appName: string): string {
    const nameParts = appName.split('/');
    const moduleName = nameParts[nameParts.length - 1];
    return _.upperFirst(_.camelCase(moduleName));
  }
}
