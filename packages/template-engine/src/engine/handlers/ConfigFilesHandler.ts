import {
  AppDefinition,
} from 'models';
import debug from 'debug';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
import {
  IndexableType,
} from 'utils';
import {
  injectable,
} from 'inversify';
import {
  Handler,
} from './Handler';

const logger: debug.Debugger = debug('configFilesHandler');

/**
 * Handler that handles the creation of the Configuration Files.
 * This handler is meant to copy the Template Files provided in the Constructor into the correct folders
 * of the created Module.
 *
 * ToDo: Add jest config files
 */
@injectable()
export class ConfigFilesHandler implements Handler {
  /**
   * Default constructor.
   *
   * @param {IndexableType} templateFiles The template files to copy. This is expecting that the "Key" of the
   * IndexableType to be the Route of the TemplateFile and the "Value" is the final name of the File.
   */
  constructor(private readonly templateFiles: IndexableType) {
    this.handle = this.handle.bind(this);
    this.writeFile = this.writeFile.bind(this);
    logger('Initializing ConfigurationFilesHandler with Templates: %j', templateFiles);
  }

  /**
   * Copies all the template files into it's correct destinion.
   *
   * @param {AppDefinition} appDefinition .
   */
  public async handle(appDefinition: AppDefinition): Promise<void> {
    logger('Creating Configuration Files for: %j', appDefinition);
    Object.keys(this.templateFiles).forEach((currentTemplate: string): void => {
      const currentConfigFile = this.templateFiles[currentTemplate];
      const configFilePath = path.resolve(process.cwd(), 'samples', currentConfigFile);
      this.writeFile(configFilePath, currentTemplate);
    });
  }

  private async writeFile(outputFilePath: string, templateToRead: string): Promise<void> {
    const templateDir = path.resolve(process.cwd(), templateToRead);
    const templateFileStream = fs.createReadStream(templateDir);
    const templateReadLine = readline.createInterface({
      input: templateFileStream,
      crlfDelay: Infinity,
    });

    const outputFile = fs.createWriteStream(outputFilePath, {
      flags: 'w',
    });

    for await (const currentLine of templateReadLine) {
      outputFile.write(currentLine);
      outputFile.write('\n');
    }
    outputFile.close();
    templateReadLine.close();
  }
}
