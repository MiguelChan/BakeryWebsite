import inquirer from 'inquirer';
import {
  AppDefinition,
  AppType,
} from 'models';
import debug from 'debug';

const logger: debug.IDebugger = debug('appDefBuilder');

export class AppDefinitionBuilder {
  private static readonly questions: inquirer.QuestionCollection<any>[] = [
    {
      type: 'input',
      name: 'appName',
      message: 'How are we going to call your new Module?',
      validate: (value: any): boolean | string => {
        if (value === null || value === undefined || value.length === 0) {
          return 'Please enter the name of your Module';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'appDescription',
      message: 'What is the Description of your new Module?',
    },
    {
      type: 'list',
      name: 'appType',
      message: 'What kind of Application you are going to build?',
      choices: [
        AppType.WebApi,
        AppType.WebApp,
      ],
    },
    {
      type: 'input',
      name: 'version',
      message: 'What is the version number?',
    },
  ];

  public async fetchAppDefinition(): Promise<AppDefinition> {
    logger('Starting AppDefinition Session');

    try {
      console.log('Hello User!');
      console.log('We will start by fetching some application settings...');
      const resultsObject = await inquirer.prompt(AppDefinitionBuilder.questions);
      return {
        appName: resultsObject.appName,
        appDescription: resultsObject.appDescription,
        appType: resultsObject.appType,
        version: resultsObject.version,
      };
    } catch (exception: any) {
      logger('Found an error while trying to fetch the Components: %s', exception.message);
      return {} as any;
    }
  }
}
