import { AppDefinition } from "models";
import debug from 'debug';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { 
  IndexableType,
} from 'utils';

const logger: debug.Debugger = debug('configFilesHandler');

/**
 * Handler that handles the creation of the Configuration Files, based off the AppType.
 * 
 * ToDo: Add jest config files
 */
export class ConfigFilesHandler {

  private readonly TEMPLATE_FILES: IndexableType = {
    'src/templates/web-api/BabelConfig.template': 'babel.config.js',
    'src/templates/web-api/EsLint.template': '.eslintrc.js',
    'src/templates/web-api/JestConfig.template': 'jest.config.js',
    'src/templates/web-api/tsconfig-template.json': 'tsconfig.json',
  };

  constructor() {
    this.buildConfigFiles = this.buildConfigFiles.bind(this);
    this.writeFile = this.writeFile.bind(this);
  }

  public async buildConfigFiles(appDefinition: AppDefinition): Promise<void> {
    const {
      appType,
    } = appDefinition;

    Object.keys(this.TEMPLATE_FILES).forEach((currentTemplate: string): void => {
      const currentConfigFile = this.TEMPLATE_FILES[currentTemplate];
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