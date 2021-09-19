import {
  WebApplication,
} from './WebApplication';

/**
 * Main entry point of your WebAppModule.
 */
export interface WebAppModule {

  /**
  * Install the Module.
  *
  * All your required configuration and communication with the main {WebApplication} should take place in here.
  *
  * @param {WebApplication} app The WebApplication in which this Module should be installed.
  */
  installModule(app: WebApplication);

}
