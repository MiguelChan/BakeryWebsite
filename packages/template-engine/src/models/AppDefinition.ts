/**
 * Defines the ApplicationType.
 *
 * An Application Type can be a
 *
 * *  WebApi which is meant to be used for REST Services.
 * *  WebApp which is meant to be used for React Web Applications.
 */
export enum AppType {
  WebApi = 'WebApi',
  WebApp = 'WebApp',
}

/**
 * Defines the Application Definition.
 */
export interface AppDefinition {

  appType: AppType;
  appDescription?: string;
  appName: string;
  version: string;

}
