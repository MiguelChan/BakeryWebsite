import express from 'express';
import { injectable } from 'inversify';

/**
 * Base class for Custom API Routes Definitions.
 */
@injectable()
export abstract class CommonRoutesConfig {
  /**
     * Default constructor.
     * @param {express.Application} app The Express Application.
     * @param {string} name The name of this Route Configuration File.
     */
  constructor(protected readonly app: express.Application, private readonly name: string) {
  }

  /**
     * @returns {string} The name of this Routes Configuration File.
     */
  public getName(): string {
    return this.name;
  }

  /**
     * Configures the provided routes.
     */
  public abstract configureRoutes(): express.Application;
}
