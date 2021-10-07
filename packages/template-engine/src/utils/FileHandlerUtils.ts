import * as path from 'path';
import * as fs from 'fs';
import debug from 'debug';

const logger: debug.IDebugger = debug('fileHandlerUtils');

export const createDirectory = (currentPath: string, newDirectoryName: string): string => {
  const workingDir = path.resolve(currentPath, newDirectoryName);
  fs.mkdirSync(workingDir, {
    recursive: true,
  });
  logger('Created Folder at: %s', workingDir);
  return workingDir;
};

export const createFile = (currentPath: string, newFileName: string, fileContents: any): string => {
  const workingFilePath = path.resolve(currentPath, newFileName);
  fs.writeFileSync(workingFilePath, fileContents);
  logger('Created File at: %s', workingFilePath);
  return workingFilePath;
};
