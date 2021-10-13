import { injectable } from 'inversify';
import express from 'express';

/**
 * Base class for custom API Route definitions.
 */
@injectable()
export abstract class CommonRoutesConfig {
  /**
   * Default constructor.
   * @param app .
   * @param name .
   */
  constructor(protected readonly app: express.Application, private readonly name: string) {

  }

  /**
   * Gets the name of the current route configuration.
   * @returns .
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Configures the provided Routes.
   */
  public abstract configureRoutes(): express.Application;
}
