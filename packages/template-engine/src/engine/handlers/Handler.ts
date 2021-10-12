import {
  AppDefinition,
} from 'models';

/**
 * Main interface used for creating "handlers" that will handle the creation of assets, resources, and so on.
 */
export interface Handler {

  /**
   * Handles the creation of the Provided Resource.
   *
   * @param {AppDefinition} appDefinition The application definition to use.
   */
  handle(appDefinition: AppDefinition): Promise<void>;

}
